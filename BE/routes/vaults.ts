import express, { Express, Request, Response } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { User, type UserType } from "../model/User";
import { Vault, type VaultType } from "../model/Vault";
import { verify } from "../middlewares/verify";
import { z } from "zod";
import getGames from "../utility/getGames";

const router = express.Router();

const VaultSchema = z.object({
  collectionName: z.string(),
  gameId: z.number(),
});


const userCollectionSchema = z.object({
  favourites : z.number().array(),
  whisList : z.number().array(),
  wantToPlay: z.number().array(),
  wantToBuy: z.number().array(),
  owned: z.number().array(),
  forTrade: z.number().array(),
})

type userCollection = z.infer<typeof userCollectionSchema>;

router.get("/:id", verifyToken(), async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (res.locals.userId !== userId)
    return res.status(400).json(" Nice try, mate!");

  const userData = await User.findById(userId, {events: 0, friendzone: 0, plays: 0}).lean();

  const userVault = await Vault.findById(userData?.vault);

  const userCollection = { 
    favourites: await getGames(userVault?.favourites),
    whisList: await getGames(userVault?.whisList),
    wantToPlay: await getGames(userVault?.wantToPlay),
    wantToBuy: await getGames(userVault?.wantToBuy),
    owned: await getGames(userVault?.owned),
    forTrade: await getGames(userVault?.forTrade)
  };

 

  res.status(200).json({ ...userData,  ...userCollection });
});

router.post(
  "/",
  verify(VaultSchema),
  verifyToken(),
  async (req: Request, res: Response) => {
    const collectionName = req.body.collectionName;
    const gameId = req.body.gameId;
    const userId = res.locals.userId;
    const user = await User.findById(userId);
    if (user?.vault === undefined) {
      const newVault = await Vault.create({ [collectionName]: gameId });
      const addVault = await User.findByIdAndUpdate(userId, {
        vault: newVault._id,
      });
      return res
        .status(200)
        .json(
          "Vault's been created and Game has been added to your collection!"
        );
    }
    await Vault.findByIdAndUpdate(
      user.vault,
      {
        $pull: {
          owned: gameId,
          forTrade: gameId,
          wantToBuy: gameId,
          wantToPlay: gameId,
          whisList: gameId,
        },
      },
      { new: true }
    );
    const updatedData = await Vault.findByIdAndUpdate(
      user.vault,
      { $addToSet: { [collectionName]: gameId } },
      { new: true }
    );
    console.log(updatedData);
    res.status(200).json("Game has been added to your collection!");
  }
);

router.delete(
  "/:id",
  verifyToken(),
  async (req: Request, res: Response) => {
    
    const gameId = req.params.id;
    const userId = res.locals.userId;
    const user = await User.findById(userId);
    if (user?.vault === undefined) {
      return res
        .status(400)
        .json("You don't have any collection to delete games from!");
    }

    const deletedarray = await Vault.findByIdAndUpdate(
      user.vault,
      {
        $pull: {
          owned: gameId,
          forTrade: gameId,
          wantToBuy: gameId,
          wantToPlay: gameId,
          whisList: gameId,
        },
      },
      { new: true }
    );
    res.status(200).json("Game has been deleted from your collection!");
  }
);

export default router;
