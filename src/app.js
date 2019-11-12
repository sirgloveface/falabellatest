import express from "express";

import { health, beer } from "./routes";

const app = express();
app.use(express.json());


// Log each request to the console
app.use(async (req, res, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${req.method} ${req.url} - ${ms}`);
});

// Cors
app.use(async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Log percolated errors to the console
app.on("error", err => {
  console.error("Server Error", err);
});
// Routes Path
app.use("/health", health);
app.use("/beers", beer);

export default app;
