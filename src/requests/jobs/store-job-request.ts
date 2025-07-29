import * as z from "zod";

export const StoreJobRequest = z.strictObject({
    user_uuid: z
        .string(),
    name: z
        .string()
        .min(3)
        .max(100),
});
