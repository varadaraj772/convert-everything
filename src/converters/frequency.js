import { createLinearConverter } from "../core.js";

/**
 * Frequency units expressed in hertz.
 *
 * @type {Record<string, number>}
 */
const FrequencyMeasures = {
  BeatsPerMinute: 1 / 60,
  RevolutionsPerMinute: 1 / 60,
  Hertz: 1,
  Kilohertz: 1e3,
  Megahertz: 1e6,
  Gigahertz: 1e9,
};

const FrequencyAliases = {
  bpm: "BeatsPerMinute",
  BPM: "BeatsPerMinute",
  rpm: "RevolutionsPerMinute",
  RPM: "RevolutionsPerMinute",
  Hz: "Hertz",
  kHz: "Kilohertz",
  MHz: "Megahertz",
  GHz: "Gigahertz",
};

export const frequency = createLinearConverter(
  FrequencyMeasures,
  FrequencyAliases
);
