import { z } from "zod";

export const educationItemSchema = z.object({
  institutionName: z.string().min(1, "Institution name is required"),
  educationType: z.string().min(1, "Education type is required"),
  startDate: z.date(),
  endDate: z.date().optional(),
  description: z.string().min(1, "Description is required"),
});

export const educationSchema = z.object({
  education: z.array(educationItemSchema),
});
