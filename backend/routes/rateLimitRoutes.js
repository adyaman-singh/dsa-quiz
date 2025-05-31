import express from "express";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
import Validator from "../validator/rateLimiter.validator.js";
import Executor from "../helper/routeExecutor.js";
import Handler from "../handler/rate.handler.js";

const RateLimitRouter = express.Router();

// method to calculate amount of request raised

RateLimitRouter.post(
  "/check",
  Validator.checkDailyFrequencySchemaValidator,
  Executor(Handler.rateCheckHandler)
);
RateLimitRouter.post("/check-rate-limit", async (req, res) => {});

// Submit Answer and Get AI Response
RateLimitRouter.post("/submit-answer", async (req, res) => {
  const { answer, question } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that reviews code approaches. Provide a short evaluation of the approach and suggest a better one. Avoid writing code and keep the response minimal in length.",
        },
        {
          role: "user",
          content: `The user's approach to the question is: ${answer}. Question: ${JSON.stringify(
            question
          )}`,
        },
      ],
      max_tokens: 100,
      temperature: 0.5,
    });

    return res.json({
      success: true,
      aiResponse: completion.choices[0].message,
    });
  } catch (error) {
    console.log("Error processing answer:", error);
    res.status(500).send("Internal server error");
  }
});

export default RateLimitRouter;
