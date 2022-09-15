
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'

import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from '../utils/conver-minutes-to-hours-string';

import { gamesSchema } from '../schemas/gamesSchema';
import { adsSchema } from '../schemas/adsSchema';

const prisma = new PrismaClient({ log: ['query'] });

const gamesHandler = {
    listGames: async (request: Request, response: Response) => {
        const games = await prisma.game.findMany({
            include: {
                _count: {
                    select: { ads: true }
                }
            }
        })

        return response.json(games);
    },

    listAdsByGame: async (request: Request, response: Response, next: NextFunction) => {
        const params = request.params;

        const validate = gamesSchema.safeParse(params)
        if (!validate.success) return next(validate.error.issues[0].message)

        const { id: gameId } = params;

        const ads = await prisma.ad.findMany({
            select: { id: true, name: true, weekDays: true, useVoiceChannel: true, yearsPlaying: true, hourStart: true, hourEnd: true },
            where: { gameId: gameId },
            orderBy: { createdAt: 'desc' }
        })

        return response.json(ads.map(ad => ({
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        })));
    },

    createAd: async (request: Request, response: Response, next: NextFunction) => {
        const { params, body }: any = request;

        const validateParams = gamesSchema.safeParse(params)
        if (!validateParams.success) return next(validateParams.error.issues[0].message)

        const validateBody = adsSchema.safeParse(body)
        if (!validateBody.success) return next(validateBody.error.issues.map(issue => {
            return { [issue.path[0]]: issue.message }
        }))

        const { id: gameId } = params;

        const ad = await prisma.ad.create({
            data: {
                "gameId": gameId,
                "name": body.name,
                "yearsPlaying": body.yearsPlaying,
                "discord": body.discord,
                "weekDays": body.weekDays.join(','),
                "hourStart": convertHourStringToMinutes(body.hourStart),
                "hourEnd": convertHourStringToMinutes(body.hourEnd),
                "useVoiceChannel": body.useVoiceChannel
            }
        })

        return response.status(201).json(ad);
    }
}

export default gamesHandler;