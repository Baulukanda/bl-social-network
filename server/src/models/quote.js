import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: String,
  likes: Number,
  comments: [String]
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
