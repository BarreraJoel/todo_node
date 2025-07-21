import * as z from "zod";

export const LoginRequest = z.object({
    email: z.
        email(),
    password: z.
        string()
        .min(8)
        .max(8)
});
