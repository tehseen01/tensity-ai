import { NextRequest } from "next/server";
import { z } from "zod";

export async function validateApiSchema<T>(
  req: NextRequest,
  schema: z.ZodType<T>
): Promise<T> {
  try {
    const parsedData = await schema.parseAsync(await req.json());
    return parsedData;
  } catch (error) {
    console.error("Validation error:", error); // Log for debugging
    throw new Error("Invalid request body"); // Throw a generic error for security
  }
}
