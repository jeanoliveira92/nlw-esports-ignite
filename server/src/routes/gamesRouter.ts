import express from 'express';
import gamesHandler from '../handlers/gamesHandler';

const gamesRouter = express.Router();

gamesRouter.get("/", gamesHandler.listGames);

gamesRouter.get("/:id/ads", gamesHandler.listAdsByGame)

gamesRouter.post("/:id/ads", gamesHandler.createAd)

export default gamesRouter;