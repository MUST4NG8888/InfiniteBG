import express, { Express, Request, Response } from "express";
import { z } from "zod";
import { Rating, type RatingType } from "../model/Rating";
import { verify } from "../middlewares/verify";
import { verifyToken } from "../middlewares/verifyToken";
import getGames from "../utility/getGames";

const router = express.Router();

const RatingSchema = z.object({
  ratedBy: z.string(),
  gameId: z.number(),
  rating: z.number(),
  reviewTitle: z.string().optional(),
  review: z.string().optional(),
});

const RatingUpdateSchema = z.object({
  ratedBy: z.string().optional(),
  gameId: z.number().optional(),
  rating: z.number().optional(),
  reviewTitle: z.string().optional(),
  review: z.string().optional(),
});

router.post("/", verify(RatingSchema), verifyToken(), async (req, res) => {
  const rating: RatingType = req.body;
  if (rating.ratedBy != res.locals.userId)
    return res.status(403).json("Good try, mate!");
  const existRating = await Rating.findOne({
    ratedBy: rating.ratedBy,
    gameId: rating.gameId,
  });
  if (existRating) {
    return res.status(400).json("You already reviewed this game");
  }
  const newRating = await Rating.create<RatingType>(rating);
  res.status(200).json("The ratings has been saved!");
});

router.get("/:id", verifyToken(), async (req, res) => {
  const userId = res.locals.userId;
  if (req.params.id != res.locals.userId)
    return res.status(403).json("Good try, mate!");
  const ratings = await Rating.find({ ratedBy: userId });
  if (ratings.length === 0) return res.status(404).json("Nothing to be found!");
  const ratingGameData: object[] = await Promise.all(
    ratings.map(async (rating): Promise<object> => {
      const gameId = rating.gameId;
      const game = await getGames(gameId);
      if (game === undefined) return res.status(404).json("No Data found on the interwebz!");
      const ratingGame = {
        _id: rating._id,
        userId: rating.ratedBy,
        gameId: rating.gameId,
        rating: rating.rating,
        reviewTitle: rating.reviewTitle,
        review: rating.review,
        gameTitle: game[0].name,
        gameImage: game[0].image,
        gameDesc: game[0].description,
      };
      return ratingGame;
    })
  );
  res.status(200).json(ratingGameData);
});

router.get("/game/:id", async (req, res) => {
  const gameId = req.params.id;
  const ratings = await Rating.find<RatingType>({ gameId: gameId });
  if (ratings.length === 0) return res.status(404).json("Nothing to be found!");
  res.status(200).json(ratings);
});

router.delete("/:id", verifyToken(), async (req, res) => {
  const ratingId = req.params.id;
  const rating = await Rating.deleteOne({ _id: ratingId });
  if (rating.deletedCount === 0)
    return res.status(404).json("No rating has been deleted!");
  res.status(200).json("Rating has been deleted!");
});

router.put(
  "/:id",
  verify(RatingUpdateSchema),
  verifyToken(),
  async (req, res) => {
    const ratingId = req.params.id;
    const rating = req.body;
    const editedRating = await Rating.findByIdAndUpdate<RatingType>(
      ratingId,
      rating,
      {
        new: true,
      }
    );
    if (editedRating === null) return res.status(404).json("No rating found!");
    res.status(200).json("The ratings has been updated!");
  }
);

export default router;
