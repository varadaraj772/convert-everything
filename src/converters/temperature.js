function convertTemperature(fromUnit, toUnit, value) {
    if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
        return (value * 9/5) + 32;
    } else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
        return (value - 32) * 5/9;
    } else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
        return value + 273.15;
    } else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
        return value - 273.15;
    } else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
        return ((value - 32) * 5/9) + 273.15;
    } else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
        return ((value - 273.15) * 9/5) + 32;
    } else {
        throw new Error(`Unsupported temperature conversion: ${fromUnit} to ${toUnit}`);
    }
}

export const temperature = {
    CelsiusToFahrenheit: (value) => convertTemperature('Celsius', 'Fahrenheit', value),
    CelsiusToKelvin: (value) => convertTemperature('Celsius', 'Kelvin', value),
    FahrenheitToCelsius: (value) => convertTemperature('Fahrenheit', 'Celsius', value),
    FahrenheitToKelvin: (value) => convertTemperature('Fahrenheit', 'Kelvin', value),
    KelvinToCelsius: (value) => convertTemperature('Kelvin', 'Celsius', value),
    KelvinToFahrenheit: (value) => convertTemperature('Kelvin', 'Fahrenheit', value),
};
