import jwt from 'jsonwebtoken';

const getAndConvertToNumber = (valueToConvert: any, defaultValue: number): number => {
    return isNaN(Number(valueToConvert)) ? defaultValue : Number(valueToConvert)
};

const generateJwt = (uid: string) => {
    return new Promise<string | undefined>((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.ENCRYPTION_ALGORITHM_JWT || 'T3stAlg0r1thm', { expiresIn: '4h' },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('Error generating JWT');
                } else {
                    resolve(token);
                }
            }
        );
    })
};

export {
    getAndConvertToNumber,
    generateJwt
};