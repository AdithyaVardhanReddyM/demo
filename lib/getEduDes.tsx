"use server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function getEducationDescription({ data }: { data: string }) {
  try {
    const result = await generateText({
      model: google("models/gemini-pro"),
      prompt: `Generate a short education description (3-4 lines) based on : ${data}`,
    });
    const responses = result.text;
    console.log(responses);
    return responses;
  } catch (error) {}
}
