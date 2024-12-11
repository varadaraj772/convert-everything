const EnergyMeasures = {
  Joule: 1,
  Kilojoule: 1000,
  Calorie: 4.184,
  WattHour: 3600,
  KilowattHour: 3600000,
  BTU: 1055,
  Therm: 105500000,
  SmallCalorie: 0.003969,
  FoodCalorie: 4184,
};

function convertEnergy(fromUnit, toUnit, value) {
  if (!EnergyMeasures[fromUnit] || !EnergyMeasures[toUnit]) {
    throw new Error(`Unsupported energy unit: ${fromUnit} or ${toUnit}`);
  }
  return (value * EnergyMeasures[fromUnit]) / EnergyMeasures[toUnit];
}

export const energy = {
  // Joule conversions
  JouleToKilojoule: (value) => convertEnergy("Joule", "Kilojoule", value),
  JouleToCalorie: (value) => convertEnergy("Joule", "Calorie", value),
  JouleToWattHour: (value) => convertEnergy("Joule", "WattHour", value),
  JouleToKilowattHour: (value) => convertEnergy("Joule", "KilowattHour", value),
  JouleToBTU: (value) => convertEnergy("Joule", "BTU", value),
  JouleToTherm: (value) => convertEnergy("Joule", "Therm", value),
  JouleToSmallCalorie: (value) => convertEnergy("Joule", "SmallCalorie", value),
  JouleToFoodCalorie: (value) => convertEnergy("Joule", "FoodCalorie", value),

  // Kilojoule conversions
  KilojouleToJoule: (value) => convertEnergy("Kilojoule", "Joule", value),
  KilojouleToCalorie: (value) => convertEnergy("Kilojoule", "Calorie", value),
  KilojouleToWattHour: (value) => convertEnergy("Kilojoule", "WattHour", value),
  KilojouleToKilowattHour: (value) =>
    convertEnergy("Kilojoule", "KilowattHour", value),
  KilojouleToBTU: (value) => convertEnergy("Kilojoule", "BTU", value),
  KilojouleToTherm: (value) => convertEnergy("Kilojoule", "Therm", value),
  KilojouleToSmallCalorie: (value) =>
    convertEnergy("Kilojoule", "SmallCalorie", value),
  KilojouleToFoodCalorie: (value) =>
    convertEnergy("Kilojoule", "FoodCalorie", value),

  // Calorie conversions
  CalorieToJoule: (value) => convertEnergy("Calorie", "Joule", value),
  CalorieToKilojoule: (value) => convertEnergy("Calorie", "Kilojoule", value),
  CalorieToWattHour: (value) => convertEnergy("Calorie", "WattHour", value),
  CalorieToKilowattHour: (value) =>
    convertEnergy("Calorie", "KilowattHour", value),
  CalorieToBTU: (value) => convertEnergy("Calorie", "BTU", value),
  CalorieToTherm: (value) => convertEnergy("Calorie", "Therm", value),
  CalorieToSmallCalorie: (value) =>
    convertEnergy("Calorie", "SmallCalorie", value),
  CalorieToFoodCalorie: (value) =>
    convertEnergy("Calorie", "FoodCalorie", value),

  // WattHour conversions
  WattHourToJoule: (value) => convertEnergy("WattHour", "Joule", value),
  WattHourToKilojoule: (value) => convertEnergy("WattHour", "Kilojoule", value),
  WattHourToCalorie: (value) => convertEnergy("WattHour", "Calorie", value),
  WattHourToKilowattHour: (value) =>
    convertEnergy("WattHour", "KilowattHour", value),
  WattHourToBTU: (value) => convertEnergy("WattHour", "BTU", value),
  WattHourToTherm: (value) => convertEnergy("WattHour", "Therm", value),
  WattHourToSmallCalorie: (value) =>
    convertEnergy("WattHour", "SmallCalorie", value),
  WattHourToFoodCalorie: (value) =>
    convertEnergy("WattHour", "FoodCalorie", value),

  // KilowattHour conversions
  KilowattHourToJoule: (value) => convertEnergy("KilowattHour", "Joule", value),
  KilowattHourToKilojoule: (value) =>
    convertEnergy("KilowattHour", "Kilojoule", value),
  KilowattHourToCalorie: (value) =>
    convertEnergy("KilowattHour", "Calorie", value),
  KilowattHourToWattHour: (value) =>
    convertEnergy("KilowattHour", "WattHour", value),
  KilowattHourToBTU: (value) => convertEnergy("KilowattHour", "BTU", value),
  KilowattHourToTherm: (value) => convertEnergy("KilowattHour", "Therm", value),
  KilowattHourToSmallCalorie: (value) =>
    convertEnergy("KilowattHour", "SmallCalorie", value),
  KilowattHourToFoodCalorie: (value) =>
    convertEnergy("KilowattHour", "FoodCalorie", value),

  // BTU conversions
  BTUToJoule: (value) => convertEnergy("BTU", "Joule", value),
  BTUToKilojoule: (value) => convertEnergy("BTU", "Kilojoule", value),
  BTUToCalorie: (value) => convertEnergy("BTU", "Calorie", value),
  BTUToWattHour: (value) => convertEnergy("BTU", "WattHour", value),
  BTUToKilowattHour: (value) => convertEnergy("BTU", "KilowattHour", value),
  BTUToTherm: (value) => convertEnergy("BTU", "Therm", value),
  BTUToSmallCalorie: (value) => convertEnergy("BTU", "SmallCalorie", value),
  BTUToFoodCalorie: (value) => convertEnergy("BTU", "FoodCalorie", value),

  // Therm conversions
  ThermToJoule: (value) => convertEnergy("Therm", "Joule", value),
  ThermToKilojoule: (value) => convertEnergy("Therm", "Kilojoule", value),
  ThermToCalorie: (value) => convertEnergy("Therm", "Calorie", value),
  ThermToWattHour: (value) => convertEnergy("Therm", "WattHour", value),
  ThermToKilowattHour: (value) => convertEnergy("Therm", "KilowattHour", value),
  ThermToBTU: (value) => convertEnergy("Therm", "BTU", value),
  ThermToSmallCalorie: (value) => convertEnergy("Therm", "SmallCalorie", value),
  ThermToFoodCalorie: (value) => convertEnergy("Therm", "FoodCalorie", value),

  // SmallCalorie conversions
  SmallCalorieToJoule: (value) => convertEnergy("SmallCalorie", "Joule", value),
  SmallCalorieToKilojoule: (value) =>
    convertEnergy("SmallCalorie", "Kilojoule", value),
  SmallCalorieToCalorie: (value) =>
    convertEnergy("SmallCalorie", "Calorie", value),
  SmallCalorieToWattHour: (value) =>
    convertEnergy("SmallCalorie", "WattHour", value),
  SmallCalorieToKilowattHour: (value) =>
    convertEnergy("SmallCalorie", "KilowattHour", value),
  SmallCalorieToBTU: (value) => convertEnergy("SmallCalorie", "BTU", value),
  SmallCalorieToTherm: (value) => convertEnergy("SmallCalorie", "Therm", value),
  SmallCalorieToFoodCalorie: (value) =>
    convertEnergy("SmallCalorie", "FoodCalorie", value),

  // FoodCalorie conversions
  FoodCalorieToJoule: (value) => convertEnergy("FoodCalorie", "Joule", value),
  FoodCalorieToKilojoule: (value) =>
    convertEnergy("FoodCalorie", "Kilojoule", value),
  FoodCalorieToCalorie: (value) =>
    convertEnergy("FoodCalorie", "Calorie", value),
  FoodCalorieToWattHour: (value) =>
    convertEnergy("FoodCalorie", "WattHour", value),
  FoodCalorieToKilowattHour: (value) =>
    convertEnergy("FoodCalorie", "KilowattHour", value),
  FoodCalorieToBTU: (value) => convertEnergy("FoodCalorie", "BTU", value),
  FoodCalorieToTherm: (value) => convertEnergy("FoodCalorie", "Therm", value),
  FoodCalorieToSmallCalorie: (value) =>
    convertEnergy("FoodCalorie", "SmallCalorie", value),
};
