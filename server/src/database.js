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
        text: "I may not be special, but I’m definitely limited edition!",
        author: "Peter",
        likes: 5,
        comments: []
      },
      {
        text: "I'm just here to talk to myself and hope people are listening",
        author: "Bau",
        likes: 19,
        comments: []
      },
      {
        text: "I learn from the mistakes of people who took my advice",
        author: "John",
        likes: 90,
        comments: []
      }
    ]
    console.log("seeding database with %d quotes", defaultQuotes.length);
    await Quote.insertMany(defaultQuotes);
  } else {
    console.log("database already has content, not seeding")
  }
}

