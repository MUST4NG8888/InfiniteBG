import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import login from "./routes/login";
import games from "./routes/games";
import user from "./routes/users";
import friends from "./routes/friends";
import ratings from "./routes/ratings";
import events from "./routes/events";
import vaults from "./routes/vaults";
import plays from "./routes/plays";
import cors from "cors";


const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use("/api/login", login);
app.use("/api/games", games);
app.use("/api/users", user);
app.use("/api/friends", friends);
app.use("/api/ratings", ratings);
app.use("/api/plays", plays);
app.use("/api/events", events);
app.use("/api/vaults", vaults);


export default app;
