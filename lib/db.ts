// lib/db.ts
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

let dbConnection: boolean = false;



if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
  }
const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async (connect: boolean) => {
    if (connect && !dbConnection) {
      
        try {
            await mongoose.connect(MONGODB_URI!, {
               dbName: "next14restapi",
                bufferCommands: true,
            });
            dbConnection = true;
            console.log("Connected to MongoDB");
            return;
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    } else if (!connect && dbConnection) {
        await mongoose.connection.close();
        dbConnection = false;
        console.log("Disconnected from MongoDB");
        return;
    }else {
        console.log(`established DB connection state: ${dbConnection}`);
        return;
    }
}

export {connectToDatabase,};