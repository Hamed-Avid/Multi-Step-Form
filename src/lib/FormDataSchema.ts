import { z } from "zod";

export const FormDataSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  birthDate: z
    .string()
    .min(8)
    .transform((str) => new Date(str)),
  email: z.string().min(1).email("invalid email"),
  phone: z
    .string()
    .min(1)
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "invalid phone number"
    ),
});
