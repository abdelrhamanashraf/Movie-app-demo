import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB
const dbUser = process.env.DBUSER
const dbPassword = process.env.DBPASSWD
const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbName}.avior.mongodb.net/?retryWrites=true&w=majority&appName=testing`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
