"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndConvertToNumber = void 0;
const getAndConvertToNumber = (valueToConvert, defaultValue) => {
    return isNaN(Number(valueToConvert)) ? defaultValue : Number(valueToConvert);
};
exports.getAndConvertToNumber = getAndConvertToNumber;
//# sourceMappingURL=commonFunctions.js.map