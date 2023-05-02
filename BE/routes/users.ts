import express, { Express, Request, Response } from "express";
import { verify } from "../middlewares/verify";
import { verifyToken } from "../middlewares/verifyToken";
import { User, type UserType } from "../model/User";
import { z } from "zod";

const router = express.Router();

const UserUpdateSchema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  avatar: z.string().optional(),
  email: z.string().optional(),
  profile: z.object({}).optional(),
  active: z.boolean().optional(),
});


router.get("/", verifyToken(), async (req: Request, res: Response) => {
  const userId = res.locals.userId
  const user = await User.findById(userId);
  if (user === null) return res.status(400).json("Nothing to be found!");
  res.status(200).json(user);
});

router.get("/search", verifyToken(), async (req: Request, res: Response) => {
  // const userName = req.query.username;
  // const name = req.query.name;
  // const userEmail = req.query.email;
  const keyWord = req.query.keyword;

  const user = await User.find({
    $or: [
      { email: { $regex: `${keyWord}` } },
      { "profile.name": { $regex: `${keyWord}` } },
      { username: { $regex: `${keyWord}` } },
    ],
  });
  if (user.length < 1) return res.status(400).json("No user found!");
  res.status(200).json(user);
});

router.put(
  "/",
  verify(UserUpdateSchema),
  verifyToken(),
  async (req: Request, res: Response) => {
    const updatedData = req.body;
    const userId = res.locals.userId;
    const editedUser = await User.findByIdAndUpdate<UserType>(
      userId,
      updatedData,
      { new: true }
    );
    if (editedUser === null)
      return res.status(400).json("Something went wrong!");

    res.status(200).json(editedUser);
  }
);

export default router;
