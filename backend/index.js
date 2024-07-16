import express from "express";
import { PORT, MONGO_DB_URL } from "./config.js";
import mongoose from "mongoose";
import { Book_Database } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();
app.use(express.json()); //act as a middleware where it parses and checks if the req  has json data and if it does, then convert it into javascript object

//middleware for cors
//allowinf from all origin
app.use(cors());

app.use("/books", bookRoute);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To My First MERN Project");
});

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
