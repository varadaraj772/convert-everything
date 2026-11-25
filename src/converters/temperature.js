import {
  assertFiniteNumber,
  buildUnitLookup,
  resolveUnit,
} from "../core.js";

/** @type {Record<string, (value: number) => number>} */
const toCelsius = {
  Celsius: (value) => value,
  Fahrenheit: (value) => ((value - 32) * 5) / 9,
  Kelvin: (value) => value - 273.15,
  Rankine: (value) => ((value - 491.67) * 5) / 9,
};

/** @type {Record<string, (value: number) => number>} */
const fromCelsius = {
  Celsius: (value) => value,
  Fahrenheit: (value) => (value * 9) / 5 + 32,
  Kelvin: (value) => value + 273.15,
  Rankine: (value) => (value + 273.15) * (9 / 5),
};

/** @type {Record<string, number>} */
const absoluteZero = {
  Celsius: -273.15,
  Fahrenheit: -459.67,
  Kelvin: 0,
  Rankine: 0,
};

const TemperatureAliases = {
  C: "Celsius",
  "°C": "Celsius",
  degC: "Celsius",
  F: "Fahrenheit",
  "°F": "Fahrenheit",
  degF: "Fahrenheit",
  K: "Kelvin",
  degK: "Kelvin",
  R: "Rankine",
  "°R": "Rankine",
  degR: "Rankine",
};

const {
  names: temperatureUnits,
  lookup,
  aliases: frozenAliases,
} = buildUnitLookup(toCelsius, TemperatureAliases);

/**
 * Convert a temperature between Celsius, Fahrenheit, Kelvin, and Rankine.
 *
 * @param {string} fromUnit
 * @param {string} toUnit
 * @param {number} value
 * @returns {number}
 */
function convertTemperature(fromUnit, toUnit, value) {
  assertFiniteNumber(value);

  const from = resolveUnit(fromUnit, lookup, temperatureUnits, "temperature unit");
  const to = resolveUnit(toUnit, lookup, temperatureUnits, "temperature unit");

  const minimum = absoluteZero[from];
  if (value < minimum - 1e-9) {
    throw new RangeError(
      `${value} ${from} is below absolute zero (${minimum} ${from}).`
    );
  }

  const result = fromCelsius[to](toCelsius[from](value));

  // Fahrenheit-to-Kelvin at absolute zero can produce a tiny negative value
  // from floating-point arithmetic. Normalise it to zero.
  if ((to === "Kelvin" || to === "Rankine") && result < 0 && result > -1e-9) {
    return 0;
  }

  return result;
}

/** @type {Record<string, unknown>} */
const converter = {};

Object.defineProperties(converter, {
  convert: { value: convertTemperature, enumerable: false },
  resolve: {
    value: (/** @type {string} */ unit) =>
      resolveUnit(unit, lookup, temperatureUnits, "temperature unit"),
    enumerable: false,
  },
  units: { value: Object.freeze([...temperatureUnits]), enumerable: false },
  aliases: { value: frozenAliases, enumerable: false },
});

for (const fromUnit of temperatureUnits) {
  for (const toUnit of temperatureUnits) {
    converter[`${fromUnit}To${toUnit}`] = (/** @type {number} */ value) =>
      convertTemperature(fromUnit, toUnit, value);
  }
}

export const temperature = /** @type {Readonly<{
 *   units: readonly string[],
 *   aliases: Readonly<Record<string, string>>,
 *   convert: (fromUnit: string, toUnit: string, value: number) => number,
 *   resolve: (unit: string) => string
 * }>} */ (Object.freeze(converter));
