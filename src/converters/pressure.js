import { createLinearConverter } from "../core.js";

/**
 * Pressure units expressed in pascals.
 *
 * `MillimeterOfMercury` is the conventional mmHg (very close to one torr).
 *
 * @type {Record<string, number>}
 */
const PressureMeasures = {
  Pascal: 1,
  Hectopascal: 100,
  MillimeterOfMercury: 133.322387415,
  Kilopascal: 1000,
  InchOfMercury: 3386.389,
  PSI: 6894.757293168,
  Bar: 100000,
  Atmosphere: 101325,
};

const PressureAliases = {
  Pa: "Pascal",
  hPa: "Hectopascal",
  mmHg: "MillimeterOfMercury",
  kPa: "Kilopascal",
  inHg: "InchOfMercury",
  psi: "PSI",
  bar: "Bar",
  atm: "Atmosphere",
};

export const pressure = createLinearConverter(
  PressureMeasures,
  PressureAliases
);
