import { z } from "zod";

export const personalDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  email: z.string().email("Invalid email address"),
  portfolio: z.string().optional(),
  jobRole: z.string().min(1, "Job role is required"),
  overallSummary: z.string().optional(),
});
