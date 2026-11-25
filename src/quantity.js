import { assertFiniteNumber } from "./core.js";

const NUMBER_PATTERN =
  /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/;

/**
 * @typedef {object} FormatOptions
 * @property {string | string[]} [locale]
 * @property {number} [decimals]
 * @property {number} [significantDigits]
 * @property {boolean} [useGrouping]
 */

/**
 * Build a parser bound to a collection of converters.
 *
 * The parser accepts one or more quantity tokens, for example `"5 ft 3 in"`
 * or `"1 h 30 min"`. When `toUnit` is omitted, the first unit in the input is
 * used as the target unit.
 *
 * @param {Readonly<Record<string, {
 *   units: readonly string[],
 *   aliases: Readonly<Record<string, string>>,
 *   resolve: (unit: string) => string,
 *   convert: (fromUnit: string, toUnit: string, value: number) => number
 * }>>} converters
 * @returns {(category: string, input: string, toUnit?: string) => number}
 */
export function createParseQuantity(converters) {
  /**
   * @param {string} category
   * @param {string} input
   * @param {string} [toUnit]
   * @returns {number}
   */
  return function parseQuantity(category, input, toUnit) {
    if (!Object.hasOwn(converters, category)) {
      throw new RangeError(
        `Unknown category: ${category}. Supported categories: ${Object.keys(
          converters
        ).join(", ")}.`
      );
    }
    if (typeof input !== "string") {
      throw new TypeError(`input must be a string, received ${typeof input}.`);
    }

    const converter = converters[category];
    const text = input.trim();

    if (text.length === 0) {
      throw new SyntaxError("input must not be empty.");
    }

    const tokens = [
      ...converter.units,
      ...Object.keys(converter.aliases),
    ].sort((a, b) => b.length - a.length);

    /** @type {Array<{ value: number, unit: string }>} */
    const parts = [];
    let index = 0;

    const skipSeparators = () => {
      while (index < text.length && /[\s,]/.test(text[index])) {
        index += 1;
      }
    };

    while (index < text.length) {
      skipSeparators();

      if (index >= text.length) {
        break;
      }

      const numberMatch = NUMBER_PATTERN.exec(text.slice(index));
      if (!numberMatch) {
        throw new SyntaxError(
          `Expected a number at position ${index} in ${JSON.stringify(input)}.`
        );
      }

      const value = Number(numberMatch[0]);
      index += numberMatch[0].length;
      skipSeparators();

      /** @type {string | undefined} */
      let matchedUnit;

      for (const token of tokens) {
        if (!text.startsWith(token, index)) {
          continue;
        }

        const next = text[index + token.length];
        if (next === undefined || /[\s,\d+-]/.test(next)) {
          matchedUnit = token;
          break;
        }
      }

      if (matchedUnit === undefined) {
        throw new SyntaxError(
          `Unknown unit at position ${index} in ${JSON.stringify(input)}.`
        );
      }

      index += matchedUnit.length;
      parts.push({ value, unit: converter.resolve(matchedUnit) });
    }

    if (parts.length === 0) {
      throw new SyntaxError(
        `No quantities found in ${JSON.stringify(input)}.`
      );
    }

    const target = converter.resolve(toUnit ?? parts[0].unit);

    if (category === "temperature") {
      if (parts.length !== 1) {
        throw new SyntaxError(
          "Temperature input must contain exactly one quantity."
        );
      }

      return converter.convert(parts[0].unit, target, parts[0].value);
    }

    let total = 0;
    for (const part of parts) {
      total += converter.convert(part.unit, target, part.value);
    }

    return total;
  };
}

/**
 * Format a number and a unit as a localized string.
 *
 * @example
 * formatQuantity(3.14159, "mi", { decimals: 2 }); // "3.14 mi"
 * formatQuantity(1234.5, "m", { locale: "de-DE" }); // "1.234,5 m"
 *
 * @param {number} value
 * @param {string} unit
 * @param {FormatOptions} [options]
 * @returns {string}
 */
export function formatQuantity(value, unit, options = {}) {
  assertFiniteNumber(value);

  if (typeof unit !== "string" || unit.length === 0) {
    throw new TypeError("unit must be a non-empty string.");
  }

  const { locale, decimals, significantDigits, useGrouping = true } = options;

  if (
    decimals !== undefined &&
    (!Number.isInteger(decimals) || decimals < 0 || decimals > 20)
  ) {
    throw new RangeError(
      `decimals must be an integer between 0 and 20, received ${decimals}.`
    );
  }

  if (
    significantDigits !== undefined &&
    (!Number.isInteger(significantDigits) ||
      significantDigits < 1 ||
      significantDigits > 21)
  ) {
    throw new RangeError(
      `significantDigits must be an integer between 1 and 21, received ${significantDigits}.`
    );
  }

  if (decimals !== undefined && significantDigits !== undefined) {
    throw new RangeError("Use either decimals or significantDigits, not both.");
  }

  /** @type {Intl.NumberFormatOptions} */
  const formatOptions = { useGrouping };

  if (decimals !== undefined) {
    formatOptions.minimumFractionDigits = decimals;
    formatOptions.maximumFractionDigits = decimals;
  } else if (significantDigits !== undefined) {
    formatOptions.maximumSignificantDigits = significantDigits;
  } else {
    formatOptions.maximumFractionDigits = 20;
  }

  const formatter = new Intl.NumberFormat(locale, formatOptions);

  return `${formatter.format(value)} ${unit}`;
}
