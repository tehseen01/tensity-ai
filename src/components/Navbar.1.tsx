"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { AnimatePresence, motion as m } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Transition from "./ui/transition";
import { auth } from "@clerk/nextjs";
import { links } from "./Navbar";

export const Navbar = () => {
  const [hoverIndex, setHoverIndex] = useState<null | number>(null);
  const pathname = usePathname();
  const {} = auth();

  const handleMouseLeave = () => {
    const index = links.findIndex((link) => pathname.includes(link.path));
    setHoverIndex((prev) => (prev === index ? index : null));
  };

  if (["/sign-up", "/sign-in"].includes(pathname)) {
    return null;
  }

  return (
    <Transition initial={{ opacity: 0, y: -50 }}>
      <header className="flex items-center justify-between py-4 w-11/12  mx-auto">
        <div>
          <h1 className="text-3xl font-semibold">
            <Link href={"/"}>TensityAI</Link>
          </h1>
        </div>
        <AnimatePresence>
          <div
            className="flex items-center justify-center gap-6 border px-4 py-2 rounded-full max-md:hidden"
            onMouseLeave={handleMouseLeave}
          >
            {links.map((link, index) => (
              <Link
                onMouseEnter={() => setHoverIndex(index)}
                key={index}
                href={link.path}
                className="text-lg px-3 py-1 rounded-full relative"
              >
                {(hoverIndex === index || pathname.includes(link.path)) && (
                  <m.span
                    transition={{ type: "spring", bounce: 0.3 }}
                    exit={{ type: "spring" }}
                    layoutId="links-hover"
                    className="absolute top-0 left-0 w-full h-full bg-secondary -z-10 rounded-full"
                  />
                )}
                <span>{link.text}</span>
              </Link>
            ))}
          </div>
        </AnimatePresence>
        <div>
          <Button asChild>
            <Link href={"/sign-in"}>Login</Link>
          </Button>
        </div>
      </header>
    </Transition>
  );
};
