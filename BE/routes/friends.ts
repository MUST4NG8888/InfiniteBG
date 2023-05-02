import express, { Express, Request, Response } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { User } from "../model/User";

const router = express.Router();

router.get("/:id", verifyToken(), async (req, res) => {
  const userId = req.params.id;
  const friends = await User.findById(userId, { friends: 1 }).populate({
    path: "friendzone.friends",
    select: "_id profile avatar email username friendzone.invited",
  });
  if (friends === null) return res.status(400).json("Something went wrong!");
  res.status(200).json(friends);
});

router.post("/", verifyToken(), async (req, res) => {
  const userId = res.locals.userId;
  const friendId = req.body.id;
  const already = await User.find({ friendzone: { friends: friendId } });
  if (already.length > 0)
    return res.status(400).json("You are already in connection!");
  const newFriend = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { "friendzone.friends": friendId } },
    { new: true }
  );
  if (newFriend === null) return res.status(400).json("Something went wrong!");
  const newInvite = await User.findByIdAndUpdate(
    friendId,
    { $addToSet: { "friendzone.invited": userId } },
    { new: true }
  );
  res.status(200).json("Friend request has been sent!");
});

router.delete("/:id", verifyToken(), async (req, res) => {
  const friendId = req.params.id;
  const userId = res.locals.userId;
  const friend = await User.findByIdAndUpdate(
    friendId,
    { $pull: { "friendzone.friends": userId } },
    { new: true }
  );
  if (friend === null) return res.status(400).json("Something went wrong!");
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { "friendzone.friends": friendId } },
    { new: true }
  );
  if (user === null) return res.status(401).json("Something went wrong!");
  res.status(200).json("The user has been removed from your connections!");
});

router.get("/accept/:id", verifyToken(), async (req, res) => {
  const friendId = req.params.id;
  const userId = res.locals.userId;
  const user = await User.findByIdAndUpdate(userId);
  if (user === null) return res.status(400).json("Something went wrong!");
  await User.findByIdAndUpdate(
    userId,
    {
      $pull: { "friendzone.invited": friendId },
      $addToSet: { "friendzone.friends": friendId },
    },
    { new: true }
  );
  res.status(200).json("Friend request has been accepted!");
});

export default router;
