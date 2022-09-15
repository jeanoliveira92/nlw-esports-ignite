import { z } from "zod";

const idSchema = z.object({
    id: z.string().min(5, { message: "Parâmetro necessário: ID" })
});

// extract the inferred type
type IdSchema = z.infer<typeof idSchema>;

const adsSchema = z.object({
    "name": z.string(),
    "yearsPlaying": z.number(),
    "discord": z.string(),
    "weekDays": z.array(z.number()),
    "hourStart": z.string(),
    "hourEnd": z.string()
})

// extract the inferred type
type AdsSchema = z.infer<typeof adsSchema>;

export { idSchema, IdSchema, adsSchema, AdsSchema };