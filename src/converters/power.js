import { createLinearConverter } from "../core.js";

/**
 * Power units expressed in watts.
 *
 * `Horsepower` is mechanical horsepower; `MetricHorsepower` is the
 * PS/Pferdestärke variant. `KilowattHourPerYear` uses a 365.25-day year.
 *
 * @type {Record<string, number>}
 */
const PowerMeasures = {
  KilowattHourPerYear: 3600000 / 31557600,
  BTUPerHour: 0.2930710701722222,
  Watt: 1,
  MetricHorsepower: 735.49875,
  Horsepower: 745.6998715822702,
  Kilowatt: 1e3,
  Megawatt: 1e6,
  Gigawatt: 1e9,
};

const PowerAliases = {
  "kWh/yr": "KilowattHourPerYear",
  "kWh/year": "KilowattHourPerYear",
  kwhy: "KilowattHourPerYear",
  "BTU/h": "BTUPerHour",
  btuh: "BTUPerHour",
  W: "Watt",
  PS: "MetricHorsepower",
  hp: "Horsepower",
  kW: "Kilowatt",
  MW: "Megawatt",
  GW: "Gigawatt",
};

export const power = createLinearConverter(PowerMeasures, PowerAliases);
