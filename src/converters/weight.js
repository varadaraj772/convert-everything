import { createLinearConverter } from "../core.js";

/**
 * Mass units expressed in kilograms.
 *
 * `UsTon` is the US short ton (2000 lb, 907.18474 kg), not the imperial
 * long ton. `Tonne` is the metric tonne (1000 kg).
 *
 * @type {Record<string, number>}
 */
const WeightMeasures = {
  Microgram: 1e-9,
  Milligram: 1e-6,
  Gram: 1e-3,
  Carat: 0.0002,
  Ounce: 0.028349523125,
  Pound: 0.45359237,
  Kilogram: 1,
  Stone: 6.35029318,
  UsTon: 907.18474,
  Tonne: 1000,
};

const WeightAliases = {
  mcg: "Microgram",
  ug: "Microgram",
  "µg": "Microgram",
  mg: "Milligram",
  g: "Gram",
  ct: "Carat",
  carat: "Carat",
  oz: "Ounce",
  lb: "Pound",
  lbs: "Pound",
  kg: "Kilogram",
  st: "Stone",
  stone: "Stone",
  uston: "UsTon",
  shortton: "UsTon",
  t: "Tonne",
  tonne: "Tonne",
  metricton: "Tonne",
};

export const weight = createLinearConverter(WeightMeasures, WeightAliases);
