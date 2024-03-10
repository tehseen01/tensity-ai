"use client";

import {
  ChevronsLeft,
  ChevronsRight,
  FileText,
  Menu,
  Music,
  Settings2,
  Sparkles,
  Speech,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion as m } from "framer-motion";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<null | number>(null);

  return (
    <AnimatePresence>
      <div className="p-2 flex items-center justify-between md:hidden">
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </Button>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <m.aside
        initial={{ width: 80 }}
        animate={{ width: isOpen ? 225 : 80 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0 }}
        exit={{ type: "spring", width: 80 }}
        className={cn(
          "border-r p-4 w-56 h-dvh flex flex-col overflow-hidden max-md:fixed max-md:top-0 max-md:left-0 max-md:z-10 max-md:backdrop-blur-2xl max-md:-translate-x-full transition-transform",
          isOpen && "max-md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          {isOpen && (
            <m.h3
              initial={{ x: -100 }}
              animate={{
                x: isOpen ? 0 : -100,
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                bounce: 0,
              }}
              className="text-2xl px-2 whitespace-nowrap"
            >
              Tensity AI
            </m.h3>
          )}

          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setHoverIndex(links.length + 1)}
            className="relative"
          >
            {hoverIndex === links.length + 1 && (
              <m.span
                transition={{ type: "spring", bounce: 0.3 }}
                layoutId="sidebar-hover"
                className="absolute top-0 left-0 w-full h-full bg-secondary rounded-lg -z-10"
              />
            )}
            {isOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </Button>
        </div>
        <div
          className="flex flex-col pt-8 gap-1"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {links.map((link, index) => (
            <Link
              onMouseEnter={() => setHoverIndex(index)}
              key={link.text + index}
              href={"/"}
              className={cn(
                "flex items-center p-2 rounded-lg relative",
                isOpen ? "gap-4" : "justify-center"
              )}
            >
              {hoverIndex === index && (
                <m.span
                  transition={{ type: "spring", bounce: 0.3 }}
                  layoutId="sidebar-hover"
                  className="absolute top-0 left-0 w-full h-full bg-secondary rounded-lg -z-10"
                />
              )}
              <span>{link.icon}</span>
              <span
                className={cn("whitespace-nowrap", isOpen ? "block" : "hidden")}
              >
                {link.text}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <Button
            variant={"ghost"}
            className={cn("px-2", isOpen ? "justify-start gap-4" : "gap-0")}
          >
            <span>
              <Settings2 className="text-green-500" />{" "}
            </span>
            <span
              className={cn("whitespace-nowrap", isOpen ? "block" : "hidden")}
            >
              Setting
            </span>
          </Button>
          <Button
            variant={"ghost"}
            className={cn("px-2", isOpen ? "justify-start gap-4" : "gap-0")}
          >
            <span>
              <Sparkles className="text-indigo-500" />
            </span>
            <span
              className={cn("whitespace-nowrap", isOpen ? "block" : "hidden")}
            >
              upgrade Plan
            </span>
          </Button>
          <div className="hover:bg-secondary p-2 rounded-lg">
            <SignedIn>
              <UserButton showName afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </m.aside>
    </AnimatePresence>
  );
};

const links = [
  {
    text: "Talk to Pdf",
    icon: <FileText className="text-violet-600" />,
    path: "/",
  },
  {
    text: "Voice Generator",
    icon: <Speech className="text-blue-400" />,
    path: "/",
  },
  {
    text: "Speech converter",
    icon: <Music className="text-orange-500" />,
    path: "/",
  },
];
