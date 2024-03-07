"use client";

import { useInView, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface StickyScrollProps {
  content: {
    title: string;
    description: string;
    content?: any;
    icon: JSX.Element;
  }[];
}

export const StickyScroll = ({ content }: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div
      className="flex max-md:flex-col md:gap-16 gap-8 w-[90%] mx-auto relative py-10"
      ref={ref}
    >
      <div className="flex-1">
        {content.map((item, index) => (
          <div
            key={index}
            className="md:h-dvh  md:pr-16 flex items-center justify-center"
          >
            <div className="space-y-8">
              <span className="text-start text-cyan-400 text-xl">
                {item.icon}
              </span>
              <h3 className="md:text-6xl text-4xl font-bold">{item.title}</h3>
              <p className="sm:text-xl opacity-65">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-dvh w-full sticky top-0 max-md:hidden flex-1 py-16">
        <div className="w-full h-full bg-secondary rounded-2xl overflow-hidden">
          {content[activeCard].content}
        </div>
      </div>
    </div>
  );
};
