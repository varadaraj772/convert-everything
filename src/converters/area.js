const AreaMeasures = {
    SquareMeter: 1,
    SquareKilometer: 1e6,
    SquareCentimeter: 1e-4,
    Acre: 4046.86,
    Hectare: 10000,
    SquareMile: 2.59e6,
    SquareYard: 0.836127,
    SquareFoot: 0.092903,
    SquareInch: 0.00064516
};

 function convertArea(fromUnit, toUnit, value) {
    if (!AreaMeasures[fromUnit] || !AreaMeasures[toUnit]) {
        throw new Error(`Unsupported area unit: ${fromUnit} or ${toUnit}`);
    }
    return (value * AreaMeasures[fromUnit]) / AreaMeasures[toUnit];
}

export const area = {
    // SquareMeter conversions
    SquareMeterToSquareKilometer: (value) => convertArea('SquareMeter', 'SquareKilometer', value),
    SquareMeterToSquareCentimeter: (value) => convertArea('SquareMeter', 'SquareCentimeter', value),
    SquareMeterToAcre: (value) => convertArea('SquareMeter', 'Acre', value),
    SquareMeterToHectare: (value) => convertArea('SquareMeter', 'Hectare', value),
    SquareMeterToSquareMile: (value) => convertArea('SquareMeter', 'SquareMile', value),
    SquareMeterToSquareYard: (value) => convertArea('SquareMeter', 'SquareYard', value),
    SquareMeterToSquareFoot: (value) => convertArea('SquareMeter', 'SquareFoot', value),
    SquareMeterToSquareInch: (value) => convertArea('SquareMeter', 'SquareInch', value),

    // SquareKilometer conversions
    SquareKilometerToSquareMeter: (value) => convertArea('SquareKilometer', 'SquareMeter', value),
    SquareKilometerToSquareCentimeter: (value) => convertArea('SquareKilometer', 'SquareCentimeter', value),
    SquareKilometerToAcre: (value) => convertArea('SquareKilometer', 'Acre', value),
    SquareKilometerToHectare: (value) => convertArea('SquareKilometer', 'Hectare', value),
    SquareKilometerToSquareMile: (value) => convertArea('SquareKilometer', 'SquareMile', value),
    SquareKilometerToSquareYard: (value) => convertArea('SquareKilometer', 'SquareYard', value),
    SquareKilometerToSquareFoot: (value) => convertArea('SquareKilometer', 'SquareFoot', value),
    SquareKilometerToSquareInch: (value) => convertArea('SquareKilometer', 'SquareInch', value),

    // SquareCentimeter conversions
    SquareCentimeterToSquareMeter: (value) => convertArea('SquareCentimeter', 'SquareMeter', value),
    SquareCentimeterToSquareKilometer: (value) => convertArea('SquareCentimeter', 'SquareKilometer', value),
    SquareCentimeterToAcre: (value) => convertArea('SquareCentimeter', 'Acre', value),
    SquareCentimeterToHectare: (value) => convertArea('SquareCentimeter', 'Hectare', value),
    SquareCentimeterToSquareMile: (value) => convertArea('SquareCentimeter', 'SquareMile', value),
    SquareCentimeterToSquareYard: (value) => convertArea('SquareCentimeter', 'SquareYard', value),
    SquareCentimeterToSquareFoot: (value) => convertArea('SquareCentimeter', 'SquareFoot', value),
    SquareCentimeterToSquareInch: (value) => convertArea('SquareCentimeter', 'SquareInch', value),

    // Acre conversions
    AcreToSquareMeter: (value) => convertArea('Acre', 'SquareMeter', value),
    AcreToSquareKilometer: (value) => convertArea('Acre', 'SquareKilometer', value),
    AcreToSquareCentimeter: (value) => convertArea('Acre', 'SquareCentimeter', value),
    AcreToHectare: (value) => convertArea('Acre', 'Hectare', value),
    AcreToSquareMile: (value) => convertArea('Acre', 'SquareMile', value),
    AcreToSquareYard: (value) => convertArea('Acre', 'SquareYard', value),
    AcreToSquareFoot: (value) => convertArea('Acre', 'SquareFoot', value),
    AcreToSquareInch: (value) => convertArea('Acre', 'SquareInch', value),

    // Hectare conversions
    HectareToSquareMeter: (value) => convertArea('Hectare', 'SquareMeter', value),
    HectareToSquareKilometer: (value) => convertArea('Hectare', 'SquareKilometer', value),
    HectareToSquareCentimeter: (value) => convertArea('Hectare', 'SquareCentimeter', value),
    HectareToAcre: (value) => convertArea('Hectare', 'Acre', value),
    HectareToSquareMile: (value) => convertArea('Hectare', 'SquareMile', value),
    HectareToSquareYard: (value) => convertArea('Hectare', 'SquareYard', value),
    HectareToSquareFoot: (value) => convertArea('Hectare', 'SquareFoot', value),
    HectareToSquareInch: (value) => convertArea('Hectare', 'SquareInch', value),

    // SquareMile conversions
    SquareMileToSquareMeter: (value) => convertArea('SquareMile', 'SquareMeter', value),
    SquareMileToSquareKilometer: (value) => convertArea('SquareMile', 'SquareKilometer', value),
    SquareMileToSquareCentimeter: (value) => convertArea('SquareMile', 'SquareCentimeter', value),
    SquareMileToAcre: (value) => convertArea('SquareMile', 'Acre', value),
    SquareMileToHectare: (value) => convertArea('SquareMile', 'Hectare', value),
    SquareMileToSquareYard: (value) => convertArea('SquareMile', 'SquareYard', value),
    SquareMileToSquareFoot: (value) => convertArea('SquareMile', 'SquareFoot', value),
    SquareMileToSquareInch: (value) => convertArea('SquareMile', 'SquareInch', value),

    // SquareYard conversions
    SquareYardToSquareMeter: (value) => convertArea('SquareYard', 'SquareMeter', value),
    SquareYardToSquareKilometer: (value) => convertArea('SquareYard', 'SquareKilometer', value),
    SquareYardToSquareCentimeter: (value) => convertArea('SquareYard', 'SquareCentimeter', value),
    SquareYardToAcre: (value) => convertArea('SquareYard', 'Acre', value),
    SquareYardToHectare: (value) => convertArea('SquareYard', 'Hectare', value),
    SquareYardToSquareMile: (value) => convertArea('SquareYard', 'SquareMile', value),
    SquareYardToSquareFoot: (value) => convertArea('SquareYard', 'SquareFoot', value),
    SquareYardToSquareInch: (value) => convertArea('SquareYard', 'SquareInch', value),

    // SquareFoot conversions
    SquareFootToSquareMeter: (value) => convertArea('SquareFoot', 'SquareMeter', value),
    SquareFootToSquareKilometer: (value) => convertArea('SquareFoot', 'SquareKilometer', value),
    SquareFootToSquareCentimeter: (value) => convertArea('SquareFoot', 'SquareCentimeter', value),
    SquareFootToAcre: (value) => convertArea('SquareFoot', 'Acre', value),
    SquareFootToHectare: (value) => convertArea('SquareFoot', 'Hectare', value),
    SquareFootToSquareMile: (value) => convertArea('SquareFoot', 'SquareMile', value),
    SquareFootToSquareYard: (value) => convertArea('SquareFoot', 'SquareYard', value),
    SquareFootToSquareInch: (value) => convertArea('SquareFoot', 'SquareInch', value),

    // SquareInch conversions
    SquareInchToSquareMeter: (value) => convertArea('SquareInch', 'SquareMeter', value),
    SquareInchToSquareKilometer: (value) => convertArea('SquareInch', 'SquareKilometer', value),
    SquareInchToSquareCentimeter: (value) => convertArea('SquareInch', 'SquareCentimeter', value),
    SquareInchToAcre: (value) => convertArea('SquareInch', 'Acre', value),
    SquareInchToHectare: (value) => convertArea('SquareInch', 'Hectare', value),
    SquareInchToSquareMile: (value) => convertArea('SquareInch', 'SquareMile', value),
    SquareInchToSquareYard: (value) => convertArea('SquareInch', 'SquareYard', value),
    SquareInchToSquareFoot: (value) => convertArea('SquareInch', 'SquareFoot', value),
};
