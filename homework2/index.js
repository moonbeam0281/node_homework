const {
    convertMilesToKm,
    convertCelsiusToFahrenheit,
    convertPoundsToKilogram,
    convertFeetToMetres
} = require('./conversion');

console.log("Conversions:");

console.log("10 miles =", convertMilesToKm(10).toFixed(2), "km");

console.log("25°C =", convertCelsiusToFahrenheit(25).toFixed(2), "°F");

console.log("150 lbs =", convertPoundsToKilogram(150).toFixed(2), "kg");

console.log("6 ft =", convertFeetToMetres(6).toFixed(2), "m");
