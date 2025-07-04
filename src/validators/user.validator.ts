import { z } from "zod";
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const userRegisterSchema = z.object({
    name: z.string({ message: "name is required!" }),
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string({
        required_error: "Password is required",
    }).regex(strongPasswordRegex, "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
});

export const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string({
        required_error: "Password is required",
    }).regex(strongPasswordRegex, "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
})