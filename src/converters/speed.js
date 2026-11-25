import { createLinearConverter } from "../core.js";

/**
 * Speed units expressed in meters per second.
 *
 * @type {Record<string, number>}
 */
const SpeedMeasures = {
  MeterPerSecond: 1,
  KilometerPerHour: 1000 / 3600,
  FootPerSecond: 0.3048,
  MilePerHour: 0.44704,
  Knot: 1852 / 3600,
};

const SpeedAliases = {
  "m/s": "MeterPerSecond",
  mps: "MeterPerSecond",
  "km/h": "KilometerPerHour",
  kmh: "KilometerPerHour",
  kph: "KilometerPerHour",
  "ft/s": "FootPerSecond",
  fps: "FootPerSecond",
  mph: "MilePerHour",
  "mi/h": "MilePerHour",
  kn: "Knot",
  kt: "Knot",
  knot: "Knot",
};

export const speed = createLinearConverter(SpeedMeasures, SpeedAliases);
