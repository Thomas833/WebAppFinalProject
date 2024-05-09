
import { Router } from "express";
import { ObjectId } from "mongodb";
import * as fs from "node:fs/promises";

const BASE_URL = 'http://localhost:3001';
const BackendRouter = Router();


// IMAGE SECTION


// PLAYER POKEMON SECTION
BackendRouter.get("/showPokemonList", async (req,res) =>{
	const db = req.app.get("db");
	const pokemon = await db.collection("player").find().toArray();
	return res.json(pokemon);
});

BackendRouter.get("/showPokemonList/:pokemonId", async (req,res) =>{
	const db = req.app.get("db");
	const pokemon = await db.collection("player").findOne({ _id: new ObjectId(req.params.pokemonId) });
	return res.json(pokemon);
});

BackendRouter.post("/createPokemon", async (req, res) => {
	const db = req.app.get("db");
	try {
		//console.log(req.body);
		const result = await db.collection("player").insertOne(req.body);
		console.info(result);
		res.status(201).json(result.insertedId);
	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}
});

BackendRouter.get("/createPokemon", async (req,res) =>{
	const pokemonFiles = await fs.readdir("images/");
	const pokemonList = pokemonFiles.map((file) => {
		return file;
	});
	//console.log(pokemonList);
	return res.json(pokemonList);
});

// BATTLER POKEMON SECTION
BackendRouter.get("/battlePokemon", async (req,res) =>{
	const db = req.app.get("db");
	//console.log(db);
	const pokemonCursor = await db.collection("battler").aggregate([{ $sample: { size: 1 } }]);

	return res.json(await pokemonCursor.next());
});


// POKEMON BATTLE HISTORY SECTION

BackendRouter.post("/battlePokemon", async (req,res) =>{
	const db = req.app.get("db");
	//const newId = new ObjectId();
	//const result = await db.collection("battles").insertOne({_id: newId, battleName: req.body.battleName, winner: req.body.winner, playerId: new ObjectId(req.body.playerId), opponentId: new ObjectId(req.body.opponentId)});
	const result = await db.collection("battles").insertOne(req.body);
	const findResult = await db.collection("battler").findOne({name: req.body.winner});
	let updateResult;
	console.log(findResult);
	if (findResult == null){
		updateResult = await db.collection("player").updateOne({ name: req.body.winner}, {$inc: {wins:1}});
		console.log(updateResult);
	} else {
		updateResult = await db.collection("battler").updateOne({ name: req.body.winner}, {$inc: {wins:1}});
		console.log(updateResult);
	}

	return res.json(result.insertedId);
});

BackendRouter.get("/battlePokemon/:battleId/win", async (req, res) => {
	const db = req.app.get("db");
	const result = await db.collection("battles").findOne({_id: new ObjectId(req.params.battleId)});
	return res.json(result);
});

BackendRouter.get("/battlePokemon/:battleId/lose", async (req, res) => {
	const db = req.app.get("db");
	const result = await db.collection("battles").findOne({_id: new ObjectId(req.params.battleId)});
	return res.json(result);
});

export default BackendRouter;