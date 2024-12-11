const LengthMeasures = {
    Meter: 1,
    Kilometer: 1000,
    Centimeter: 0.01,
    Millimeter: 0.001,
    Nanometer: 1e-9,
    Micrometer: 1e-6,
    Mile: 1609.34,
    Yard: 0.9144,
    Foot: 0.3048,
    Inch: 0.0254,
    LightYear: 9.4607e15
};

function convertLength(fromUnit, toUnit, value) {
    if (!LengthMeasures[fromUnit] || !LengthMeasures[toUnit]) {
        throw new Error(`Unsupported length unit: ${fromUnit} or ${toUnit}`);
    }
    return (value * LengthMeasures[fromUnit]) / LengthMeasures[toUnit];
}

export const length = {
    // Meter conversions
    MeterToKilometer: (value) => convertLength('Meter', 'Kilometer', value),
    MeterToCentimeter: (value) => convertLength('Meter', 'Centimeter', value),
    MeterToMillimeter: (value) => convertLength('Meter', 'Millimeter', value),
    MeterToNanometer: (value) => convertLength('Meter', 'Nanometer', value),
    MeterToMicrometer: (value) => convertLength('Meter', 'Micrometer', value),
    MeterToMile: (value) => convertLength('Meter', 'Mile', value),
    MeterToYard: (value) => convertLength('Meter', 'Yard', value),
    MeterToFoot: (value) => convertLength('Meter', 'Foot', value),
    MeterToInch: (value) => convertLength('Meter', 'Inch', value),
    MeterToLightYear: (value) => convertLength('Meter', 'LightYear', value),

    // Kilometer conversions
    KilometerToMeter: (value) => convertLength('Kilometer', 'Meter', value),
    KilometerToCentimeter: (value) => convertLength('Kilometer', 'Centimeter', value),
    KilometerToMillimeter: (value) => convertLength('Kilometer', 'Millimeter', value),
    KilometerToNanometer: (value) => convertLength('Kilometer', 'Nanometer', value),
    KilometerToMicrometer: (value) => convertLength('Kilometer', 'Micrometer', value),
    KilometerToMile: (value) => convertLength('Kilometer', 'Mile', value),
    KilometerToYard: (value) => convertLength('Kilometer', 'Yard', value),
    KilometerToFoot: (value) => convertLength('Kilometer', 'Foot', value),
    KilometerToInch: (value) => convertLength('Kilometer', 'Inch', value),
    KilometerToLightYear: (value) => convertLength('Kilometer', 'LightYear', value),

    // Centimeter conversions
    CentimeterToMeter: (value) => convertLength('Centimeter', 'Meter', value),
    CentimeterToKilometer: (value) => convertLength('Centimeter', 'Kilometer', value),
    CentimeterToMillimeter: (value) => convertLength('Centimeter', 'Millimeter', value),
    CentimeterToNanometer: (value) => convertLength('Centimeter', 'Nanometer', value),
    CentimeterToMicrometer: (value) => convertLength('Centimeter', 'Micrometer', value),
    CentimeterToMile: (value) => convertLength('Centimeter', 'Mile', value),
    CentimeterToYard: (value) => convertLength('Centimeter', 'Yard', value),
    CentimeterToFoot: (value) => convertLength('Centimeter', 'Foot', value),
    CentimeterToInch: (value) => convertLength('Centimeter', 'Inch', value),
    CentimeterToLightYear: (value) => convertLength('Centimeter', 'LightYear', value),

    // Millimeter conversions
    MillimeterToMeter: (value) => convertLength('Millimeter', 'Meter', value),
    MillimeterToKilometer: (value) => convertLength('Millimeter', 'Kilometer', value),
    MillimeterToCentimeter: (value) => convertLength('Millimeter', 'Centimeter', value),
    MillimeterToNanometer: (value) => convertLength('Millimeter', 'Nanometer', value),
    MillimeterToMicrometer: (value) => convertLength('Millimeter', 'Micrometer', value),
    MillimeterToMile: (value) => convertLength('Millimeter', 'Mile', value),
    MillimeterToYard: (value) => convertLength('Millimeter', 'Yard', value),
    MillimeterToFoot: (value) => convertLength('Millimeter', 'Foot', value),
    MillimeterToInch: (value) => convertLength('Millimeter', 'Inch', value),
    MillimeterToLightYear: (value) => convertLength('Millimeter', 'LightYear', value),

    // Nanometer conversions
    NanometerToMeter: (value) => convertLength('Nanometer', 'Meter', value),
    NanometerToKilometer: (value) => convertLength('Nanometer', 'Kilometer', value),
    NanometerToCentimeter: (value) => convertLength('Nanometer', 'Centimeter', value),
    NanometerToMillimeter: (value) => convertLength('Nanometer', 'Millimeter', value),
    NanometerToMicrometer: (value) => convertLength('Nanometer', 'Micrometer', value),
    NanometerToMile: (value) => convertLength('Nanometer', 'Mile', value),
    NanometerToYard: (value) => convertLength('Nanometer', 'Yard', value),
    NanometerToFoot: (value) => convertLength('Nanometer', 'Foot', value),
    NanometerToInch: (value) => convertLength('Nanometer', 'Inch', value),
    NanometerToLightYear: (value) => convertLength('Nanometer', 'LightYear', value),

    // Micrometer conversions
    MicrometerToMeter: (value) => convertLength('Micrometer', 'Meter', value),
    MicrometerToKilometer: (value) => convertLength('Micrometer', 'Kilometer', value),
    MicrometerToCentimeter: (value) => convertLength('Micrometer', 'Centimeter', value),
    MicrometerToMillimeter: (value) => convertLength('Micrometer', 'Millimeter', value),
    MicrometerToNanometer: (value) => convertLength('Micrometer', 'Nanometer', value),
    MicrometerToMile: (value) => convertLength('Micrometer', 'Mile', value),
    MicrometerToYard: (value) => convertLength('Micrometer', 'Yard', value),
    MicrometerToFoot: (value) => convertLength('Micrometer', 'Foot', value),
    MicrometerToInch: (value) => convertLength('Micrometer', 'Inch', value),
    MicrometerToLightYear: (value) => convertLength('Micrometer', 'LightYear', value),

    // Mile conversions
    MileToMeter: (value) => convertLength('Mile', 'Meter', value),
    MileToKilometer: (value) => convertLength('Mile', 'Kilometer', value),
    MileToCentimeter: (value) => convertLength('Mile', 'Centimeter', value),
    MileToMillimeter: (value) => convertLength('Mile', 'Millimeter', value),
    MileToNanometer: (value) => convertLength('Mile', 'Nanometer', value),
    MileToMicrometer: (value) => convertLength('Mile', 'Micrometer', value),
    MileToYard: (value) => convertLength('Mile', 'Yard', value),
    MileToFoot: (value) => convertLength('Mile', 'Foot', value),
    MileToInch: (value) => convertLength('Mile', 'Inch', value),
    MileToLightYear: (value) => convertLength('Mile', 'LightYear', value),

    // Yard conversions
    YardToMeter: (value) => convertLength('Yard', 'Meter', value),
    YardToKilometer: (value) => convertLength('Yard', 'Kilometer', value),
    YardToCentimeter: (value) => convertLength('Yard', 'Centimeter', value),
    YardToMillimeter: (value) => convertLength('Yard', 'Millimeter', value),
    YardToNanometer: (value) => convertLength('Yard', 'Nanometer', value),
    YardToMicrometer: (value) => convertLength('Yard', 'Micrometer', value),
    YardToMile: (value) => convertLength('Yard', 'Mile', value),
    YardToFoot: (value) => convertLength('Yard', 'Foot', value),
    YardToInch: (value) => convertLength('Yard', 'Inch', value),
    YardToLightYear: (value) => convertLength('Yard', 'LightYear', value),

    // Foot conversions
    FootToMeter: (value) => convertLength('Foot', 'Meter', value),
    FootToKilometer: (value) => convertLength('Foot', 'Kilometer', value),
    FootToCentimeter: (value) => convertLength('Foot', 'Centimeter', value),
    FootToMillimeter: (value) => convertLength('Foot', 'Millimeter', value),
    FootToNanometer: (value) => convertLength('Foot', 'Nanometer', value),
    FootToMicrometer: (value) => convertLength('Foot', 'Micrometer', value),
    FootToMile: (value) => convertLength('Foot', 'Mile', value),
    FootToYard: (value) => convertLength('Foot', 'Yard', value),
    FootToInch: (value) => convertLength('Foot', 'Inch', value),
    FootToLightYear: (value) => convertLength('Foot', 'LightYear', value),

    // Inch conversions
    InchToMeter: (value) => convertLength('Inch', 'Meter', value),
    InchToKilometer: (value) => convertLength('Inch', 'Kilometer', value),
    InchToCentimeter: (value) => convertLength('Inch', 'Centimeter', value),
    InchToMillimeter: (value) => convertLength('Inch', 'Millimeter', value),
    InchToNanometer: (value) => convertLength('Inch', 'Nanometer', value),
    InchToMicrometer: (value) => convertLength('Inch', 'Micrometer', value),
    InchToMile: (value) => convertLength('Inch', 'Mile', value),
    InchToYard: (value) => convertLength('Inch', 'Yard', value),
    InchToFoot: (value) => convertLength('Inch', 'Foot', value),
    InchToLightYear: (value) => convertLength('Inch', 'LightYear', value),

    // LightYear conversions
    LightYearToMeter: (value) => convertLength('LightYear', 'Meter', value),
    LightYearToKilometer: (value) => convertLength('LightYear', 'Kilometer', value),
    LightYearToCentimeter: (value) => convertLength('LightYear', 'Centimeter', value),
    LightYearToMillimeter: (value) => convertLength('LightYear', 'Millimeter', value),
    LightYearToNanometer: (value) => convertLength('LightYear', 'Nanometer', value),
    LightYearToMicrometer: (value) => convertLength('LightYear', 'Micrometer', value),
    LightYearToMile: (value) => convertLength('LightYear', 'Mile', value),
    LightYearToYard: (value) => convertLength('LightYear', 'Yard', value),
    LightYearToFoot: (value) => convertLength('LightYear', 'Foot', value),
    LightYearToInch: (value) => convertLength('LightYear', 'Inch', value),
};
