import express, { Express, Request, Response } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { verify } from "../middlewares/verify";
import { z } from "zod";
import { User, type UserType } from "../model/User";
import { Play, type PlayType } from "../model/Play";

const router = express.Router();

const PlaysSchema = z.object({
  date: z.coerce.date(),
  gameTitle: z.string(),
  gameId: z.number(),
  playerNumber: z.number(),
  players: z.array(
    z.object({
      name: z.string(),
      userId: z.string().optional(),
      points: z.number(),
      colour: z.string(),
      position: z.number(),
    })
  ),

  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
});

const PlaysUpdateSchema = z.object({
  date: z.date().optional(),
  gameTitle: z.string().optional(),
  gameId: z.number().optional(),
  playerNumber: z.number().optional(),
  players: z.array(
    z.object({
        name: z.string().optional(),
        userId: z.string().optional(),
        points: z.number().optional(),
        colour: z.string().optional(),
        position: z.number().optional(),
      }).optional()
  ).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
});

router.post(
  "/",
  verify(PlaysSchema),
  verifyToken(),
  async (req: Request, res: Response) => {
    const play = req.body;
    const userId = res.locals.userId;
    const newPlay = await Play.create(play);
    if (!newPlay) return res.status(400).json("Play can't be created!");
    await User.findByIdAndUpdate(
      userId,
      { $push: { plays: newPlay._id } },
      { new: true }
    );
    res.status(200).json("The play has been created!");
  }
);

router.get("/", async (req: Request, res: Response) => {
  const plays = await Play.find();
  if (plays.length === 0) return res.status(400).json("No plays found!");
  res.status(200).json(plays);
});

router.get("/:id", verifyToken(), async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const plays = await User.find({ _id: userId }, {plays: 1}).populate("plays");
  if (plays.length === 0) return res.status(400).json("No plays found!");
  res.status(200).json(plays);
});

router.put(
  "/:id",
  verify(PlaysUpdateSchema),
  verifyToken(),
  async (req: Request, res: Response) => {
    const playId = req.params.id;
    const newData = req.body;
    const editedPlay = await Play.findByIdAndUpdate(
        playId,
        newData,
        { new: true }
        );
    if (editedPlay === null) return res.status(401).json("No plays found!");
    res.status(200).json(editedPlay);
  }
);

router.delete("/:id", verifyToken(), async (req: Request, res: Response) => {
  const playId = req.params.id;
  const userId = res.locals.userId;
  const play = await Play.findByIdAndDelete({
    _id: playId,
  });
  if (play === null) return res.status(400).json("No play has been deleted!");
  const userModified = await User.findByIdAndUpdate(
    {
      _id: userId,
    },
    { $pull: { plays: play._id } },
    { new: true }
  );
  res.status(200).json("Play has been deleted!");
});
export default router;
