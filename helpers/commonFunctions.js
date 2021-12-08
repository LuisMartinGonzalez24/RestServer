
const getAndConvertToNumber = (valueToConvert, defaultValue) => {
    return isNaN(Number(valueToConvert)) ? defaultValue : Number(valueToConvert)
}

module.exports = {
    getAndConvertToNumber,
};
