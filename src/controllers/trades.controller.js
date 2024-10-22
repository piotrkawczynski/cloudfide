import expressAsyncHandler from "express-async-handler";
import { assert, object, optional, string } from "superstruct";
import { Decimal } from "decimal.js";

const Query = object({
  symbol: string(),
  startTime: optional(string()),
  endTime: optional(string()),
});

const getTrades = expressAsyncHandler(async (req, res, _next) => {
  assert(req.query, Query);

  const { symbol, startTime, endTime } = req.query;

  const searchParameters = new URLSearchParams({
    symbol,
    interval: "1d",
    startTime,
    endTime,
  });

  const response = await fetch(
    `https://api.binance.com/api/v3/klines?${searchParameters.toString()}`
  );
  const data = await response.json();

  const firstPeriodResult = mapKline(data[0]);
  console.log("firstPeriodResult:", firstPeriodResult);
  const lastPeriodResult = mapKline(data[data.length - 1]);
  console.log("lastPeriodResult:", lastPeriodResult);

  res.status(200).send(calculateDiff(firstPeriodResult, lastPeriodResult));
});

const mapKline = (data) => {
  const [
    klines,
    openPrice,
    highPrice,
    lowPrice,
    closePrice,
    volume,
    klineCloseTime,
    quoteAssetVolume,
    numberOfTrades,
    takerBuyBaseAssetVolume,
    takerBuyQuoteAssetVolume,
  ] = data;

  return {
    klines,
    openPrice,
    highPrice,
    lowPrice,
    closePrice,
    volume,
    klineCloseTime,
    quoteAssetVolume,
    numberOfTrades,
    takerBuyBaseAssetVolume,
    takerBuyQuoteAssetVolume,
  };
};

const calculateDiff = (firstResult, secondResult) => {
  return {
    startPeriodOpenPrice: firstResult.openPrice,
    openPriceAmplitude: secondResult.openPrice - firstResult.openPrice,
    highPriceAmplitude: secondResult.highPrice - firstResult.highPrice,
    lowPriceAmplitude: secondResult.lowPrice - firstResult.lowPrice,
    closePriceAmplitude: secondResult.closePrice - firstResult.closePrice,
  };
};

export const registerTradesRoutes = (app) => {
  app.get("/trades", getTrades);
};
