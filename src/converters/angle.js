import { createLinearConverter } from "../core.js";

/**
 * Angle units expressed in radians.
 *
 * @type {Record<string, number>}
 */
const AngleMeasures = {
  Arcsecond: Math.PI / (180 * 3600),
  Arcminute: Math.PI / (180 * 60),
  Gradian: Math.PI / 200,
  Degree: Math.PI / 180,
  Radian: 1,
  Turn: Math.PI * 2,
};

const AngleAliases = {
  '"': "Arcsecond",
  arcsec: "Arcsecond",
  "'": "Arcminute",
  arcmin: "Arcminute",
  gon: "Gradian",
  grad: "Gradian",
  deg: "Degree",
  "°": "Degree",
  rad: "Radian",
  rev: "Turn",
  revolution: "Turn",
  turn: "Turn",
};

export const angle = createLinearConverter(AngleMeasures, AngleAliases);
