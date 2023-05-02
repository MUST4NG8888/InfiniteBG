import express, { Request, Response, NextFunction } from "express";
import { safeParse } from "../utility/safeParse";
import { z } from "zod";
import { env } from "../utility/envParser";
import jwt from "jsonwebtoken";

export const verifyToken = () => (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    jwt.verify(token, env.JWT_SECRET_KEY as string, (error, decoded: any) => {
      if (error) return res.status(403).json({ error: "Forbidden" }) 
      res.locals.userId = decoded.id
      next();
    });
  };

  