import * as z from "zod";

export const RegisterRequest = z.strictObject({
    email: z
        .email(),
    password: z
        .string()
        .min(8)
        .max(8),
    password_confirm: z
        .string()
        .min(8)
        .max(8),
    first_name: z
        .string()
        .min(3)
        .max(20),
    last_name: z
        .string()
        .min(3)
        .max(20),
});
