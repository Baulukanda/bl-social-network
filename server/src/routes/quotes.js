import express from "express";
import Quote from "../models/quote.js";

const quoteRoutes = express.Router();

//Quotes
quoteRoutes.get("/", async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
});

quoteRoutes.post("/", async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201);
    res.json(quote);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Quote could not be created",
      details: error.toString(),
    });
  }
});

quoteRoutes.get("/:id", async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (quote) {
      res.json(quote);
    } else {
      res.status(404);
      res.json({ error: "Quote not found" });
    }
  } catch (error) {
    res.status(500);
    res.json({ error: "Something went wrong", details: error.toString() });
  }
});

// likes
quoteRoutes.put("/:id/like", async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id, { $inc: { likes: 1, "metrics.orders": 1 } }, { returnDocument: `after` });
    res.json(quote)
  } catch (error) {
    res.status(500);
    res.json({ error: "like could not be added" });
  }
});

// Comments
quoteRoutes.post("/:id/comments", async (req, res) => {
  try {
    const comment = await req.body.comments;
    const quote = await Quote.findByIdAndUpdate(req.params.id, { $push: { rcomments: comment } }, { returnDocument: `after` });
    res.json(quote)
  } catch (error) {
    res.status(500);
    res.json({ error: "Comment could not be added", details: error.toString() });
  }
});


export default quoteRoutes;
