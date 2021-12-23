import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_CONNECTION);
        console.log('Database connection succesfull');
    } catch (ex) {
        console.log(ex);
        throw new Error('Error to connect mongo database');
    }
}

export {
    dbConnection,
};
