import test from "node:test";
import assert from "node:assert/strict";

import {
  angle,
  area,
  categories,
  convert,
  converters,
  data,
  daysInMonth,
  energy,
  formatQuantity,
  frequency,
  isLeapYear,
  length,
  parseQuantity,
  power,
  pressure,
  round,
  speed,
  temperature,
  time,
  units,
  volume,
  weight,
} from "../src/index.js";

/**
 * Assert that two numbers match within a relative tolerance.
 *
 * @param {number} actual
 * @param {number} expected
 * @param {number} [tolerance]
 */
function close(actual, expected, tolerance = 1e-12) {
  const difference = Math.abs(actual - expected);
  const scale = Math.max(Math.abs(expected), 1e-300);
  const relativeError = difference / scale;

  assert.ok(
    relativeError <= tolerance,
    `Expected ${actual} to be within ${tolerance} of ${expected} (relative error ${relativeError}).`
  );
}

test("length conversions use exact international definitions", () => {
  close(length.MeterToKilometer(1000), 1);
  close(length.MeterToFoot(1), 3.280839895013123);
  close(length.MileToMeter(1), 1609.344);
  close(length.InchToCentimeter(1), 2.54);
  close(length.NauticalMileToMeter(1), 1852);
  close(length.FathomToMeter(1), 1.8288);
  close(length.LightYearToMeter(1), 9460730472580800);
});

test("area conversions use exact international definitions", () => {
  close(area.AcreToSquareMeter(1), 4046.8564224);
  close(area.HectareToSquareMeter(1), 10000);
  close(area.SquareMileToAcre(1), 640);
  close(area.SquareFootToSquareInch(1), 144);
  close(area.SquareMeterToSquareMillimeter(1), 1e6);
});

test("volume conversions use US customary and imperial definitions", () => {
  close(volume.CubicMeterToLiter(1), 1000);
  close(volume.LiterToMilliliter(1), 1000);
  close(volume.GallonToLiter(1), 3.785411784);
  close(volume.ImperialGallonToLiter(1), 4.54609);
  close(volume.CubicFootToCubicInch(1), 1728);
  close(volume.QuartToPint(1), 2);
  close(volume.FluidOunceToMilliliter(1), 29.5735295625);
});

test("time conversions use the Julian year and month", () => {
  close(time.YearToDay(1), 365.25);
  close(time.MonthToDay(1), 30.4375);
  close(time.WeekToHour(1), 168);
  close(time.DayToSecond(1), 86400);
  close(time.CenturyToYear(1), 100);
  close(time.SecondToNanosecond(1), 1e9);
  close(time.FortnightToDay(1), 14);
  close(time.CommonYearToDay(1), 365);
  close(time.LeapYearToDay(1), 366);
  close(time.GregorianYearToDay(1), 365.2425);
});

test("calendar helpers handle leap years and month lengths", () => {
  assert.equal(isLeapYear(2024), true);
  assert.equal(isLeapYear(2023), false);
  assert.equal(isLeapYear(1900), false);
  assert.equal(isLeapYear(2000), true);

  assert.equal(daysInMonth(2024, 2), 29);
  assert.equal(daysInMonth(2023, 2), 28);
  assert.equal(daysInMonth(2024, 4), 30);
  assert.equal(daysInMonth(2024, 1), 31);

  assert.throws(() => daysInMonth(2024, 0), RangeError);
  assert.throws(() => daysInMonth(2024, 13), RangeError);
  assert.throws(() => isLeapYear(2024.5), TypeError);
});

test("energy conversions use correct calorie and BTU definitions", () => {
  close(energy.CalorieToJoule(1), 4.184);
  close(energy.SmallCalorieToJoule(1), 4.184);
  close(energy.FoodCalorieToJoule(1), 4184);
  close(energy.KilocalorieToJoule(1), 4184);
  close(energy.KilowattHourToJoule(1), 3_600_000);
  close(energy.BTUToJoule(1), 1055.05585262);
  close(energy.ElectronvoltToJoule(1), 1.602176634e-19);
  close(energy.JouleToErg(1), 1e7);
});

