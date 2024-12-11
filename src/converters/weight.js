export const WeightMeasures = {
  Kilogram: 1,
  Gram: 1000,
  Milligram: 1e3,
  Pound: 2.20462,
  Ounce: 35.274,
  UsTon: 0.000984207,
  Tonne: 0.001,
};

export function convertWeight(fromUnit, toUnit, value) {
  if (!WeightMeasures[fromUnit] || !WeightMeasures[toUnit]) {
    throw new Error(`Unsupported weight unit: ${fromUnit} or ${toUnit}`);
  }
  return (value * WeightMeasures[fromUnit]) / WeightMeasures[toUnit];
}

export const weight = {
  KilogramToGram: (value) => convertWeight("Kilogram", "Gram", value),
  KilogramToMilligram: (value) => convertWeight("Kilogram", "Milligram", value),
  KilogramToPound: (value) => convertWeight("Kilogram", "Pound", value),
  KilogramToOunce: (value) => convertWeight("Kilogram", "Ounce", value),
  KilogramToUsTon: (value) => convertWeight("Kilogram", "UsTon", value),
  KilogramToTonne: (value) => convertWeight("Kilogram", "Tonne", value),
  GramToKilogram: (value) => convertWeight("Gram", "Kilogram", value),
  GramToMilligram: (value) => convertWeight("Gram", "Milligram", value),
  GramToPound: (value) => convertWeight("Gram", "Pound", value),
  GramToOunce: (value) => convertWeight("Gram", "Ounce", value),
  GramToUsTon: (value) => convertWeight("Gram", "UsTon", value),
  GramToTonne: (value) => convertWeight("Gram", "Tonne", value),
  MilligramToKilogram: (value) => convertWeight("Milligram", "Kilogram", value),
  MilligramToGram: (value) => convertWeight("Milligram", "Gram", value),
  MilligramToPound: (value) => convertWeight("Milligram", "Pound", value),
  MilligramToOunce: (value) => convertWeight("Milligram", "Ounce", value),
  MilligramToUsTon: (value) => convertWeight("Milligram", "UsTon", value),
  MilligramToTonne: (value) => convertWeight("Milligram", "Tonne", value),
  PoundToKilogram: (value) => convertWeight("Pound", "Kilogram", value),
  PoundToGram: (value) => convertWeight("Pound", "Gram", value),
  PoundToMilligram: (value) => convertWeight("Pound", "Milligram", value),
  PoundToOunce: (value) => convertWeight("Pound", "Ounce", value),
  PoundToUsTon: (value) => convertWeight("Pound", "UsTon", value),
  PoundToTonne: (value) => convertWeight("Pound", "Tonne", value),
  OunceToKilogram: (value) => convertWeight("Ounce", "Kilogram", value),
  OunceToGram: (value) => convertWeight("Ounce", "Gram", value),
  OunceToMilligram: (value) => convertWeight("Ounce", "Milligram", value),
  OunceToPound: (value) => convertWeight("Ounce", "Pound", value),
  OunceToUsTon: (value) => convertWeight("Ounce", "UsTon", value),
  OunceToTonne: (value) => convertWeight("Ounce", "Tonne", value),
  UsTonToKilogram: (value) => convertWeight("UsTon", "Kilogram", value),
  UsTonToGram: (value) => convertWeight("UsTon", "Gram", value),
  UsTonToMilligram: (value) => convertWeight("UsTon", "Milligram", value),
  UsTonToPound: (value) => convertWeight("UsTon", "Pound", value),
  UsTonToOunce: (value) => convertWeight("UsTon", "Ounce", value),
  UsTonToTonne: (value) => convertWeight("UsTon", "Tonne", value),
  TonneToKilogram: (value) => convertWeight("Tonne", "Kilogram", value),
  TonneToGram: (value) => convertWeight("Tonne", "Gram", value),
  TonneToMilligram: (value) => convertWeight("Tonne", "Milligram", value),
  TonneToPound: (value) => convertWeight("Tonne", "Pound", value),
  TonneToOunce: (value) => convertWeight("Tonne", "Ounce", value),
  TonneToUsTon: (value) => convertWeight("Tonne", "UsTon", value),
};
