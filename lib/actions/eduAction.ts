"use server";

import { z } from "zod";
import { db } from "@/db";
import { education } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { educationSchema } from "../schemas/educationSchema";
import { revalidatePath } from "next/cache";

export async function upsertEducationDetails(
  userId: string,
  data: z.infer<typeof educationSchema>
) {
  try {
    // First, delete all existing education records for the user
    await db.delete(education).where(eq(education.userId, userId));

    // Then, insert all new education records
    const insertPromises = data.education.map((edu) =>
      db
        .insert(education)
        .values({ ...edu, userId, id: uuidv4() })
        .returning()
    );

    const results = await Promise.all(insertPromises);

    // Check if all insertions were successful
    if (results.every((result) => result.length > 0)) {
      revalidatePath("/create-resume");
      return { success: true, data: results.flat() };
    } else {
      return { success: false, error: "Some insertions failed" };
    }
  } catch (error) {
    console.error("Error upserting education details:", error);
    return { success: false, error: "Failed to upsert education details" };
  }
}
