import { createLinearConverter } from "../core.js";

/**
 * Energy units expressed in joules.
 *
 * `Calorie` and `SmallCalorie` are both the thermochemical calorie
 * (4.184 J). `Kilocalorie` and `FoodCalorie` are the large calorie
 * (4184 J) used on nutrition labels.
 *
 * @type {Record<string, number>}
 */
const EnergyMeasures = {
  Electronvolt: 1.602176634e-19,
  Erg: 1e-7,
  Joule: 1,
  SmallCalorie: 4.184,
  Calorie: 4.184,
  Kilojoule: 1000,
  WattHour: 3600,
  FoodCalorie: 4184,
  Kilocalorie: 4184,
  BTU: 1055.05585262,
  KilowattHour: 3600000,
  Therm: 105480400,
};

const EnergyAliases = {
  eV: "Electronvolt",
  erg: "Erg",
  J: "Joule",
  cal: "Calorie",
  smallcal: "SmallCalorie",
  kJ: "Kilojoule",
  Wh: "WattHour",
  Cal: "FoodCalorie",
  kcal: "Kilocalorie",
  btu: "BTU",
  kWh: "KilowattHour",
  therm: "Therm",
};

export const energy = createLinearConverter(EnergyMeasures, EnergyAliases);
