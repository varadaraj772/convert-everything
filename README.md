# convert-everything

[![npm version](https://img.shields.io/npm/v/convert-everything.svg)](https://www.npmjs.com/package/convert-everything)
[![CI](https://github.com/varadaraj772/convert-everything/actions/workflows/ci.yml/badge.svg)](https://github.com/varadaraj772/convert-everything/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/convert-everything.svg)](./LICENSE)

A dependency-free unit conversion library for JavaScript and TypeScript.

- **13 categories:** length, area, volume, time, temperature, energy, pressure, data storage, weight, speed, power, frequency, and angle.
- **Over 1,500 named conversions**, plus a generic `convert()` API.
- **Unit aliases** such as `m`, `kg`, `ft`, `°C`, `MB`, and `km/h`.
- **Quantity parser and formatter:** parse `"5 ft 3 in"`, format with locale support.
- **Decimal-safe `round()`** and Gregorian calendar helpers.
- **Zero runtime dependencies.**
- **ESM with TypeScript declarations.**
- **Strict input validation** so bad input fails loudly instead of returning `NaN`.

## Installation

```bash
npm install convert-everything
```

Requires Node.js 18 or newer. The package is ESM-only.

## Quick start

```js
import {
  convert,
  formatQuantity,
  length,
  parseQuantity,
  round,
  temperature,
  weight,
} from "convert-everything";

// Generic API: category, from unit, to unit, value
convert("length", "Meter", "Foot", 1);          // 3.280839895013123
convert("temperature", "Celsius", "Fahrenheit", 0); // 32
convert("weight", "Kilogram", "Pound", 1);      // 2.2046226218487757

// Aliases work anywhere a unit name does
convert("length", "m", "ft", 1);      // 3.280839895013123
convert("weight", "kg", "lb", 1);     // 2.2046226218487757
convert("temperature", "°C", "°F", 0); // 32
convert("speed", "km/h", "mph", 100); // 62.13711922373339

// Category API
length.MeterToFoot(1);                 // 3.280839895013123
length.KilometerToMile(5);             // 3.1068559611866697
temperature.CelsiusToFahrenheit(100);  // 212
weight.KilogramToMilligram(1);         // 1000000

// Parsing and formatting
parseQuantity("length", "5 ft 3 in", "Meter");        // 1.6002
formatQuantity(62.137119, "mph", { locale: "en-US", decimals: 2 }); // "62.14 mph"

// Fixed-decimal rounding
round(length.KilometerToMile(5), 2);   // 3.11
```

## API

### `convert(category, fromUnit, toUnit, value)`

The generic entry point. `category` must be one of the supported category names, and both units must belong to that category. Unit aliases are accepted anywhere a canonical name is accepted.

```js
import { convert } from "convert-everything";

convert("volume", "Gallon", "Liter", 1);  // 3.785411784
convert("data", "Gigabyte", "Megabyte", 1); // 1000
convert("data", "Gibibyte", "Mebibyte", 1); // 1024
convert("energy", "FoodCalorie", "Joule", 1); // 4184

convert("length", "m", "ft", 1);      // 3.280839895013123
convert("pressure", "psi", "bar", 1); // 0.06894757293168
```

Errors:

- `RangeError` for an unknown category, unit, or alias.
- `RangeError` when a temperature is below absolute zero.
- `TypeError` if `value` is not a finite number (numeric strings, `null`, `NaN`, and `Infinity` are rejected).

### `round(value, decimals = 0)`

Rounds a finite number to a fixed number of decimal places.

```js
import { length, round } from "convert-everything";

round(length.KilometerToMile(5), 2); // 3.11
round(3.14159);                      // 3
round(-1.2345, 2);                   // -1.23
```

`decimals` must be an integer between `0` and `100`; anything else throws a `RangeError`. Non-finite values throw a `TypeError`. Rounding uses decimal semantics, so `round(1.005, 2)` is `1.01`.

### `parseQuantity(category, input, toUnit?)`

Parses one or more quantity tokens. When `toUnit` is omitted, the first unit in the input is used as the target.

```js
import { parseQuantity } from "convert-everything";

parseQuantity("length", "5 ft 3 in", "Meter"); // 1.6002
parseQuantity("length", "5 ft 3 in");          // 5.25 (feet)
parseQuantity("time", "1 h 30 min", "Minute"); // 90
parseQuantity("weight", "1 kg 500 g");         // 1.5 (kilograms)
parseQuantity("speed", "60 km/h", "m/s");      // 16.666666666666668
parseQuantity("temperature", "-40 °C", "°F");  // -40
```

Inputs are case-sensitive and use `.` as the decimal separator. Commas between quantities are allowed (`"5 ft, 3 in"`), but thousands separators are not.

### `formatQuantity(value, unit, options?)`

Formats a number and unit as a localized string.

```js
import { formatQuantity } from "convert-everything";

formatQuantity(3.14159, "mi", { locale: "en-US", decimals: 2 }); // "3.14 mi"
formatQuantity(1234.5, "m", { locale: "de-DE" });                // "1.234,5 m"
formatQuantity(1234.5, "m", { locale: "en-US", useGrouping: false }); // "1234.5 m"
formatQuantity(3.14159, "mi", { locale: "en-US", significantDigits: 3 }); // "3.14 mi"
```

Options:

- `locale`: a BCP 47 locale string or array.
- `decimals`: fixed fraction digits (`0` to `20`).
- `significantDigits`: significant digits (`1` to `21`).
- `useGrouping`: whether to use thousands separators (default `true`).

Use either `decimals` or `significantDigits`, not both.

### Calendar helpers

```js
import { daysInMonth, isLeapYear } from "convert-everything";

isLeapYear(2024);     // true
isLeapYear(1900);     // false
daysInMonth(2024, 2); // 29
daysInMonth(2023, 2); // 28
```

These use the proleptic Gregorian calendar. Month numbers are `1` through `12`. Time-zone conversion is intentionally out of scope.

### Category converters

```js
import {
  angle,
  area,
  data,
  energy,
  frequency,
  length,
  power,
  pressure,
  speed,
  temperature,
  time,
  volume,
  weight,
} from "convert-everything";
```

Each converter provides:

```js
length.convert("Meter", "Foot", 1); // 3.280839895013123
length.convert("m", "ft", 1);       // aliases work here too
length.resolve("m");                // "Meter"
length.units;                       // ["Nanometer", "Micrometer", ...]
length.aliases;                     // { nm: "Nanometer", m: "Meter", ... }
length.MeterToFoot(1);              // 3.280839895013123
```

The named functions follow the pattern `<FromUnit>To<ToUnit>` and use canonical unit names. Every ordered pair of units is available, including same-unit conversions such as `MeterToMeter`. Use the generic `convert()` method when you want alias support.

### Discovery

```js
import { aliases, categories, converters, units } from "convert-everything";

categories;            // ["angle", "area", "data", "energy", ...]
converters.length;     // the length converter object
units.temperature;     // ["Celsius", "Fahrenheit", "Kelvin", "Rankine"]
aliases.length.m;      // "Meter"
```

## Unit aliases

Aliases are case-sensitive. This matters most for data units (`b` = bit, `B` = byte) and energy units (`cal` = small calorie, `Cal` = food calorie).

### Length aliases

| Aliases | Unit |
| --- | --- |
| `nm` | `Nanometer` |
| `um`, `µm` | `Micrometer` |
| `mm` | `Millimeter` |
| `cm` | `Centimeter` |
| `in` | `Inch` |
| `ft` | `Foot` |
| `yd` | `Yard` |
| `m` | `Meter` |
| `fathom` | `Fathom` |
| `nmi` | `NauticalMile` |
| `mi` | `Mile` |
| `km` | `Kilometer` |
| `ly` | `LightYear` |

### Area aliases

| Aliases | Unit |
| --- | --- |
| `mm2`, `mm²`, `sqmm` | `SquareMillimeter` |
| `cm2`, `cm²`, `sqcm` | `SquareCentimeter` |
| `in2`, `in²`, `sqin` | `SquareInch` |
| `ft2`, `ft²`, `sqft` | `SquareFoot` |
| `yd2`, `yd²`, `sqyd` | `SquareYard` |
| `m2`, `m²`, `sqm` | `SquareMeter` |
| `ac`, `acre` | `Acre` |
| `ha`, `hectare` | `Hectare` |
| `km2`, `km²`, `sqkm` | `SquareKilometer` |
| `mi2`, `mi²`, `sqmi` | `SquareMile` |

### Volume aliases

| Aliases | Unit |
| --- | --- |
| `mm3`, `mm³` | `CubicMillimeter` |
| `cm3`, `cm³` | `CubicCentimeter` |
| `ml`, `mL` | `Milliliter` |
| `in3`, `in³` | `CubicInch` |
| `floz`, `fl oz` | `FluidOunce` |
| `cup` | `Cup` |
| `pt` | `Pint` |
| `qt` | `Quart` |
| `l`, `L` | `Liter` |
| `gal` | `Gallon` |
| `impgal`, `ukgal` | `ImperialGallon` |
| `ft3`, `ft³` | `CubicFoot` |
| `m3`, `m³` | `CubicMeter` |

### Time aliases

| Aliases | Unit |
| --- | --- |
| `ns` | `Nanosecond` |
| `us`, `µs` | `Microsecond` |
| `ms` | `Millisecond` |
| `s`, `sec` | `Second` |
| `min` | `Minute` |
| `h`, `hr` | `Hour` |
| `d` | `Day` |
| `w`, `wk` | `Week` |
| `fortnight` | `Fortnight` |
| `mo`, `mon` | `Month` |
| `commonyear` | `CommonYear` |
| `gregorianyear` | `GregorianYear` |
| `julianyear` | `Year` |
| `leapyear` | `LeapYear` |
| `y`, `yr` | `Year` |
| `dec` | `Decade` |
| `cent` | `Century` |

### Energy aliases

| Aliases | Unit |
| --- | --- |
| `eV` | `Electronvolt` |
| `erg` | `Erg` |
| `J` | `Joule` |
| `cal` | `Calorie` |
| `smallcal` | `SmallCalorie` |
| `kJ` | `Kilojoule` |
| `Wh` | `WattHour` |
| `Cal` | `FoodCalorie` |
| `kcal` | `Kilocalorie` |
| `btu` | `BTU` |
| `kWh` | `KilowattHour` |
| `therm` | `Therm` |

### Pressure aliases

| Aliases | Unit |
| --- | --- |
| `Pa` | `Pascal` |
| `hPa` | `Hectopascal` |
| `mmHg` | `MillimeterOfMercury` |
| `kPa` | `Kilopascal` |
| `inHg` | `InchOfMercury` |
| `psi` | `PSI` |
| `bar` | `Bar` |
| `atm` | `Atmosphere` |

### Data aliases

| Aliases | Unit |
| --- | --- |
| `b` | `Bit` |
| `B` | `Byte` |
| `KB`, `kB` | `Kilobyte` |
| `KiB` | `Kibibyte` |
| `MB` | `Megabyte` |
| `MiB` | `Mebibyte` |
| `GB` | `Gigabyte` |
| `GiB` | `Gibibyte` |
| `TB` | `Terabyte` |
| `TiB` | `Tebibyte` |
| `PB` | `Petabyte` |
| `PiB` | `Pebibyte` |
| `EB` | `Exabyte` |
| `EiB` | `Exbibyte` |
| `ZB` | `Zettabyte` |
| `ZiB` | `Zebibyte` |
| `YB` | `Yottabyte` |
| `YiB` | `Yobibyte` |

### Weight aliases

| Aliases | Unit |
| --- | --- |
| `mcg`, `ug`, `µg` | `Microgram` |
| `mg` | `Milligram` |
| `g` | `Gram` |
| `ct`, `carat` | `Carat` |
| `oz` | `Ounce` |
| `lb`, `lbs` | `Pound` |
| `kg` | `Kilogram` |
| `st`, `stone` | `Stone` |
| `uston`, `shortton` | `UsTon` |
| `t`, `tonne`, `metricton` | `Tonne` |

### Temperature aliases

| Aliases | Unit |
| --- | --- |
| `C`, `°C`, `degC` | `Celsius` |
| `F`, `°F`, `degF` | `Fahrenheit` |
| `K`, `degK` | `Kelvin` |
| `R`, `°R`, `degR` | `Rankine` |

### Speed aliases

| Aliases | Unit |
| --- | --- |
| `m/s`, `mps` | `MeterPerSecond` |
| `km/h`, `kmh`, `kph` | `KilometerPerHour` |
| `ft/s`, `fps` | `FootPerSecond` |
| `mph`, `mi/h` | `MilePerHour` |
| `kn`, `kt`, `knot` | `Knot` |

### Power aliases

| Aliases | Unit |
| --- | --- |
| `kWh/yr`, `kWh/year`, `kwhy` | `KilowattHourPerYear` |
| `BTU/h`, `btuh` | `BTUPerHour` |
| `W` | `Watt` |
| `PS` | `MetricHorsepower` |
| `hp` | `Horsepower` |
| `kW` | `Kilowatt` |
| `MW` | `Megawatt` |
| `GW` | `Gigawatt` |

### Frequency aliases

| Aliases | Unit |
| --- | --- |
| `bpm`, `BPM` | `BeatsPerMinute` |
| `rpm`, `RPM` | `RevolutionsPerMinute` |
| `Hz` | `Hertz` |
| `kHz` | `Kilohertz` |
| `MHz` | `Megahertz` |
| `GHz` | `Gigahertz` |

### Angle aliases

| Aliases | Unit |
| --- | --- |
| `"`, `arcsec` | `Arcsecond` |
| `'`, `arcmin` | `Arcminute` |
| `gon`, `grad` | `Gradian` |
| `deg`, `°` | `Degree` |
| `rad` | `Radian` |
| `rev`, `revolution`, `turn` | `Turn` |

## Supported units

Factors show how many base units one unit contains. For example, `1 Kilometer = 1000 Meter` in the length table.

### Length (base: meter)

| Unit | Factor |
| --- | ---: |
| `Nanometer` | `1e-9` |
| `Micrometer` | `1e-6` |
| `Millimeter` | `1e-3` |
| `Centimeter` | `1e-2` |
| `Inch` | `0.0254` |
| `Foot` | `0.3048` |
| `Yard` | `0.9144` |
| `Meter` | `1` |
| `Fathom` | `1.8288` |
| `NauticalMile` | `1852` |
| `Mile` | `1609.344` |
| `Kilometer` | `1000` |
| `LightYear` | `9460730472580800` |

### Area (base: square meter)

| Unit | Factor |
| --- | ---: |
| `SquareMillimeter` | `1e-6` |
| `SquareCentimeter` | `1e-4` |
| `SquareInch` | `0.00064516` |
| `SquareFoot` | `0.09290304` |
| `SquareYard` | `0.83612736` |
| `SquareMeter` | `1` |
| `Acre` | `4046.8564224` |
| `Hectare` | `10000` |
| `SquareKilometer` | `1e6` |
| `SquareMile` | `2589988.110336` |

### Volume (base: cubic meter)

`Gallon`, `FluidOunce`, `Pint`, `Quart`, and `Cup` are US customary units. `ImperialGallon` is the UK imperial gallon.

| Unit | Factor |
| --- | ---: |
| `CubicMillimeter` | `1e-9` |
| `CubicCentimeter` | `1e-6` |
| `Milliliter` | `1e-6` |
| `CubicInch` | `0.000016387064` |
| `FluidOunce` | `0.0000295735295625` |
| `Cup` | `0.0002365882365` |
| `Pint` | `0.000473176473` |
| `Quart` | `0.000946352946` |
| `Liter` | `1e-3` |
| `Gallon` | `0.003785411784` |
| `ImperialGallon` | `0.00454609` |
| `CubicFoot` | `0.028316846592` |
| `CubicMeter` | `1` |

### Time (base: second)

`Month` and `Year` are average Julian values. Fixed-duration units are available for exact calendar lengths: `CommonYear` (365 days), `LeapYear` (366 days), and `GregorianYear` (365.2425 days). Use `isLeapYear()` and `daysInMonth()` for calendar logic.

| Unit | Factor |
| --- | ---: |
| `Nanosecond` | `1e-9` |
| `Microsecond` | `1e-6` |
| `Millisecond` | `1e-3` |
| `Second` | `1` |
| `Minute` | `60` |
| `Hour` | `3600` |
| `Day` | `86400` |
| `Week` | `604800` |
| `Fortnight` | `1209600` |
| `Month` | `2629800` |
| `CommonYear` | `31536000` |
| `GregorianYear` | `31556952` |
| `Year` | `31557600` |
| `LeapYear` | `31622400` |
| `Decade` | `315576000` |
| `Century` | `3155760000` |

### Energy (base: joule)

`Calorie` and `SmallCalorie` are the thermochemical calorie (`4.184 J`). `Kilocalorie` and `FoodCalorie` are the large calorie (`4184 J`) used on nutrition labels. `BTU` is the international table BTU, and `Therm` is the US therm.

| Unit | Factor |
| --- | ---: |
| `Electronvolt` | `1.602176634e-19` |
| `Erg` | `1e-7` |
| `Joule` | `1` |
| `SmallCalorie` | `4.184` |
| `Calorie` | `4.184` |
| `Kilojoule` | `1000` |
| `WattHour` | `3600` |
| `FoodCalorie` | `4184` |
| `Kilocalorie` | `4184` |
| `BTU` | `1055.05585262` |
| `KilowattHour` | `3600000` |
| `Therm` | `105480400` |

### Pressure (base: pascal)

| Unit | Factor |
| --- | ---: |
| `Pascal` | `1` |
| `Hectopascal` | `100` |
| `MillimeterOfMercury` | `133.322387415` |
| `Kilopascal` | `1000` |
| `InchOfMercury` | `3386.389` |
| `PSI` | `6894.757293168` |
| `Bar` | `100000` |
| `Atmosphere` | `101325` |

### Data storage (base: byte)

Decimal SI and IEC binary units are separate. `Kilobyte` is `1000` bytes; `Kibibyte` is `1024` bytes.

| Unit | Factor |
| --- | ---: |
| `Bit` | `0.125` |
| `Byte` | `1` |
| `Kilobyte` | `1000` |
| `Kibibyte` | `1024` |
| `Megabyte` | `1e6` |
| `Mebibyte` | `1024²` |
| `Gigabyte` | `1e9` |
| `Gibibyte` | `1024³` |
| `Terabyte` | `1e12` |
| `Tebibyte` | `1024⁴` |
| `Petabyte` | `1e15` |
| `Pebibyte` | `1024⁵` |
| `Exabyte` | `1e18` |
| `Exbibyte` | `1024⁶` |
| `Zettabyte` | `1e21` |
| `Zebibyte` | `1024⁷` |
| `Yottabyte` | `1e24` |
| `Yobibyte` | `1024⁸` |

### Weight (base: kilogram)

`UsTon` is the US short ton (`2000 lb`, `907.18474 kg`), not the imperial long ton. `Tonne` is the metric tonne (`1000 kg`).

| Unit | Factor |
| --- | ---: |
| `Microgram` | `1e-9` |
| `Milligram` | `1e-6` |
| `Gram` | `1e-3` |
| `Carat` | `0.0002` |
| `Ounce` | `0.028349523125` |
| `Pound` | `0.45359237` |
| `Kilogram` | `1` |
| `Stone` | `6.35029318` |
| `UsTon` | `907.18474` |
| `Tonne` | `1000` |

### Temperature

Temperature is not a simple factor conversion because the scales have different zero points. The library converts through Celsius.

| Unit | To Celsius | From Celsius |
| --- | --- | --- |
| `Celsius` | `C = value` | `value = C` |
| `Fahrenheit` | `C = (F - 32) × 5/9` | `F = C × 9/5 + 32` |
| `Kelvin` | `C = K - 273.15` | `K = C + 273.15` |
| `Rankine` | `C = (R - 491.67) × 5/9` | `R = (C + 273.15) × 9/5` |

```js
temperature.CelsiusToKelvin(0);      // 273.15
temperature.KelvinToCelsius(273.15); // 0
temperature.FahrenheitToRankine(32); // 491.67
temperature.RankineToKelvin(0);      // 0
```

Values below absolute zero throw a `RangeError`.

### Speed (base: meter per second)

| Unit | Factor |
| --- | ---: |
| `MeterPerSecond` | `1` |
| `KilometerPerHour` | `0.2777777777777778` |
| `FootPerSecond` | `0.3048` |
| `MilePerHour` | `0.44704` |
| `Knot` | `0.5144444444444445` |

### Power (base: watt)

`Horsepower` is mechanical horsepower; `MetricHorsepower` is the PS/Pferdestärke variant. `KilowattHourPerYear` uses a 365.25-day year.

| Unit | Factor |
| --- | ---: |
| `KilowattHourPerYear` | `0.11407711613050422` |
| `BTUPerHour` | `0.2930710701722222` |
| `Watt` | `1` |
| `MetricHorsepower` | `735.49875` |
| `Horsepower` | `745.6998715822702` |
| `Kilowatt` | `1000` |
| `Megawatt` | `1e6` |
| `Gigawatt` | `1e9` |

### Frequency (base: hertz)

| Unit | Factor |
| --- | ---: |
| `BeatsPerMinute` | `0.016666666666666666` |
| `RevolutionsPerMinute` | `0.016666666666666666` |
| `Hertz` | `1` |
| `Kilohertz` | `1000` |
| `Megahertz` | `1e6` |
| `Gigahertz` | `1e9` |

### Angle (base: radian)

| Unit | Factor |
| --- | ---: |
| `Arcsecond` | `0.00000484813681109536` |
| `Arcminute` | `0.0002908882086657216` |
| `Gradian` | `0.015707963267948967` |
| `Degree` | `0.017453292519943295` |
| `Radian` | `1` |
| `Turn` | `6.283185307179586` |

## Precision and rounding

Conversions return raw JavaScript numbers. Use `round()` or round at the call site if you need a fixed number of decimals:

```js
import { length, round } from "convert-everything";

const miles = length.KilometerToMile(5);
round(miles, 2); // 3.11
round(1.005, 2); // 1.01
```

`round()` uses decimal semantics rather than multiplying the binary approximation, so common values such as `1.005` round as expected. It is not arbitrary-precision arithmetic; use a decimal library if you need exact rational results.

Temperature conversions reject values below absolute zero. Other physical constraints remain the caller's responsibility.

See [Limitations and tradeoffs](#limitations-and-tradeoffs) for the full list of numeric, parsing, formatting, time, and unit-coverage limits.

## Limitations and tradeoffs

These are intentional limits, so you can decide whether the library fits your use case.

### API and module format

- **ESM-only.** There is no CommonJS build. Use dynamic `import()` or a bundler if you need CJS.
- **Pair functions are canonical-only.** `MeterToFoot` and similar work with canonical names. Use `convert()`, `converter.convert()`, or `converter.resolve()` for aliases.
- **A category is always required.** There is no unit auto-detection.
- **Names and aliases are case-sensitive.** `B` and `b` are different units, as are `cal` and `Cal`.
- **Coverage is limited to the 13 documented categories.** There is no currency, fuel economy, torque, viscosity, luminance, or radiation support.

### Numeric precision

- **Conversions use IEEE-754 doubles.** There is no rational, arbitrary-precision, or exact-decimal arithmetic.
- **`round()` is decimal-aware but not exact.** It supports `0` to `100` decimals, does not support negative decimals, and returns the input unchanged when shifting the decimal point would overflow. It rounds fixed decimals only; use `formatQuantity(..., { significantDigits })` for significant figures.
- **`formatQuantity()` is bounded by `Intl.NumberFormat`.** It supports up to `20` fraction digits and `21` significant digits. Values smaller than the display precision can appear as `0`.
- **Large data units lose integer precision.** Units above `2^53` bytes, such as `Exbibyte` and larger, cannot represent every integer exactly.
- **Formatted output can vary by environment.** `formatQuantity()` depends on the host's ICU and locale data.

### Parsing

- **`parseQuantity()` is a tokenizer, not an expression evaluator.** It does not support parentheses, multiplication, division, or unit-conversion operators.
- **Inputs are case-sensitive and use `.` as the decimal separator.** Thousands separators and locale decimal commas are not supported.
- **Compound quantities are summed.** `"5 ft 3 in"` means `5 ft + 3 in`, and each token's sign applies only to that token.
- **The default target unit is the first unit in the input.**
- **Temperature accepts exactly one quantity.**
- **Unit names are not localized.** Use the English unit names and aliases documented above.
- **Parsing uses `Number()`**, so the result is still a raw double.

### Formatting

- **The unit string is appended verbatim.** `formatQuantity()` does not translate unit names.
- **Locale affects number formatting only**, not unit names.
- **Output depends on `Intl`/ICU** and may differ between runtimes or locale-data versions.

### Time and calendars

- **`Month` and `Year` are average Julian values**, not calendar months or calendar years.
- **`CommonYear`, `LeapYear`, and `GregorianYear` are fixed durations.**
- **Calendar helpers are proleptic Gregorian.** `isLeapYear()` and `daysInMonth()` do not model historical calendar reforms.
- **No time-zone or date arithmetic.** There is no DST handling, no `addMonths()`/`addYears()`, and no localized date formatting.

### Temperature

- **Below absolute zero throws a `RangeError`.**
- **No other physical constraints are enforced.**
- **Only Celsius, Fahrenheit, Kelvin, and Rankine are supported.** There is no Réaumur, Delisle, or other historical scale.

### Unit definitions and variants

- **US customary volume units are used by default.** `Gallon` and `FluidOunce` are US liquid measures, `Cup` is the US customary cup (`236.5882365 mL`, not the US legal/nutrition cup of `240 mL`), and `ImperialGallon` is the UK imperial gallon. There is no dry gallon or imperial fluid-ounce variant.
- **Energy conventions are fixed.** `BTU` is the international table BTU (not the thermochemical BTU) and `Therm` is the US therm (the EC therm differs slightly).
- **Pressure conventions are fixed.** `MillimeterOfMercury` is conventional mmHg, not the slightly different torr.
- **Power conventions are fixed.** `Horsepower` is mechanical horsepower and `MetricHorsepower` is PS/Pferdestärke.
- **Speed has no Mach.** Mach depends on temperature and pressure.
- **Frequency treats RPM and BPM as cycles per second.** They are not angular frequency (`rad/s`).
- **Angle has no steradian.** Solid angle is not supported.
- **Data has `Bit` but no kilobit or megabit units.** Decimal SI and IEC binary byte units are separate.
- **Historical and regional variants are not included** unless explicitly listed above.

### Validation

- **Unknown categories, units, and aliases throw.**
- **Non-finite values throw.** Strings, `null`, `NaN`, and `Infinity` are rejected rather than coerced.
- **Only temperature has physical validation.** Other physical constraints remain the caller's responsibility.

## Migrating from 1.x

Version 2.0.0 fixes several incorrect conversion factors. Results for some conversions will change:

| Conversion | 1.x result | 2.0.0 result |
| --- | ---: | ---: |
| `KilogramToPound(1)` | `0.4536` | `2.2046226218` |
| `GramToKilogram(1)` | `1000` | `0.001` |
| `KilogramToMilligram(1)` | `0.001` | `1000000` |
| `UsTonToKilogram(1)` | `0.000984207` (long-ton factor) | `907.18474` (short ton) |
| `SmallCalorieToJoule(1)` | `0.003969` | `4.184` |
| `KilobyteToByte(1)` | `1024` | `1000` (use `Kibibyte`) |

Other breaking changes:

- Conversion values must be finite numbers. Numeric strings and `null` now throw a `TypeError`.
- `UsTon` means the US short ton, not the imperial long ton.
- `Calorie` and `SmallCalorie` both represent `4.184 J`. Use `Kilocalorie` or `FoodCalorie` for `4184 J`.
- Byte units now distinguish decimal SI from IEC binary units. `Kilobyte` is `1000` bytes; use `Kibibyte` for `1024`.
- Temperature values below absolute zero now throw a `RangeError`.
- The package is ESM-only and exposes a single root entry point through `exports`.

New in 2.0.0:

- Speed, power, frequency, and angle categories.
- `parseQuantity()` and `formatQuantity()`.
- `isLeapYear()` and `daysInMonth()`.
- Explicit `CommonYear`, `LeapYear`, and `GregorianYear` time units.

See [CHANGELOG.md](./CHANGELOG.md) for the full list.

## Development

```bash
npm install
npm test             # run the test suite
npm run typecheck    # validate the generated TypeScript declarations
npm run check:types  # verify src/index.d.ts is in sync
npm run build:types  # regenerate src/index.d.ts
npm run pack:check   # preview the published package
```

The test suite covers known reference values, every ordered unit pair, aliases, parsing, formatting, calendar helpers, round-trip accuracy, validation errors, and the generic API.

## Releases

Releases are published by pushing a version tag. For the first `2.0.0` release:

```bash
git tag v2.0.0
git push origin v2.0.0
```

For later releases, let npm bump the version and create the tag:

```bash
npm version patch   # or minor / major
git push --follow-tags
```

The tag must match `package.json` (for example `v2.0.0`). The release workflow then:

1. Runs the test suite, type generation check, and type check.
2. Publishes to npm with provenance.
3. Creates a GitHub release with generated notes.

The workflow requires an `NPM_TOKEN` repository secret with publish access. The workflow itself uses `GITHUB_TOKEN` to create the release.

## License

[Apache-2.0](./LICENSE)
