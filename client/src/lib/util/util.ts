import z from "zod";

export const requiredString = (fieldName: string) =>
  z
    .string({ error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });
