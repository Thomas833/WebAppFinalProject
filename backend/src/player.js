
import { Router } from "express";
import { ObjectId } from "mongodb";


const PlayerRouter = Router();

PlayerRouter.get("/:pokemonId", async (req,res) =>{
  const db = req.app.get("db");
  const pokemon = await db.collection("player").findOne({ _id: new ObjectId(req.params.pokemonId) });
  return res.json(pokemon);
});

PlayerRouter.get("/", async (req,res) =>{ // for the route /project/:projectId/todo
  const db = req.app.get("db");
  const pokemonList = await db.collection("player").find({project_i: new ObjectId(req.params.projectId)}).toArray();
  return res.json(pokemonList);
});

PlayerRouter.post("/", async (req, res) => {
	const db = req.app.get("db");
  req.body.project_id = new ObjectId(req.params.projectId);

	try {
		const result = await db.collection("todos").insertOne(req.body);
		console.info(result);
		res.status(201).json(result.insertedId);
	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}
});

export default PlayerRouter;