/**
 * Shared helpers used by every converter.
 *
 * A linear unit is described by a single factor: how many base units one
 * unit contains. For example, in the length table `Kilometer: 1000` because
 * one kilometer is 1000 meters. Converting is then always
 * `value * fromFactor / toFactor`.
 */

/**
 * @typedef {object} Converter
 * @property {readonly string[]} units
 * @property {Readonly<Record<string, string>>} aliases
 * @property {(fromUnit: string, toUnit: string, value: number) => number} convert
 * @property {(unit: string) => string} resolve
 */

/**
 * Throw a helpful error unless `value` is a finite number.
 *
 * @param {unknown} value
 * @param {string} [label]
 * @returns {void}
 */
export function assertFiniteNumber(value, label = "value") {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(
      `${label} must be a finite number, received ${describeValue(value)}.`
    );
  }
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function describeValue(value) {
  if (value === null) return "null";
  if (typeof value === "string") return `the string ${JSON.stringify(value)}`;
  if (typeof value === "number") return String(value);
  return typeof value;
}

/**
 * Build a lookup from canonical unit names and aliases to canonical names.
 *
 * @param {Record<string, unknown>} units
 * @param {Record<string, string>} [aliases]
 * @returns {{
 *   names: string[],
 *   lookup: Map<string, string>,
 *   aliases: Readonly<Record<string, string>>
 * }}
 */
export function buildUnitLookup(units, aliases = {}) {
  const names = Object.keys(units);

  /** @type {Map<string, string>} */
  const lookup = new Map(names.map((name) => [name, name]));

  for (const [alias, unit] of Object.entries(aliases)) {
    if (lookup.has(alias)) {
      throw new Error(
        `Alias "${alias}" conflicts with an existing unit or alias.`
      );
    }
    if (!Object.hasOwn(units, unit)) {
      throw new Error(`Alias "${alias}" points to unknown unit "${unit}".`);
    }

    lookup.set(alias, unit);
  }

  return {
    names,
    lookup,
    aliases: Object.freeze({ ...aliases }),
  };
}

/**
 * Resolve a canonical unit name or alias to its canonical unit name.
 *
 * @param {string} unit
 * @param {Map<string, string>} lookup
 * @param {string[]} names
 * @param {string} [label]
 * @returns {string}
 */
export function resolveUnit(unit, lookup, names, label = "unit") {
  const resolved = lookup.get(unit);

  if (resolved === undefined) {
    throw new RangeError(
      `Unsupported ${label}: ${unit}. Supported units: ${names.join(", ")}. Aliases are also accepted (see the aliases export).`
    );
  }

  return resolved;
}

/**
 * Build a converter object from a table of linear units.
 *
 * The returned object contains:
 * - a `convert(fromUnit, toUnit, value)` method,
 * - a frozen `units` array,
 * - a frozen `aliases` map,
 * - one `<From>To<To>(value)` function for every ordered pair of units.
 *
 * The pair functions preserve the public API of earlier versions while the
 * generic `convert` method removes the need to add new names by hand.
 *
 * @param {Record<string, number>} units
 * @param {Record<string, string>} [aliases]
 * @returns {Readonly<Converter>}
 */
export function createLinearConverter(units, aliases = {}) {
  const { names, lookup, aliases: frozenAliases } = buildUnitLookup(
    units,
    aliases
  );

  for (const name of names) {
    const factor = units[name];
    if (typeof factor !== "number" || !Number.isFinite(factor) || factor <= 0) {
      throw new Error(
        `Invalid conversion factor for ${name}: expected a positive finite number, received ${factor}.`
      );
    }
  }

  /**
   * @param {string} fromUnit
   * @param {string} toUnit
   * @param {number} value
   * @returns {number}
   */
  const convert = (fromUnit, toUnit, value) => {
    assertFiniteNumber(value);

    const from = resolveUnit(fromUnit, lookup, names);
    const to = resolveUnit(toUnit, lookup, names);

    return (value * units[from]) / units[to];
  };

  /** @type {Record<string, unknown>} */
  const converter = {};

  // Keep metadata non-enumerable so `Object.keys(converter)` still returns
  // only the pair functions, matching the shape of version 1.
  Object.defineProperties(converter, {
    convert: { value: convert, enumerable: false },
    resolve: {
      value: (/** @type {string} */ unit) =>
        resolveUnit(unit, lookup, names),
      enumerable: false,
    },
    units: { value: Object.freeze([...names]), enumerable: false },
    aliases: { value: frozenAliases, enumerable: false },
  });

  for (const fromUnit of names) {
    for (const toUnit of names) {
      converter[`${fromUnit}To${toUnit}`] = (/** @type {number} */ value) =>
        convert(fromUnit, toUnit, value);
    }
  }

  return /** @type {Readonly<Converter>} */ (Object.freeze(converter));
}

/**
 * Shift the decimal point using the number's shortest decimal representation.
 *
 * This avoids the binary floating-point artefacts produced by multiplying by
 * powers of ten, so values such as 1.005 round the way people expect.
 *
 * @param {number} value
 * @param {number} places
 * @returns {number}
 */
function shiftDecimal(value, places) {
  const [mantissa, exponent = "0"] = String(value).split("e");
  return Number(`${mantissa}e${Number(exponent) + places}`);
}

/**
 * Round a finite number to a fixed number of decimal places.
 *
 * @example
 * round(3.14159, 2); // 3.14
 * round(1.005, 2);   // 1.01
 * round(-1.005, 2);  // -1.01
 *
 * @param {number} value
 * @param {number} [decimals]
 * @returns {number}
 */
export function round(value, decimals = 0) {
  assertFiniteNumber(value);

  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 100) {
    throw new RangeError(
      `decimals must be an integer between 0 and 100, received ${decimals}.`
    );
  }

  if (value === 0) return 0;

  const shifted = shiftDecimal(value, decimals);
  if (!Number.isFinite(shifted)) return value;

  const rounded = shifted < 0 ? -Math.round(-shifted) : Math.round(shifted);
  return shiftDecimal(rounded, -decimals);
}
