import express from 'express';
import addsController from '../handlers/adsHandler';
import errorHandler from '../handlers/errorHandler';

const adsRouter = express.Router();

adsRouter.get("/:id/discord", addsController.getDiscordByID)

adsRouter.use(errorHandler)

export default adsRouter;