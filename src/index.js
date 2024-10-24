import express from "express";
import mongoose from "mongoose";
import { errorHandler } from "./errorHandler.js";
import { registerTradesRoutes } from "./controllers/trades.controller.js";

const main = async () => {
  const app = express();

  try {
    await mongoose.connect("mongodb://db:27017/trading_analysis");

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }

  app.use(express.json());

  registerTradesRoutes(app);

  errorHandler(app);

  return app;
};

main()
  .then((app) => {
    app.listen(3000, () => {
      console.log(`Example app listening on port ${3000}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the application:", error);
  });
