import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import routes from "./routes";
import { createMockModel } from "./mock";
import models, { connectDb } from "./models";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin(req.query.token || "Unauthorized")
  };
  next();
});

app.use("/users", routes.users);

connectDb().then(async () => {
  if (process.env.ERASE_DB_ON_SYNC_FOR) {
    await Promise.all(
      process.env.ERASE_DB_ON_SYNC_FOR.split(",").map(model =>
        models[model].deleteMany({})
      )
    );
  }

  if (process.env.SEED_DB_WITH) {
    process.env.SEED_DB_WITH.split(",").map(model => createMockModel(model));
  }
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Example app listening on port ${process.env.PORT}...`)
  );
});
