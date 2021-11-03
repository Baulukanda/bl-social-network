import mongoose from "mongoose";
import Quote from "./models/quote.js";

export async function connectDatabase() {
  const connectionString = process.env.MONGODB_URL;

  if (!connectionString) {
    throw new Error(
      "MONGODB_URL not set as environment variable. Please configure it in an .env file."
    );
  }

  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function seedDatabase() {
  const quoteCount = await Quote.countDocuments();

  if (quoteCount === 0) {
    const defaultQuotes = [
      {
        title: "this is a test quoute 1",
        author: "Peter"
      },
      {
        title: "this is a test quoute 2",
        author: "Bau"
      },
      {
        title: "this is a test quoute 3",
        author: "John"
      }
    ]
    console.log("seeding database with %d quotes", defaultQuotes.length);
    await Quote.insertMany(defaultQuotes);
  } else {
    console.log("database already has content, not seeding")
  }
}

