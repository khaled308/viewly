import express from "express";
import cors from "cors";
import { CLIENT_URL, PORT } from "./config/constants.js";
import { errorHandler, notFound } from "./middlewares/error-handler.js";

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use(express.json());

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
