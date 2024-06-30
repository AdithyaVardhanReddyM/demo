"use server";

import { z } from "zod";
import { personalDetailsSchema } from "../schemas/personalSchema";
import { db } from "@/db";
import { personalDetails } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

export async function upsertPersonalDetails(
  userId: string,
  data: z.infer<typeof personalDetailsSchema>
) {
  try {
    const existingRecord = await db
      .select()
      .from(personalDetails)
      .where(eq(personalDetails.userId, userId))
      .limit(1);
    let result;
    if (existingRecord.length > 0) {
      // Update existing record
      result = await db
        .update(personalDetails)
        .set(data)
        .where(eq(personalDetails.userId, userId))
        .returning();
    } else {
      // Insert new record
      result = await db
        .insert(personalDetails)
        .values({ ...data, userId, id: uuidv4() })
        .returning();
    }
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error upserting personal details:", error);
    return { success: false, error: "Failed to save personal details" };
  }
}
