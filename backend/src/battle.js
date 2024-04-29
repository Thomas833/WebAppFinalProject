
import { Router } from "express";
import { ObjectId } from "mongodb";


const BattleRouter = Router();

BattleRouter.get("/battlePokemon", async (req,res) =>{
  const db = req.app.get("db");
  const pokemon = await db.collection("battler").aggregate([{$sample: {size: 1}}]); // get random pokemon from battler pokemon collection
  return res.json(pokemon);
});

export default BattleRouter;