test("pressure conversions use correct reference values", () => {
  close(pressure.AtmosphereToPascal(1), 101325);
  close(pressure.BarToPascal(1), 100000);
  close(pressure.BarToPSI(1), 14.503773773020923);
  close(pressure.PSIToPascal(1), 6894.757293168);
  close(pressure.MillimeterOfMercuryToPascal(1), 133.322387415);
  close(pressure.InchOfMercuryToPascal(1), 3386.389);
});

test("data conversions separate decimal SI and IEC binary units", () => {
  close(data.ByteToBit(1), 8);
  close(data.BitToByte(1), 0.125);
  close(data.KilobyteToByte(1), 1000);
  close(data.KibibyteToByte(1), 1024);
  close(data.MegabyteToKilobyte(1), 1000);
  close(data.MebibyteToKibibyte(1), 1024);
  close(data.GigabyteToByte(1), 1e9);
  close(data.GibibyteToByte(1), 1024 ** 3);
  close(data.YottabyteToByte(1), 1e24);
  close(data.YobibyteToByte(1), 1024 ** 8);
});

test("speed conversions use exact definitions", () => {
  close(speed.KilometerPerHourToMeterPerSecond(1), 1000 / 3600);
  close(speed.MilePerHourToKilometerPerHour(1), 1.609344);
  close(speed.KnotToKilometerPerHour(1), 1.852);
  close(speed.FootPerSecondToMeterPerSecond(1), 0.3048);
});

test("power conversions use exact definitions", () => {
  close(power.KilowattToWatt(1), 1000);
  close(power.HorsepowerToWatt(1), 745.6998715822702);
  close(power.MetricHorsepowerToWatt(1), 735.49875);
  close(power.BTUPerHourToWatt(1), 0.2930710701722222);
  close(power.KilowattHourPerYearToWatt(1), 3600000 / 31557600);
});

test("frequency conversions use exact definitions", () => {
  close(frequency.KilohertzToHertz(1), 1000);
  close(frequency.RevolutionsPerMinuteToHertz(1), 1 / 60);
  close(frequency.BeatsPerMinuteToHertz(1), 1 / 60);
});

test("angle conversions use exact definitions", () => {
  close(angle.DegreeToRadian(180), Math.PI);
  close(angle.TurnToDegree(1), 360);
  close(angle.GradianToDegree(400), 360);
  close(angle.ArcminuteToDegree(60), 1);
  close(angle.ArcsecondToDegree(3600), 1);
});

test("weight conversions are not inverted and use correct definitions", () => {
  close(weight.KilogramToPound(1), 2.2046226218487757);
  close(weight.KilogramToOunce(1), 35.27396194958041);
  close(weight.KilogramToMilligram(1), 1e6);
  close(weight.KilogramToMicrogram(1), 1e9);
  close(weight.GramToKilogram(1), 0.001);
  close(weight.MilligramToKilogram(1), 1e-6);
  close(weight.TonneToKilogram(1), 1000);
  close(weight.UsTonToKilogram(1), 907.18474);
  close(weight.StoneToKilogram(1), 6.35029318);
  close(weight.PoundToOunce(1), 16);
  close(weight.OunceToGram(1), 28.349523125);
  close(weight.CaratToMilligram(1), 200);
});

test("temperature conversions cover all four scales", () => {
  close(temperature.CelsiusToFahrenheit(0), 32);
  close(temperature.FahrenheitToCelsius(32), 0);
  close(temperature.CelsiusToKelvin(-273.15), 0);
  close(temperature.KelvinToCelsius(0), -273.15);
  close(temperature.FahrenheitToKelvin(32), 273.15);
  close(temperature.KelvinToFahrenheit(273.15), 32);
  close(temperature.CelsiusToRankine(0), 491.67);
  close(temperature.RankineToCelsius(491.67), 0);
  close(temperature.FahrenheitToRankine(32), 491.67);
  close(temperature.RankineToKelvin(0), 0);
  close(temperature.CelsiusToCelsius(12.5), 12.5);
});

