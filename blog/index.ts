import express from "express";

const app: express.Application = express();

const port: number = 4000;

app.get("/", (_req, _res) => {
  _res.send("TypeScript With Express");
});

app.listen(port, () => {
  console.log(`TypeScript with Expresst:${port}/`);
});
