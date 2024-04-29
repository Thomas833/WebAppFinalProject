import express, { Router } from "express";
import PlayerRouter from "./player.js";
import BattleRouter from "./battle.js";
import cors from "cors";
import {MongoClient} from "mongodb";


async function connect(){
    const client = new MongoClient("mongodb://localhost:27017");
	const connection = await client.connect();
	return connection.db("pokemon-database");
}
const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/player", PlayerRouter);
app.use("/battler",BattleRouter);

const database = await connect();
app.set("db", database);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});