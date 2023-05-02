import express, { Express, Request, Response } from "express";
import getGames from "../utility/getGames";
import getHotGames from "../utility/getHotGames";
import getGamesBySearch from "../utility/getGamesBySearch";
import { z } from "zod";

const router = express.Router();


router.get("/hot", async (req : Request, res : Response) => {
  const hotGames = await getHotGames();
  if (hotGames.length < 1)
    return res
      .status(400)
      .json("Better luck next time! There is no match, whatsoever!");
  res.status(200).json(hotGames);
});


router.post("/", async (req : Request, res : Response) => {
  const gameIds = req.body.ids;
  const games = await getGames(gameIds);
  if (games!.length < 1)
    return res
      .status(400)
      .json("Better luck next time! There is no match, whatsoever!");
  res.status(200).json(games);
});

router.get("/search", async (req : Request, res : Response) => {
  const searchTerm = req.query.term;
  const games = await getGamesBySearch(searchTerm);
  if (games.length < 1)
    return res
      .status(400)
      .json("Better luck next time! There is no match, whatsoever!");
  res.status(200).json(games);
});

router.get("/:id", async (req : Request, res : Response) => {
  const gameId = Number(req.params.id);
  const game = await getGames(gameId);
  if (game!.length < 1)
    return res
      .status(400)
      .json("Better luck next time! There is no match, whatsoever!");
  res.status(200).json(game);
});


export default router;
