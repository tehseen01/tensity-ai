import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const PLANS = [
  {
    title: "Free",
    description: "Get started with Free.",
    amount: "0",
    priceId: null,
    features: [
      { text: "10 PDF per month" },
      { text: "100 text-to-speech per m." },
      { text: "50 speech-to-text per m." },
      { text: "Access to core features" },
      { text: "Priority customer support", negative: true },
      { text: "Advanced features", negative: true },
    ],
  },
  {
    title: "Basic",
    description: "Ideal for individuals and small teams.",
    amount: "994",
    priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID!,
    productId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRODUCT_ID,
    features: [
      { text: "Unlimited PDF" },
      { text: "500 text-to-speech per m." },
      { text: "250 speech-to-text per m." },
      { text: "All core features" },
      { text: "Priority customer support" },
      { text: "Advanced features", negative: true },
    ],
  },
  {
    title: "Premium",
    description: "Designed for power users and large teams.",
    amount: "2499",
    priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID!,
    productId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRODUCT_ID,
    features: [
      { text: "Unlimited PDF" },
      { text: "Unlimited text-to-speech" },
      { text: "Unlimited speech-to-text" },
      { text: "All core features" },
      { text: "Priority customer support" },
      { text: "Advanced features" },
    ],
  },
];
