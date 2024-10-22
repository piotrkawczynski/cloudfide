import { StructError } from "superstruct";

const errorHandler = (app) => {
  app.use((err, _req, res, _next) => {
    if (err instanceof StructError) {
      const validationErrorMessage = err
        .failures()
        .map(({ path, message }) => ({
          property: path.join("."),
          message,
        }));

      return res.status(400).send(validationErrorMessage);
    }

    res.status(500).send("Something went wrong");
  });
};

export { errorHandler };