test("temperature rejects values below absolute zero", () => {
  assert.throws(() => temperature.CelsiusToKelvin(-273.16), RangeError);
  assert.throws(() => temperature.FahrenheitToCelsius(-459.68), RangeError);
  assert.throws(() => temperature.KelvinToCelsius(-0.001), RangeError);
  assert.throws(() => temperature.RankineToKelvin(-0.001), RangeError);

  close(temperature.CelsiusToKelvin(-273.15), 0);
  close(temperature.FahrenheitToKelvin(-459.67), 0);
  close(temperature.RankineToKelvin(0), 0);
});

test("the generic convert() API matches direct converters", () => {
  close(convert("length", "Meter", "Foot", 1), 3.280839895013123);
  close(convert("temperature", "Celsius", "Fahrenheit", 0), 32);
  close(convert("weight", "Kilogram", "Milligram", 1), 1e6);
  close(convert("data", "Byte", "Bit", 1), 8);

  for (const category of categories) {
    const converter = converters[category];
    const [fromUnit] = converter.units;
    const toUnit = converter.units.at(-1);

    assert.equal(
      converter.convert(fromUnit, toUnit, 2.5),
      convert(category, fromUnit, toUnit, 2.5)
    );
  }
});

test("every declared unit has a frozen units list", () => {
  for (const category of categories) {
    const converter = converters[category];

    assert.ok(Array.isArray(converter.units), `${category}.units should be an array`);
    assert.ok(Object.isFrozen(converter.units), `${category}.units should be frozen`);
    assert.equal(converter.units.length, units[category].length);
    assert.ok(converter.units.length > 0);
  }
});

test("every ordered unit pair has a working conversion function", () => {
  for (const category of categories) {
    const converter = converters[category];
    const names = converter.units;

    for (const fromUnit of names) {
      for (const toUnit of names) {
        const pairName = `${fromUnit}To${toUnit}`;
        const pairFunction = converter[pairName];

        assert.equal(
          typeof pairFunction,
          "function",
          `${category}.${pairName} should be a function`
        );

        const directResult = pairFunction(2.5);
        const genericResult = converter.convert(fromUnit, toUnit, 2.5);

        assert.equal(directResult, genericResult);
        assert.ok(Number.isFinite(directResult), `${category}.${pairName}(2.5) should be finite`);
      }
    }
  }
});

test("every conversion round-trips back to the original value", () => {
  const value = 123.456;

  for (const category of categories) {
    const converter = converters[category];
    const names = converter.units;

    for (const fromUnit of names) {
      for (const toUnit of names) {
        const converted = converter.convert(fromUnit, toUnit, value);
        const roundTrip = converter.convert(toUnit, fromUnit, converted);

        close(roundTrip, value, 1e-10);
      }
    }
  }
});

test("invalid numeric input is rejected instead of returning NaN", () => {
  const invalidValues = [NaN, Infinity, -Infinity, "1", null, undefined, {}, []];

  for (const value of invalidValues) {
    for (const category of categories) {
      const [fromUnit] = converters[category].units;

      assert.throws(
        () => convert(category, fromUnit, fromUnit, value),
        TypeError,
        `convert(${category}, ${fromUnit}, ${fromUnit}, ${String(value)}) should throw`
      );
    }
  }
});

