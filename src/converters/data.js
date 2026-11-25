import { createLinearConverter } from "../core.js";

/**
 * Data storage units expressed in bytes.
 *
 * Decimal SI units (`Kilobyte` = 1000 bytes) and IEC binary units
 * (`Kibibyte` = 1024 bytes) are both supported so the names are unambiguous.
 *
 * @type {Record<string, number>}
 */
const DataMeasures = {
  Bit: 0.125,
  Byte: 1,
  Kilobyte: 1e3,
  Kibibyte: 1024,
  Megabyte: 1e6,
  Mebibyte: 1024 ** 2,
  Gigabyte: 1e9,
  Gibibyte: 1024 ** 3,
  Terabyte: 1e12,
  Tebibyte: 1024 ** 4,
  Petabyte: 1e15,
  Pebibyte: 1024 ** 5,
  Exabyte: 1e18,
  Exbibyte: 1024 ** 6,
  Zettabyte: 1e21,
  Zebibyte: 1024 ** 7,
  Yottabyte: 1e24,
  Yobibyte: 1024 ** 8,
};

const DataAliases = {
  b: "Bit",
  B: "Byte",
  KB: "Kilobyte",
  kB: "Kilobyte",
  KiB: "Kibibyte",
  MB: "Megabyte",
  MiB: "Mebibyte",
  GB: "Gigabyte",
  GiB: "Gibibyte",
  TB: "Terabyte",
  TiB: "Tebibyte",
  PB: "Petabyte",
  PiB: "Pebibyte",
  EB: "Exabyte",
  EiB: "Exbibyte",
  ZB: "Zettabyte",
  ZiB: "Zebibyte",
  YB: "Yottabyte",
  YiB: "Yobibyte",
};

export const data = createLinearConverter(DataMeasures, DataAliases);
