const VolumeMeasures = {
    CubicMeter: 1,
    Liter: 0.001,
    Milliliter: 1e-6,
    CubicCentimeter: 1e-6,
    CubicInch: 0.0000163871,
    CubicFoot: 0.0283168,
    Gallon: 0.00378541,
};

function convertVolume(fromUnit, toUnit, value) {
    if (!VolumeMeasures[fromUnit] || !VolumeMeasures[toUnit]) {
        throw new Error(`Unsupported volume unit: ${fromUnit} or ${toUnit}`);
    }
    return (value * VolumeMeasures[fromUnit]) / VolumeMeasures[toUnit];
}

export const volume = {
    CubicMeterToLiter: (value) => convertVolume('CubicMeter', 'Liter', value),
    CubicMeterToMilliliter: (value) => convertVolume('CubicMeter', 'Milliliter', value),
    CubicMeterToCubicCentimeter: (value) => convertVolume('CubicMeter', 'CubicCentimeter', value),
    CubicMeterToCubicInch: (value) => convertVolume('CubicMeter', 'CubicInch', value),
    CubicMeterToCubicFoot: (value) => convertVolume('CubicMeter', 'CubicFoot', value),
    CubicMeterToGallon: (value) => convertVolume('CubicMeter', 'Gallon', value),

    LiterToCubicMeter: (value) => convertVolume('Liter', 'CubicMeter', value),
    LiterToMilliliter: (value) => convertVolume('Liter', 'Milliliter', value),
    LiterToCubicCentimeter: (value) => convertVolume('Liter', 'CubicCentimeter', value),
    LiterToCubicInch: (value) => convertVolume('Liter', 'CubicInch', value),
    LiterToCubicFoot: (value) => convertVolume('Liter', 'CubicFoot', value),
    LiterToGallon: (value) => convertVolume('Liter', 'Gallon', value),

    MilliliterToCubicMeter: (value) => convertVolume('Milliliter', 'CubicMeter', value),
    MilliliterToLiter: (value) => convertVolume('Milliliter', 'Liter', value),
    MilliliterToCubicCentimeter: (value) => convertVolume('Milliliter', 'CubicCentimeter', value),
    MilliliterToCubicInch: (value) => convertVolume('Milliliter', 'CubicInch', value),
    MilliliterToCubicFoot: (value) => convertVolume('Milliliter', 'CubicFoot', value),
    MilliliterToGallon: (value) => convertVolume('Milliliter', 'Gallon', value),

    CubicCentimeterToCubicMeter: (value) => convertVolume('CubicCentimeter', 'CubicMeter', value),
    CubicCentimeterToLiter: (value) => convertVolume('CubicCentimeter', 'Liter', value),
    CubicCentimeterToMilliliter: (value) => convertVolume('CubicCentimeter', 'Milliliter', value),
    CubicCentimeterToCubicInch: (value) => convertVolume('CubicCentimeter', 'CubicInch', value),
    CubicCentimeterToCubicFoot: (value) => convertVolume('CubicCentimeter', 'CubicFoot', value),
    CubicCentimeterToGallon: (value) => convertVolume('CubicCentimeter', 'Gallon', value),

    CubicInchToCubicMeter: (value) => convertVolume('CubicInch', 'CubicMeter', value),
    CubicInchToLiter: (value) => convertVolume('CubicInch', 'Liter', value),
    CubicInchToMilliliter: (value) => convertVolume('CubicInch', 'Milliliter', value),
    CubicInchToCubicCentimeter: (value) => convertVolume('CubicInch', 'CubicCentimeter', value),
    CubicInchToCubicFoot: (value) => convertVolume('CubicInch', 'CubicFoot', value),
    CubicInchToGallon: (value) => convertVolume('CubicInch', 'Gallon', value),

    CubicFootToCubicMeter: (value) => convertVolume('CubicFoot', 'CubicMeter', value),
    CubicFootToLiter: (value) => convertVolume('CubicFoot', 'Liter', value),
    CubicFootToMilliliter: (value) => convertVolume('CubicFoot', 'Milliliter', value),
    CubicFootToCubicCentimeter: (value) => convertVolume('CubicFoot', 'CubicCentimeter', value),
    CubicFootToCubicInch: (value) => convertVolume('CubicFoot', 'CubicInch', value),
    CubicFootToGallon: (value) => convertVolume('CubicFoot', 'Gallon', value),

    GallonToCubicMeter: (value) => convertVolume('Gallon', 'CubicMeter', value),
    GallonToLiter: (value) => convertVolume('Gallon', 'Liter', value),
    GallonToMilliliter: (value) => convertVolume('Gallon', 'Milliliter', value),
    GallonToCubicCentimeter: (value) => convertVolume('Gallon', 'CubicCentimeter', value),
    GallonToCubicInch: (value) => convertVolume('Gallon', 'CubicInch', value),
    GallonToCubicFoot: (value) => convertVolume('Gallon', 'CubicFoot', value),
};
