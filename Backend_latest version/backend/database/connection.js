import mongoose from "mongoose";

export const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Basic",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 50000, 
            socketTimeoutMS: 45000 
        });
        console.log("Connected to database.");
    } catch (err) {
        console.log(`Some error occurred while connecting to database: ${err}`);
    }
};
