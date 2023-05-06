import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verify } from "../middlewares/verify";
import { safeParse } from "../utility/safeParse";
import { z } from "zod";
import { getIdToken } from "../api/google";
import { getTokenObject } from "../utility/getTokenObject";
import { User, type UserType } from "../model/User";
import { env } from "../utility/envParser";

const router = express.Router();

const secretKey = env.JWT_SECRET_KEY;
if (!env.JWT_SECRET_KEY) throw "Secret Key is required";

const LoginRequestSchema = z.object({
  code: z.string(),
});
type LoginRequest = z.infer<typeof LoginRequestSchema>;

const Payload = z.object({
  sub: z.string(),
  email: z.string().email(),
  name: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  picture: z.string(),
});
type Payload = z.infer<typeof Payload>;

router.post(
  "/",
  verify(LoginRequestSchema),
  async (req: Request, res: Response) => {
    const loginRequest = req.body as LoginRequest;
    const id_token = await getIdToken(loginRequest.code);
    console.log(id_token)
    if (!id_token) return res.status(401);
    const payload: unknown = jwt.decode(id_token);
    const result = safeParse(Payload, payload);
    if (!result) {
      return res.sendStatus(500);
    }
    const userInDB = await User.findOne<UserType>({ subs: result.sub });

    if (!userInDB) {
      const user = {
        avatar: result.picture,
        subs: [result.sub],
        email: result.email,
        profile: {
          name: result.name,
          firstName: result.given_name,
          lastName: result.family_name,
        },
      };
      const newUser = await User.create(user);
      const tokenObject = getTokenObject(newUser);
      const sessionToken = jwt.sign(tokenObject, secretKey);
      return res.status(201).json(sessionToken);
    } else {
      const tokenObject = getTokenObject(userInDB);
      const sessionToken = jwt.sign(tokenObject, secretKey);
      return res.status(202).json(sessionToken);
    }
  }
);
export default router;
