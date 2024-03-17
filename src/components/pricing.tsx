"use client";

import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Ban, Check, Clock, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Transition from "./ui/transition";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PLANS } from "@/lib/stripe";
import { useSubscription } from "@/lib/store";
import { useUser } from "@clerk/nextjs";

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white sm:p-6 p-2 md:w-10/12 mx-auto relative">
      <div className="absolute top-0 w-full h-full -z-10">
        <Transition
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Image
            src={"/half-circles.svg"}
            width={500}
            height={500}
            alt="pricing-bg"
            className="w-full"
          />
        </Transition>
      </div>
      <div className="grid place-items-center space-y-2 py-8">
        <span className="text-cyan-400">Invest in Success</span>
        <Transition>
          <h4 className="lg:text-6xl md:text-4xl text-3xl text-transparent font-bold bg-gradient-to-b bg-clip-text from-white via-white to-white/20">
            Transparent pricing
          </h4>
        </Transition>
        <Transition>
          <p className="sm:w-2/3 mx-auto text-center text-white/50 pt-4">
            We offer flexible pricing plans to suit businesses of all sizes.
            Choose the plan that aligns with your needs and budget, and start
            harnessing the power of AI today.
          </p>
        </Transition>
        <Transition>
          <div className="flex items-center justify-center md:gap-16 max-md:flex-col gap-8 py-10 max-md:pb-0">
            <p className="flex items-center justify-center gap-2 text-white/50">
              <span>
                <Ban />
              </span>
              <span>Cancel Anytime</span>
            </p>
            <p className="flex items-center justify-center gap-2 text-white/50">
              <span>
                <Clock />
              </span>
              <span>24/7 Support</span>
            </p>
            <p className="flex items-center justify-center gap-2 text-white/50">
              <span>
                <EyeOff />
              </span>
              <span>No Hidden Fees</span>
            </p>
          </div>
        </Transition>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        {PLANS.map((price, index) => (
          <PricingCard key={index} {...price} />
        ))}
      </div>
    </div>
  );
}

interface PricingCardProps {
  title: string;
  description: string;
  amount: string;
  priceId: string | null;
  features: { text: string; negative?: boolean }[];
}

const PricingCard = ({
  title,
  description,
  features,
  amount,
  priceId,
}: PricingCardProps) => {
  const { push } = useRouter();
  const { activeSubscription } = useSubscription();
  const { isSignedIn } = useUser();

  const handleCheckoutClick = async () => {
    try {
      if (!priceId) return;
      const body = { domain: window.location.href, priceId };
      const { data } = await axios.post(
        "/api/stripe/create-checkout-session",
        body
      );

      push(data.session_url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className={cn(
        "sm:p-4 p-2 rounded-[20px] shadow-xl hover:border-cyan-400",
        !title.includes("Basic") && "my-4 "
      )}
    >
      <CardHeader className="items-center gap-2">
        <CardTitle className="text-white/70">{title}</CardTitle>
        <div className="text-4xl font-bold">
          <span className="text-6xl">₹{amount}</span>
          {title !== "Free" && (
            <span className="text-lg font-normal text-white/50">/ MO</span>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="my-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-4">
              <span className="size-5 rounded-full border grid place-items-center bg-secondary">
                {feature.negative ? (
                  <X className="size-3 text-black" />
                ) : (
                  <Check className="size-3 text-cyan-400 " />
                )}
              </span>
              <p className="text-wrap text-white/50">{feature.text}</p>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full rounded-full text-lg"
          variant={
            activeSubscription?.stripePriceId === priceId
              ? "outline"
              : "secondary"
          }
          size={"lg"}
          onClick={handleCheckoutClick}
          disabled={activeSubscription?.stripePriceId === priceId}
        >
          {isSignedIn
            ? activeSubscription?.stripePriceId === priceId
              ? "Active plan"
              : "Get started"
            : "Sign up"}
        </Button>
      </CardFooter>
    </Card>
  );
};