test("unknown categories and units produce descriptive errors", () => {
  assert.throws(
    () => convert("mass", "Kilogram", "Pound", 1),
    /Unknown category: mass/
  );

  assert.throws(
    () => length.convert("Meter", "Smoot", 1),
    /Unsupported unit: Smoot/
  );

  assert.throws(
    () => temperature.convert("Celsius", "Rankine", "x"),
    TypeError
  );

  assert.throws(
    () => temperature.convert("Celsius", "Newton", 1),
    /Unsupported temperature unit: Newton/
  );
});

test("zero and negative values are valid finite numbers", () => {
  assert.equal(length.MeterToKilometer(0), 0);
  close(length.MeterToKilometer(-1000), -1);
  close(temperature.CelsiusToFahrenheit(-40), -40);
});

test("unit aliases resolve to the same values as canonical names", () => {
  close(convert("length", "m", "ft", 1), 3.280839895013123);
  close(length.convert("m", "ft", 1), 3.280839895013123);
  close(convert("weight", "kg", "lb", 1), 2.2046226218487757);
  close(convert("temperature", "°C", "°F", 0), 32);
  close(convert("volume", "gal", "L", 1), 3.785411784);
  close(convert("area", "sqft", "m2", 1), 0.09290304);
  close(convert("time", "yr", "d", 1), 365.25);
  close(convert("energy", "kcal", "J", 1), 4184);
  close(convert("pressure", "psi", "bar", 1), 0.06894757293168);
  close(convert("speed", "km/h", "m/s", 1), 1000 / 3600);
  close(convert("power", "kWh/year", "W", 1), 3600000 / 31557600);
  close(convert("frequency", "rpm", "Hz", 1), 1 / 60);
  close(convert("angle", "°", "rad", 180), Math.PI);
});

test("data aliases are case-sensitive", () => {
  close(convert("data", "B", "Bit", 1), 8);
  close(convert("data", "b", "Bit", 1), 1);
  close(convert("data", "KB", "Byte", 1), 1000);
  close(convert("data", "KiB", "Byte", 1), 1024);
});

test("alias maps are complete, frozen, and point at canonical units", () => {
  for (const category of categories) {
    const converter = converters[category];

    assert.ok(Object.isFrozen(converter.aliases));

    for (const [alias, unit] of Object.entries(converter.aliases)) {
      assert.ok(
        !converter.units.includes(alias),
        `${category} alias ${alias} collides with a canonical unit`
      );
      assert.ok(
        converter.units.includes(unit),
        `${category} alias ${alias} points to unknown unit ${unit}`
      );
      close(converter.convert(alias, unit, 1), 1, 1e-10);
      close(convert(category, alias, unit, 1), 1, 1e-10);
    }
  }
});

test("unknown aliases are rejected", () => {
  assert.throws(
    () => convert("length", "metres", "ft", 1),
    /Unsupported unit: metres/
  );
});

test("round uses decimal semantics rather than binary artefacts", () => {
  assert.equal(round(3.14159, 2), 3.14);
  assert.equal(round(3.14159), 3);
  assert.equal(round(-1.2345, 2), -1.23);
  assert.equal(round(1.5), 2);
  assert.equal(round(2.5), 3);
  assert.equal(round(1.005, 2), 1.01);
  assert.equal(round(2.675, 2), 2.68);
  assert.equal(round(-1.005, 2), -1.01);
  assert.equal(round(1.0049, 2), 1);
  assert.equal(round(0.00000015, 8), 1.5e-7);
  assert.equal(round(123.456, 0), 123);
  assert.equal(round(1e21, 2), 1e21);
  assert.equal(round(Number.MAX_VALUE, 2), Number.MAX_VALUE);
  assert.equal(round(-0, 2), 0);
});

test("round validates its arguments", () => {
  assert.throws(() => round(NaN), TypeError);
  assert.throws(() => round("1"), TypeError);
  assert.throws(() => round(1, -1), RangeError);
  assert.throws(() => round(1, 1.5), RangeError);
  assert.throws(() => round(1, 101), RangeError);
});

