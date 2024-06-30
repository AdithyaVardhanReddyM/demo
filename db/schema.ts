import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const personalDetails = sqliteTable("personal_details", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email").notNull().unique(),
  portfolio: text("portfolio"),
  jobRole: text("job_role").notNull(),
  overallSummary: text("overall_summary"),
});

export const experience = sqliteTable("experience", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(), // Changed from summary to description
  responsibilities: text("responsibilities").notNull(), // This will store JSON stringified array of strings
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }),
});

export const education = sqliteTable("education", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  institutionName: text("institution_name").notNull(),
  educationType: text("education_type").notNull(),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }),
  description: text("description").notNull(), // Changed from summary to description
});

export const skill = sqliteTable("skill", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  skillType: text("skill_type").notNull(),
  expertise: integer("expertise").notNull().default(1),
});

export const achievement = sqliteTable("achievement", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

// New projects model
export const project = sqliteTable("project", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  url: text("url"),
  description: text("description").notNull(),
  features: text("features").notNull(), // This will store JSON stringified array of strings
});

export type PersonalDetails = typeof personalDetails.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Skill = typeof skill.$inferSelect;
export type Achievement = typeof achievement.$inferSelect;
export type Project = typeof project.$inferSelect;
