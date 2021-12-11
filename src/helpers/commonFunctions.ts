
const getAndConvertToNumber = (valueToConvert: any, defaultValue: number): number => {
    return isNaN(Number(valueToConvert)) ? defaultValue : Number(valueToConvert)
}

export {
    getAndConvertToNumber,
};
