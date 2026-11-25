import { daysInMonth, isLeapYear } from "./calendar.js";
import { angle } from "./converters/angle.js";
import { area } from "./converters/area.js";
import { data } from "./converters/data.js";
import { energy } from "./converters/energy.js";
import { frequency } from "./converters/frequency.js";
import { length } from "./converters/length.js";
import { power } from "./converters/power.js";
import { pressure } from "./converters/pressure.js";
import { speed } from "./converters/speed.js";
import { temperature } from "./converters/temperature.js";
import { time } from "./converters/time.js";
import { volume } from "./converters/volume.js";
import { weight } from "./converters/weight.js";
import { createParseQuantity, formatQuantity } from "./quantity.js";

export {
  angle,
  area,
  data,
  energy,
  frequency,
  length,
  power,
  pressure,
  speed,
  temperature,
  time,
  volume,
  weight,
};

export { daysInMonth, formatQuantity, isLeapYear };

/**
 * @typedef {object} Converter
 * @property {readonly string[]} units
 * @property {Readonly<Record<string, string>>} aliases
 * @property {(fromUnit: string, toUnit: string, value: number) => number} convert
 * @property {(unit: string) => string} resolve
 */

/**
 * Every converter, keyed by category.
 *
 * @type {Readonly<Record<string, Converter>>}
 */
export const converters = Object.freeze({
  angle,
  area,
  data,
  energy,
  frequency,
  length,
  power,
  pressure,
  speed,
  temperature,
  time,
  volume,
  weight,
});

/**
 * The supported category names.
 */
export const categories = Object.freeze(Object.keys(converters));

/**
 * The supported units for each category.
 */
export const units = Object.freeze(
  Object.fromEntries(
    Object.entries(converters).map(([category, converter]) => [
      category,
      converter.units,
    ])
  )
);

/**
 * The supported unit aliases for each category, mapped to canonical units.
 */
export const aliases = Object.freeze(
  Object.fromEntries(
    Object.entries(converters).map(([category, converter]) => [
      category,
      converter.aliases,
    ])
  )
);

export { round } from "./core.js";

/**
 * Parse a quantity string such as `"5 ft 3 in"` or `"1 h 30 min"`.
 *
 * When `toUnit` is omitted the first unit in the input is used as the target.
 *
 * @type {(category: string, input: string, toUnit?: string) => number}
 */
export const parseQuantity = createParseQuantity(converters);

/**
 * Convert a value between any two units in the same category.
 *
 * @example
 * convert("length", "Meter", "Foot", 1); // 3.280839895013123
 * convert("temperature", "Celsius", "Fahrenheit", 0); // 32
 *
 * @param {string} category
 * @param {string} fromUnit
 * @param {string} toUnit
 * @param {number} value
 * @returns {number}
 */
export function convert(category, fromUnit, toUnit, value) {
  if (!Object.hasOwn(converters, category)) {
    throw new RangeError(
      `Unknown category: ${category}. Supported categories: ${categories.join(", ")}.`
    );
  }

  return converters[category].convert(fromUnit, toUnit, value);
}
