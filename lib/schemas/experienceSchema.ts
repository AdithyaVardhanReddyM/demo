import { z } from "zod";

export const experienceSchema = z.object({
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  responsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required"), // Expecting an array of strings
  startDate: z.number().min(1, "Start date is required"), // Assuming timestamp is a number
  endDate: z.number().optional(), // End date is optional
});
