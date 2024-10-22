import mongoose from "mongoose";

export const marketDataSchema = new mongoose.Schema({
  klines: { type: Number, required: true },
  openPrice: { type: String, required: true },
  highPrice: { type: String, required: true },
  lowPrice: { type: String, required: true },
  closePrice: { type: String, required: true },
  volume: { type: String, required: true },
  klineCloseTime: { type: Number, required: true },
  quoteAssetVolume: { type: String, required: true },
  numberOfTrades: { type: Number, required: true },
  takerBuyBaseAssetVolume: { type: String, required: true },
  takerBuyQuoteAssetVolume: { type: String, required: true },
});

export const MarketData = mongoose.model("MarketData", marketDataSchema);
