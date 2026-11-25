import { createLinearConverter } from "../core.js";

/**
 * Time units expressed in seconds.
 *
 * `Month` and `Year` are average Julian values. Explicit fixed-duration
 * units (`CommonYear`, `LeapYear`, `GregorianYear`, `Fortnight`) are also
 * available. Calendar arithmetic belongs in `isLeapYear` and `daysInMonth`.
 *
 * @type {Record<string, number>}
 */
const TimeMeasures = {
  Nanosecond: 1e-9,
  Microsecond: 1e-6,
  Millisecond: 1e-3,
  Second: 1,
  Minute: 60,
  Hour: 3600,
  Day: 86400,
  Week: 604800,
  Fortnight: 1209600,
  Month: 2629800,
  CommonYear: 31536000,
  GregorianYear: 31556952,
  Year: 31557600,
  LeapYear: 31622400,
  Decade: 315576000,
  Century: 3155760000,
};

const TimeAliases = {
  ns: "Nanosecond",
  us: "Microsecond",
  "µs": "Microsecond",
  ms: "Millisecond",
  s: "Second",
  sec: "Second",
  min: "Minute",
  h: "Hour",
  hr: "Hour",
  d: "Day",
  w: "Week",
  wk: "Week",
  fortnight: "Fortnight",
  mo: "Month",
  mon: "Month",
  commonyear: "CommonYear",
  gregorianyear: "GregorianYear",
  julianyear: "Year",
  leapyear: "LeapYear",
  y: "Year",
  yr: "Year",
  dec: "Decade",
  cent: "Century",
};

export const time = createLinearConverter(TimeMeasures, TimeAliases);
