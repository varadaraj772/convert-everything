import { createLinearConverter } from "../core.js";

/**
 * Length units expressed in meters.
 *
 * @type {Record<string, number>}
 */
const LengthMeasures = {
  Nanometer: 1e-9,
  Micrometer: 1e-6,
  Millimeter: 1e-3,
  Centimeter: 1e-2,
  Inch: 0.0254,
  Foot: 0.3048,
  Yard: 0.9144,
  Meter: 1,
  Fathom: 1.8288,
  NauticalMile: 1852,
  Mile: 1609.344,
  Kilometer: 1000,
  LightYear: 9460730472580800,
};

const LengthAliases = {
  nm: "Nanometer",
  um: "Micrometer",
  "µm": "Micrometer",
  mm: "Millimeter",
  cm: "Centimeter",
  in: "Inch",
  ft: "Foot",
  yd: "Yard",
  m: "Meter",
  fathom: "Fathom",
  nmi: "NauticalMile",
  mi: "Mile",
  km: "Kilometer",
  ly: "LightYear",
};

export const length = createLinearConverter(LengthMeasures, LengthAliases);
