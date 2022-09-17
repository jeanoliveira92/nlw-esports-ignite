
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'
import { idSchema } from '../schemas/adsSchema';

const prisma = new PrismaClient({ log: ['query'] });

const addsHandler = {
    getDiscordByID: async (request: Request, response: Response, next: NextFunction) => {
        const { params } = request;

        const validate = idSchema.safeParse(params);
        if (!validate.success) return next(validate.error.issues[0].message)

        const { id: adId } = request.params;

        const ad: any = await prisma.ad.findUnique({
            select: { discord: true },
            where: { id: adId }
        })

        if (!ad) next("Nenhum anúncio encontrado!")

        return response.json({ discord: ad.discord });
    }
}

export default addsHandler;