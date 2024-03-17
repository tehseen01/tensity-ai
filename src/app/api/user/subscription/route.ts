import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId)
      return new Response("Unauthorized: you are not logged in", {
        status: 401,
      });

    const subscription = await db.subscription.findUnique({
      where: { clerkUserId: userId },
    });
    if (!subscription)
      return new Response("Subscription not found", { status: 404 });

    return NextResponse.json({ subscription }, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 501 });
  }
}
