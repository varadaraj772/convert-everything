import { createLinearConverter } from "../core.js";

/**
 * Volume units expressed in cubic meters.
 *
 * `Gallon`, `FluidOunce`, `Pint`, `Quart`, and `Cup` are US customary
 * measures. `ImperialGallon` is the UK imperial gallon.
 *
 * @type {Record<string, number>}
 */
const VolumeMeasures = {
  CubicMillimeter: 1e-9,
  CubicCentimeter: 1e-6,
  Milliliter: 1e-6,
  CubicInch: 0.000016387064,
  FluidOunce: 0.0000295735295625,
  Cup: 0.0002365882365,
  Pint: 0.000473176473,
  Quart: 0.000946352946,
  Liter: 1e-3,
  Gallon: 0.003785411784,
  ImperialGallon: 0.00454609,
  CubicFoot: 0.028316846592,
  CubicMeter: 1,
};

const VolumeAliases = {
  mm3: "CubicMillimeter",
  "mm³": "CubicMillimeter",
  cm3: "CubicCentimeter",
  "cm³": "CubicCentimeter",
  ml: "Milliliter",
  mL: "Milliliter",
  in3: "CubicInch",
  "in³": "CubicInch",
  floz: "FluidOunce",
  "fl oz": "FluidOunce",
  cup: "Cup",
  pt: "Pint",
  qt: "Quart",
  l: "Liter",
  L: "Liter",
  gal: "Gallon",
  impgal: "ImperialGallon",
  ukgal: "ImperialGallon",
  ft3: "CubicFoot",
  "ft³": "CubicFoot",
  m3: "CubicMeter",
  "m³": "CubicMeter",
};

export const volume = createLinearConverter(VolumeMeasures, VolumeAliases);
