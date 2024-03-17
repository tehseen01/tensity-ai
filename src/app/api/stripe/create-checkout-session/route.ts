import { db } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { validateApiSchema } from "@/lib/validations";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const checkoutSchema = z.object({
  domain: z.string(),
  priceId: z.string(),
});

export async function POST(req: NextRequest, res: NextResponse): Promise<any> {
  try {
    const { domain, priceId } = await validateApiSchema(req, checkoutSchema);

    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized: You have to sign in first", {
        status: 401,
      });
    }

    const user = await db.user.findFirst({
      where: { clerkUserId: userId },
    });
    if (!user)
      return new Response("Unauthorized: user not found in DB", {
        status: 401,
      });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user?.email,
      success_url: `${domain}?success=true`,
      cancel_url: `${domain}?canceled=true`,
      mode: "subscription",
      metadata: { userId },
    });

    return NextResponse.json({ session_url: session.url }, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 501 });
  }
}
