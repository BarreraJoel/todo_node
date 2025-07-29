import * as z from "zod";

export const LoginRequest = z.strictObject({
    email: z.
        email(),
    password: z.
        string()
        .min(8)
        .max(8)
});