test("parseQuantity parses single and compound quantities", () => {
  close(parseQuantity("length", "5 ft 3 in", "Foot"), 5.25);
  close(parseQuantity("length", "5 ft 3 in"), 5.25);
  close(parseQuantity("length", "5ft3in", "Foot"), 5.25);
  close(parseQuantity("length", "5 ft, 3 in", "Foot"), 5.25);
  close(parseQuantity("length", "5 ft 3 in", "Meter"), 1.6002);
  close(parseQuantity("length", "1e3 m", "Meter"), 1000);
  close(parseQuantity("time", "1 h 30 min", "Minute"), 90);
  close(parseQuantity("time", "1 h 30 min"), 1.5);
  close(parseQuantity("weight", "1 kg 500 g", "Kilogram"), 1.5);
  close(parseQuantity("volume", "1 fl oz", "Milliliter"), 29.5735295625);
  close(parseQuantity("data", "1 MB", "Byte"), 1e6);
  close(parseQuantity("data", "1 MiB", "Byte"), 1024 ** 2);
  close(parseQuantity("speed", "60 km/h", "MeterPerSecond"), 60 * (1000 / 3600));
  close(parseQuantity("energy", "1 kWh", "Joule"), 3_600_000);
  close(parseQuantity("temperature", "-40 °C", "Fahrenheit"), -40);
  close(parseQuantity("angle", "180 °", "Radian"), Math.PI);
  close(parseQuantity("angle", "5'3\"", "Arcsecond"), 303);
});

test("parseQuantity rejects malformed input", () => {
  assert.throws(() => parseQuantity("length", ""), SyntaxError);
  assert.throws(() => parseQuantity("length", "abc"), SyntaxError);
  assert.throws(() => parseQuantity("length", "5 blobs"), SyntaxError);
  assert.throws(() => parseQuantity("temperature", "1 °C 2 °C"), SyntaxError);
  assert.throws(() => parseQuantity("mass", "1 kg"), RangeError);
  assert.throws(() => parseQuantity("length", 5), TypeError);
});

test("formatQuantity formats numbers and units with locale support", () => {
  assert.equal(
    formatQuantity(3.14159, "mi", { decimals: 2, locale: "en-US" }),
    "3.14 mi"
  );
  assert.equal(
    formatQuantity(1234.5, "m", { locale: "en-US" }),
    "1,234.5 m"
  );
  assert.equal(
    formatQuantity(1234.5, "m", { locale: "de-DE" }),
    "1.234,5 m"
  );
  assert.equal(
    formatQuantity(1234.5, "m", { locale: "en-US", useGrouping: false }),
    "1234.5 m"
  );
  assert.equal(
    formatQuantity(3.14159, "mi", {
      locale: "en-US",
      significantDigits: 3,
    }),
    "3.14 mi"
  );
  assert.equal(formatQuantity(-0.5, "m", { locale: "en-US" }), "-0.5 m");
});

test("formatQuantity validates its arguments", () => {
  assert.throws(() => formatQuantity(NaN, "m"), TypeError);
  assert.throws(() => formatQuantity(1, ""), TypeError);
  assert.throws(() => formatQuantity(1, "m", { decimals: -1 }), RangeError);
  assert.throws(() => formatQuantity(1, "m", { decimals: 21 }), RangeError);
  assert.throws(
    () => formatQuantity(1, "m", { significantDigits: 0 }),
    RangeError
  );
  assert.throws(
    () => formatQuantity(1, "m", { decimals: 2, significantDigits: 2 }),
    RangeError
  );
});

test("resolve() returns canonical unit names for units and aliases", () => {
  assert.equal(length.resolve("m"), "Meter");
  assert.equal(length.resolve("Meter"), "Meter");
  assert.equal(temperature.resolve("°C"), "Celsius");
  assert.equal(data.resolve("KiB"), "Kibibyte");
  assert.throws(() => length.resolve("blob"), RangeError);
});
