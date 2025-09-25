import { requiredString } from "../util/util";
import {  z } from "zod";

export const editProfileSchema = z.object({
displayName: requiredString('Display Name'),
bio: z.string().optional()
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;