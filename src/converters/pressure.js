const PressureMeasures = {
  Pascal: 1,
  Kilopascal: 1000,
  Bar: 100000,
  Atmosphere: 101325,
  PSI: 6894.76,
};

function convertPressure(fromUnit, toUnit, value) {
  if (!PressureMeasures[fromUnit] || !PressureMeasures[toUnit]) {
    throw new Error(`Unsupported pressure unit: ${fromUnit} or ${toUnit}`);
  }
  return (value * PressureMeasures[fromUnit]) / PressureMeasures[toUnit];
}

export const pressure = {
  // Pascal conversions
  PascalToKilopascal: (value) => convertPressure("Pascal", "Kilopascal", value),
  PascalToBar: (value) => convertPressure("Pascal", "Bar", value),
  PascalToAtmosphere: (value) => convertPressure("Pascal", "Atmosphere", value),
  PascalToPSI: (value) => convertPressure("Pascal", "PSI", value),

  // Kilopascal conversions
  KilopascalToPascal: (value) => convertPressure("Kilopascal", "Pascal", value),
  KilopascalToBar: (value) => convertPressure("Kilopascal", "Bar", value),
  KilopascalToAtmosphere: (value) =>
    convertPressure("Kilopascal", "Atmosphere", value),
  KilopascalToPSI: (value) => convertPressure("Kilopascal", "PSI", value),

  // Bar conversions
  BarToPascal: (value) => convertPressure("Bar", "Pascal", value),
  BarToKilopascal: (value) => convertPressure("Bar", "Kilopascal", value),
  BarToAtmosphere: (value) => convertPressure("Bar", "Atmosphere", value),
  BarToPSI: (value) => convertPressure("Bar", "PSI", value),

  // Atmosphere conversions
  AtmosphereToPascal: (value) => convertPressure("Atmosphere", "Pascal", value),
  AtmosphereToKilopascal: (value) =>
    convertPressure("Atmosphere", "Kilopascal", value),
  AtmosphereToBar: (value) => convertPressure("Atmosphere", "Bar", value),
  AtmosphereToPSI: (value) => convertPressure("Atmosphere", "PSI", value),

  // PSI conversions
  PSIToPascal: (value) => convertPressure("PSI", "Pascal", value),
  PSIToKilopascal: (value) => convertPressure("PSI", "Kilopascal", value),
  PSIToBar: (value) => convertPressure("PSI", "Bar", value),
  PSIToAtmosphere: (value) => convertPressure("PSI", "Atmosphere", value),
};
