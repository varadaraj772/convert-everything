/**
 * A leap year in the proleptic Gregorian calendar.
 *
 * @example
 * isLeapYear(2024); // true
 * isLeapYear(1900); // false
 *
 * @param {number} year
 * @returns {boolean}
 */
export function isLeapYear(year) {
  if (!Number.isInteger(year)) {
    throw new TypeError(`year must be an integer, received ${year}.`);
  }

  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * The number of days in a Gregorian month.
 *
 * @example
 * daysInMonth(2024, 2); // 29
 * daysInMonth(2023, 2); // 28
 *
 * @param {number} year
 * @param {number} month 1 for January through 12 for December
 * @returns {number}
 */
export function daysInMonth(year, month) {
  if (!Number.isInteger(year)) {
    throw new TypeError(`year must be an integer, received ${year}.`);
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new RangeError(
      `month must be an integer between 1 and 12, received ${month}.`
    );
  }

  const days = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return days[month - 1];
}
