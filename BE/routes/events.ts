import express, { Express, Request, Response } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { verify } from "../middlewares/verify";
import { z } from "zod";
import { Event, type EventType } from "../model/Event";
import { User, type UserType } from "../model/User";
import { sendEventToCalendar } from "../utility/sendEventToCalendar";
import { env } from "../utility/envParser";

const router = express.Router();

const EventSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  public: z.boolean(),
});

const EventUpdateSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  title: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  public: z.boolean().optional(),
});

router.post(
  "/",
  verify(EventSchema),
  verifyToken(),
  async (req: Request, res: Response) => {
    const event = req.body;
    const userId = res.locals.userId;
    const newEvent = await Event.create(event);
    if (!newEvent) return res.status(400).json("Event can't be created!");
    await User.findByIdAndUpdate(
      userId,
      { $push: { events: newEvent._id } },
      { new: true }
    );
    await Event.findByIdAndUpdate(
      newEvent._id,
      { $push: { creator: userId, invited: userId, admin: userId } },
      { new: true }
    );
    res.status(200).json("The event has been created!");
  }
);

router.get("/", async (req: Request, res: Response) => {
  const events = await Event.find({ public: true })
    .sort({ startDate: 1 })
    .populate({
      path: "creator",
      select: "_id profile username avatar",
    })
    .populate({
      path: "admin",
      select: "_id profile username avatar",
    })
    .populate({
      path: "invited",
      select: "_id profile username avatar",
    })
    .populate({
      path: "interested",
      select: "_id profile username avatar",
    })
    .populate({
      path: "going",
      select: "_id profile username avatar",
    });
  if (events.length === 0) return res.status(400).json("No events found!");
  res.status(200).json(events);
});

router.get("/:id", verifyToken(), async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const events = await Event.find({
    $or: [
      { invited: userId },
      { created: userId },
      { admin: userId },
      { going: userId },
      { interested: userId },
    ],
  }).sort({ startDate: 1 });
  if (events.length === 0) return res.status(400).json("No events were found!");
  res.status(200).json(events);
});

router.put(
  "/:id",
  verify(EventUpdateSchema),
  verifyToken(),
  async (req: Request, res: Response) => {
    const eventId = req.params.id;
    const newData = req.body;
    const editedEvent = await Event.findByIdAndUpdate<EventType>(
      eventId,
      newData,
      { new: true }
    );
    if (editedEvent === null) return res.status(401).json("No events found!");
    res.status(200).json(editedEvent);
  }
);

router.delete("/:id", verifyToken(), async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const event = await Event.findByIdAndDelete({
    _id: eventId,
  });
  if (event === null) return res.status(400).json("No event has been deleted!");
  const userModified = await User.updateMany(
    {
      events: event._id,
    },
    {
      $pull: { events: event._id },
    }
  );
  res.status(200).json("Event has been deleted!");
});

router.post(
  "/addtocalendar",
  verifyToken,
  async (req: Request, res: Response) => {
    const eventId = req.body.id;
    const event = await Event.findById<EventType>({ _id: eventId });

    const userId = res.locals.userId;
    const user = await User.findById<UserType>(userId);
    const API_KEY = env.API_KEY;

    const googleEvent = {};

    const response = await sendEventToCalendar(API_KEY, googleEvent);
    if (!response.status) return res.status(400).json(" NOT OK");
    return res.status(201).json("OK");
  }
);

router.post("/join/:id", verifyToken(), async (req: Request, res: Response) => {
  const chosenApplication = req.body.chosen;
  const eventId = req.params.id;
  const userId = res.locals.userId;
  const event = await Event.find({ _id: eventId });
  if (event.length === 0) return res.status(400).json("Something went wrong!");
  const already = await Event.find({
    $or: [{ created: userId }, { admin: userId }],
  });
  if (already.length > 0)
    return res
      .status(400)
      .json(
        "You have already joined because you created this event, There are no way you'r a Quiter! :)"
      );
  const oldChosen = await Event.findByIdAndUpdate(
    eventId,
    {
      $pull: { invited: userId, interested: userId, going: userId },
    },
    { new: true }
  );

  const newChosen = await Event.findByIdAndUpdate(
    eventId,
    {
      $addToSet: { [chosenApplication]: userId },
    },
    { new: true }
  );
  res.status(200).json("Successfuly joined!");
});

router.post(
  "/invite/:id",
  verifyToken(),
  async (req: Request, res: Response) => {
    const eventId = req.params.id;
    const invitedUserId = req.body.id;
    const userId = res.locals.userId;

    const event = await Event.find({ _id: eventId });
    if (event.length === 0)
      return res.status(400).json("Something went wrong!");
    if (!event[0].admin.includes(userId))
      return res.status(400).json("You are not authorized to do that!");
    const already = await Event.find({ invited: invitedUserId });
    if (already.length > 0)
      return res
        .status(400)
        .json("You have already invited the user to this event! :)");

    const newInvite = await Event.findByIdAndUpdate(
      eventId,
      {
        $addToSet: { invited: invitedUserId },
      },
      { new: true }
    );
    res.status(200).json("Successfuly invited the user!");
  }
);

export default router;
