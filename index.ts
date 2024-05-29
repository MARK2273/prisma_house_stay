import express, { Application, Router, urlencoded } from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import bodyParser from "body-parser";
import route from "./routes/routes";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", route);

app.listen(process.env.PORT, () => {
  console.log("server is running on " + process.env.PORT);
});
