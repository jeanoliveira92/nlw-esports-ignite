import { z } from "zod";

const gamesSchema = z.object({
    id: z.string().min(5, { message: "Parâmetro necessário: ID" })
});

// extract the inferred type
type GamesSchema = z.infer<typeof gamesSchema>;

export { gamesSchema, GamesSchema };