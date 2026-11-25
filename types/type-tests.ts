import {
  aliases,
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
  type Category,
  type CategoryUnit,
  type LengthAlias,
  type LengthUnit,
  type SpeedUnit,
} from "../src/index.js";

// Direct pair functions are typed and return numbers.
const lengthResult: number = length.MeterToFoot(1);
const temperatureResult: number = temperature.CelsiusToFahrenheit(0);
const weightResult: number = weight.KilogramToPound(1);

// The generic API narrows units by category.
const genericResult: number = convert("length", "Meter", "Foot", 1);
const temperatureUnit: CategoryUnit<"temperature"> = "Celsius";
const category: Category = "length";

// Runtime discovery is typed.
const lengthUnits: readonly LengthUnit[] = units.length;
const allCategories: readonly Category[] = categories;
const converterResult: number = converters.length.convert("Meter", "Kilometer", 1);
const resolvedUnit: LengthUnit = length.resolve("m");

// Aliases are typed and resolve to canonical units.
const aliasResult: number = convert("length", "m", "ft", 1);
const lengthAlias: LengthAlias = "m";
const aliasTarget: LengthUnit = aliases.length.m;
const aliasConversion: number = length.convert("m", "ft", 1);
const rounded: number = round(3.14159, 2);
const roundedDefault: number = round(3.14159);
const parsed: number = parseQuantity("length", "5 ft 3 in", "Meter");
const parsedDefault: number = parseQuantity("time", "1 h 30 min");
const formatted: string = formatQuantity(3.14159, "mi", {
  locale: "en-US",
  decimals: 2,
});
const leapYear: boolean = isLeapYear(2024);
const monthLength: number = daysInMonth(2024, 2);
const speedUnit: SpeedUnit = "KilometerPerHour";

// Every category exposes pair functions.
const angleResult: number = angle.DegreeToRadian(180);
const areaResult: number = area.AcreToSquareMeter(1);
const dataResult: number = data.ByteToBit(1);
const energyResult: number = energy.CalorieToJoule(1);
const frequencyResult: number = frequency.KilohertzToHertz(1);
const powerResult: number = power.KilowattToWatt(1);
const pressureResult: number = pressure.AtmosphereToPascal(1);
const speedResult: number = speed.KilometerPerHourToMeterPerSecond(1);
const timeResult: number = time.YearToDay(1);
const volumeResult: number = volume.GallonToLiter(1);

// @ts-expect-error pair functions accept numbers, not strings.
length.MeterToFoot("1");

// @ts-expect-error values must be numbers.
convert("length", "Meter", "Foot", "1");

// @ts-expect-error unknown categories are rejected at the type level.
convert("mass", "Kilogram", "Pound", 1);

// @ts-expect-error units are narrowed per category.
convert("length", "Celsius", "Foot", 1);

// @ts-expect-error unknown aliases are rejected at the type level.
convert("length", "metres", "ft", 1);

// @ts-expect-error aliases are narrowed per category.
convert("length", "kg", "ft", 1);

// @ts-expect-error round expects a number of decimals.
round(1, "2");

// @ts-expect-error parseQuantity units are narrowed per category.
parseQuantity("length", "5 ft", "kg");

// @ts-expect-error formatQuantity options are typed.
formatQuantity(1, "m", { decimals: "2" });

// @ts-expect-error years must be numbers.
isLeapYear("2024");

// @ts-expect-error months must be numbers.
daysInMonth(2024, "2");

void [
  aliasConversion,
  aliasResult,
  aliasTarget,
  allCategories,
  angleResult,
  areaResult,
  category,
  converterResult,
  dataResult,
  energyResult,
  formatted,
  frequencyResult,
  genericResult,
  leapYear,
  lengthAlias,
  lengthResult,
  lengthUnits,
  monthLength,
  parsed,
  parsedDefault,
  powerResult,
  pressureResult,
  resolvedUnit,
  rounded,
  roundedDefault,
  speedResult,
  speedUnit,
  temperatureResult,
  temperatureUnit,
  timeResult,
  volumeResult,
  weightResult,
];
