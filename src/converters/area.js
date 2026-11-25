import { createLinearConverter } from "../core.js";

/**
 * Area units expressed in square meters.
 *
 * @type {Record<string, number>}
 */
const AreaMeasures = {
  SquareMillimeter: 1e-6,
  SquareCentimeter: 1e-4,
  SquareInch: 0.00064516,
  SquareFoot: 0.09290304,
  SquareYard: 0.83612736,
  SquareMeter: 1,
  Acre: 4046.8564224,
  Hectare: 10000,
  SquareKilometer: 1e6,
  SquareMile: 2589988.110336,
};

const AreaAliases = {
  mm2: "SquareMillimeter",
  "mm²": "SquareMillimeter",
  sqmm: "SquareMillimeter",
  cm2: "SquareCentimeter",
  "cm²": "SquareCentimeter",
  sqcm: "SquareCentimeter",
  in2: "SquareInch",
  "in²": "SquareInch",
  sqin: "SquareInch",
  ft2: "SquareFoot",
  "ft²": "SquareFoot",
  sqft: "SquareFoot",
  yd2: "SquareYard",
  "yd²": "SquareYard",
  sqyd: "SquareYard",
  m2: "SquareMeter",
  "m²": "SquareMeter",
  sqm: "SquareMeter",
  ac: "Acre",
  acre: "Acre",
  ha: "Hectare",
  hectare: "Hectare",
  km2: "SquareKilometer",
  "km²": "SquareKilometer",
  sqkm: "SquareKilometer",
  mi2: "SquareMile",
  "mi²": "SquareMile",
  sqmi: "SquareMile",
};

export const area = createLinearConverter(AreaMeasures, AreaAliases);
