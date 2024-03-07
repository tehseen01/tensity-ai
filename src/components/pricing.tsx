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
        {pricingData.map((price, index) => (
          <Card
            key={index}
            className={cn(
              "sm:p-4 p-2 rounded-[20px] shadow-xl hover:border-cyan-400",
              !price.title.includes("Basic") && "my-4 "
            )}
          >
            <CardHeader className="items-center gap-2">
              <CardTitle className="text-white/70">{price.title}</CardTitle>
              <div className="text-4xl font-bold">
                <span className="text-6xl">${price.price}</span>
                {price.title !== "Free" && (
                  <span className="text-lg font-normal text-white/50">
                    / MO
                  </span>
                )}
              </div>
              <CardDescription>{price.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="my-4 space-y-2">
                {price.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <span className="size-5 rounded-full border grid place-items-center bg-secondary">
                      {(price.title === "Free" &&
                        [
                          "Priority customer support",
                          "Advanced features",
                        ].includes(feature)) ||
                      (price.title === "Basic" &&
                        "Advanced features".includes(feature)) ? (
                        <X className="size-3 text-black" />
                      ) : (
                        <Check className="size-3 text-cyan-400 " />
                      )}
                    </span>
                    <p className="text-wrap text-white/50">{feature}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full rounded-full text-lg"
                variant="outline"
                size={"lg"}
              >
                Get started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

const pricingData = [
  {
    title: "Free",
    description: "Get started with Free.",
    price: "0",
    features: [
      "10 PDF per month",
      "100 text-to-speech per m.",
      "50 speech-to-text per m.",
      "Access to core features",
      "Priority customer support",
      "Advanced features",
    ],
  },
  {
    title: "Basic",
    description: "Ideal for individuals and small teams.",
    price: "12",
    features: [
      "Unlimited PDF",
      "500 text-to-speech per m.",
      "250 speech-to-text per m.",
      "All core features",
      "Priority customer support",
      "Advanced features",
    ],
  },
  {
    title: "Premium",
    description: "Designed for power users and large teams.",
    price: "29",
    features: [
      "Unlimited PDF",
      "Unlimited text-to-speech",
      "Unlimited speech-to-text",
      "All core features",
      "Priority customer support",
      "Advanced features",
    ],
  },
];
