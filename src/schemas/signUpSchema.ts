import { z } from "zod";

export const passwordValidation = z
    .string()
    .min(8, "password must be at least 8 character")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")

export const signUpSchema = z.object({
    fullName: z.string().trim().nonempty({message: "Full Name is required"}),
    password: passwordValidation,
    email: z.string().email({message: "Invalid email address"})
})