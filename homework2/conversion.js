function convertMilesToKm(miles) {
    return miles * 1.6;
}

function convertCelsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function convertPoundsToKilogram(pounds) {
    return pounds * 0.45;
}

function convertFeetToMetres(feet) {
    return feet * 0.3;
}

// Exporting all functions
module.exports = {
    convertMilesToKm,
    convertCelsiusToFahrenheit,
    convertPoundsToKilogram,
    convertFeetToMetres
};
