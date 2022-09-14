import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] });

const adsRouter = express.Router();

adsRouter.get("/:id/discord", async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: { discord: true },
        where: { id: adId }
    })

    return response.json({ discord: ad.discord });
})

export default adsRouter;