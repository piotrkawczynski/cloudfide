import expressAsyncHandler from "express-async-handler";
import { assert, object, optional, string } from "superstruct";

const Query = object({
  symbol: string(),
  periodFrom: optional(string()),
  periodTo: optional(string()),
});

const getTrades = expressAsyncHandler(async (req, res, _next) => {
  assert(req.query, Query);

  const response = await fetch();
  const data = await response.json();

  res.status(200).send();
});

export const registerTradesRoutes = (app) => {
  app.get("/trades", getTrades);
};
