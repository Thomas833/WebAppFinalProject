
import { Router } from "express";
import { ObjectId } from "mongodb";

const BASE_URL = 'http://localhost:3001';
const BackendRouter = Router();

// PLAYER POKEMON SECTION
BackendRouter.get("/showPokemonList/:pokemonId", async (req,res) =>{
	const db = req.app.get("db");
	const pokemon = await db.collection("player").findOne({ _id: new ObjectId(req.params.pokemonId) });
	return res.json(pokemon);
  });

BackendRouter.post("/createPokemon", async (req, res) => {
	const db = req.app.get("db");
	try {
		console.log(req.body);
		const result = await db.collection("player").insertOne(req.body);
		console.info(result);
		res.status(201).json(result.insertedId);
	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}
});

// BATTLER POKEMON SECTION


// POKEMON BATTLE HISTORY SECTION

/*
Router.get("/", async (req,res) =>{ // for the route /project/:projectId/todo
  const db = req.app.get("db");
  const pokemonList = await db.collection("player").find({project_i: new ObjectId(req.params.projectId)}).toArray();
  return res.json(pokemonList);
});
*/
export default BackendRouter;