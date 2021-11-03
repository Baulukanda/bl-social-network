import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
