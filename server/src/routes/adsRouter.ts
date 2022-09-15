import express from 'express';
import addsController from '../handlers/adsHandler';

const adsRouter = express.Router();

adsRouter.get("/:id/discord", addsController.getDiscordByID)

export default adsRouter;