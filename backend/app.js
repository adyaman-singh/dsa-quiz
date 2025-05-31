import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "path";
import dotenv from "dotenv";
import hbs from "hbs";
import helmet from "helmet";
import { attachedRoutes } from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./utils/logger.js";

dotenv.config();
const __dirname = path.resolve();
const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: isProduction ? process.env.ALLOWED_ORIGINS?.split(",") : "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

app.set("views", path.join(__dirname, "backend", "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "backend", "views/partials"));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 100 : 1000,
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.ip === "::1",
});

app.use(apiLimiter);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

attachedRoutes(app);

if (isProduction) {
  app.use(
    express.static(path.join(__dirname, "frontend", "dist"), {
      maxAge: "1y",
      immutable: true,
    })
  );

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use(errorHandler);

export default app;
