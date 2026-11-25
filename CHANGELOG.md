# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-11-24

### Added

- Generic `convert(category, fromUnit, toUnit, value)` API.
- `converters`, `categories`, `units`, and `aliases` exports for runtime discovery.
- Per-category `convert(fromUnit, toUnit, value)` method.
- Case-sensitive unit aliases such as `m`, `kg`, `ft`, `°C`, `psi`, and `MB`.
- Per-converter `resolve()` method for canonicalising units and aliases.
- Decimal-safe `round(value, decimals)` helper.
- `parseQuantity(category, input, toUnit?)` for strings such as `"5 ft 3 in"` and `"1 h 30 min"`.
- `formatQuantity(value, unit, options?)` with locale, fixed-decimal, significant-digit, and grouping support.
- `isLeapYear(year)` and `daysInMonth(year, month)` Gregorian calendar helpers.
- Speed, power, frequency, and angle categories.
- Same-unit conversions (for example `MeterToMeter`).
- TypeScript declarations generated from the runtime definitions.
- Test suite using the built-in `node:test` runner.
- Continuous integration workflow.
- Tag-driven release workflow with npm provenance and automatic GitHub releases.
- New units:
  - Length: `NauticalMile`, `Fathom`.
  - Area: `SquareMillimeter`.
  - Volume: `CubicMillimeter`, `ImperialGallon`, `FluidOunce`, `Pint`, `Quart`, `Cup`.
  - Time: `Nanosecond`, `Microsecond`, `Fortnight`, `CommonYear`, `GregorianYear`, `LeapYear`, `Decade`, `Century`.
  - Energy: `Kilocalorie`, `Erg`, `Electronvolt`.
  - Pressure: `Hectopascal`, `MillimeterOfMercury`, `InchOfMercury`.
  - Data: `Bit`, `Kibibyte`, `Mebibyte`, `Gibibyte`, `Tebibyte`, `Pebibyte`, `Exbibyte`, `Zebibyte`, `Yobibyte`.
  - Weight: `Microgram`, `Stone`, `Carat`.
  - Temperature: `Rankine`.
  - Speed: `MeterPerSecond`, `KilometerPerHour`, `FootPerSecond`, `MilePerHour`, `Knot`.
  - Power: `Watt`, `Kilowatt`, `Megawatt`, `Gigawatt`, `MetricHorsepower`, `Horsepower`, `BTUPerHour`, `KilowattHourPerYear`.
  - Frequency: `Hertz`, `Kilohertz`, `Megahertz`, `Gigahertz`, `RevolutionsPerMinute`, `BeatsPerMinute`.
  - Angle: `Radian`, `Degree`, `Gradian`, `Arcminute`, `Arcsecond`, `Turn`.

### Fixed

- **Weight conversions were inverted.** `KilogramToPound(1)` returned `0.4536` instead of `2.2046`.
- **Milligram factor was wrong.** One kilogram now converts to `1,000,000` milligrams.
- **US ton used the imperial long ton.** `UsTon` is now the US short ton (`907.18474 kg`).
- **Small calorie factor was wrong.** `SmallCalorie` is now `4.184 J` instead of `0.003969 J`.
- Improved precision for miles, acres, square miles, square yards, square feet, PSI, BTU, light-years, and months/years.
- `round()` no longer produces binary artefacts such as rounding `1.005` to `1`.
- Unknown units now throw a descriptive `RangeError` instead of a generic error.
- `null` and numeric strings are rejected instead of being silently coerced.
- Temperature conversions below absolute zero now throw a `RangeError`.

### Changed

- **Breaking:** conversion values must be finite numbers. Passing a string, `null`, `NaN`, or `Infinity` throws a `TypeError`.
- **Breaking:** `Calorie` and `SmallCalorie` both represent the thermochemical calorie (`4.184 J`). `FoodCalorie` and `Kilocalorie` represent `4184 J`.
- **Breaking:** `UsTon` now correctly means the US short ton, not the imperial long ton.
- **Breaking:** byte units now use decimal SI multipliers. `Kilobyte` is `1000` bytes; use `Kibibyte` for `1024`. `Megabyte`, `Gigabyte`, and the larger units follow the same split.
- **Breaking:** temperature values below absolute zero now throw a `RangeError`.
- `Month` is the average Julian month (`30.4375 days`); `Year` is the Julian year (`365.25 days`). Use `CommonYear`, `LeapYear`, or `GregorianYear` for fixed calendar lengths.
- The package is now ESM-only with an `exports` map and an explicit `files` allowlist.

### Removed

- `.DS_Store` is no longer tracked in the repository.

## [1.0.2]

- Previous public release.
