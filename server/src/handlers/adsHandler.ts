
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'
import { idSchema } from '../schemas/adsSchema';

const prisma = new PrismaClient({ log: ['query'] });

const addsHandler = {
    getDiscordByID: async (request: Request, response: Response, next: NextFunction) => {
        const { id: adId } = request.params;

        const validate = idSchema.safeParse(adId);
        if (!validate.success) next(validate.error.issues[0].message)

        const ad: any = await prisma.ad.findUnique({
            select: { discord: true },
            where: { id: adId }
        })

        if (!ad) next("Nenhum anúncio encontrado!")

        return response.json({ discord: ad.discord });
    }
}

export default addsHandler;