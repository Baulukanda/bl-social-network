import mongoose from "mongoose";
//import quoteRoutes from "../routes/quotes";

const quoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String
});

const Quote = mongoose.model("Quote", quoteSchema);

//quoteRoutes.get()

//quoteRoutes.post()

export default Quote;
