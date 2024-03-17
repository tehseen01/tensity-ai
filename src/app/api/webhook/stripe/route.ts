import { db } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY || ""
    );
  } catch (error: any) {
    return new Response(
      `Webhook Error: ${
        error instanceof Error ? error.message : "Unknown Error"
      }`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (!session?.metadata?.userId) return new Response(null, { status: 200 });

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db.subscription.update({
      where: { clerkUserId: session.metadata.userId },
      data: {
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: subscription.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripePriceId: subscription.items.data[0].price.id,
        subscriptionStatus: subscription.status,
        clerkUserId: session.metadata.userId,
        subscriptionType: "PREMIUM",
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db.subscription.update({
      where: {
        clerkUserId: session.metadata.userId,
      },
      data: {
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        subscriptionStatus: subscription.status,
      },
    });
  }

  return new Response(null, { status: 200 });
}
