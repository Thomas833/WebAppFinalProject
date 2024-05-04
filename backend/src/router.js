
import { Router } from "express";
import { ObjectId } from "mongodb";

const BASE_URL = 'http://localhost:3001';
const BackendRouter = Router();

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
	const newId = new ObjectId();
	//console.log(req.body.battleName);
	const result = await db.collection("battles").insertOne({_id: newId, battleName: req.body.battleName, winner: req.body.winner, winnerId: req.body.winnerId});
	//const result = await db.collection("battles").insertOne(req.body);

	return result;
});


BackendRouter.put("/battlePokemon", async (req, res) => {
	const db = req.app.get("db");
	const findResult = await db.collection("battler").findOne({_id: ObjectId(req.params.winnerId)});
	const updateResult = null;
	if (findResult == null){
		updateResult = await db.collection("player").updateOne({ name: req.params.winner}, {$inc: {wins:1}});
	} else {
		updateResult = await db.collection("battler").updateOne({ name: req.params.winner}, {$inc: {wins:1}});
	}
	return updateResult;
});

export default BackendRouter;