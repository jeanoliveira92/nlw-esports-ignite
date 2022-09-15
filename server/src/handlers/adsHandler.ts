
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] });

const addsHandler = {
    getDiscordByID: async (request: Request, response: Response) => {
        const adId = request.params.id;

        const ad = await prisma.ad.findUniqueOrThrow({
            select: { discord: true },
            where: { id: adId }
        })

        return response.json({ discord: ad.discord });
    }
}

export default addsHandler;