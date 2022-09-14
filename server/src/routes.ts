import express from 'express';

import adsRouter from './routes/adsRouter';
import gamesRouter from './routes/gamesRouter';

const router = express.Router();

router.use("/ads", adsRouter);
router.use("/games", gamesRouter);

export default router;