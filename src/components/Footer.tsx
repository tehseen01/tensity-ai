"use client";

import Link from "next/link";
import React from "react";
import { ArrowUp, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-11/12 mx-auto py-10 mt-10">
      <div className="flex items-center justify-between max-md:space-y-4 max-md:flex-wrap">
        <div className="flex flex-col gap-4">
          <Link href={"/"} className="text-3xl font-bold">
            TensityAI
          </Link>
        </div>
        <ul className="flex items-center md:gap-16 gap-6 max-md:w-full max-md:justify-between max-md:order-3">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.path} className="opacity-60 hover:opacity-100">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="size-10 rounded-full border flex items-center justify-center hover:bg-secondary max-md:ml-auto"
          onClick={handleScrollTop}
        >
          <ArrowUp strokeWidth={1} />
        </button>
      </div>
      <div className="border-t mt-8 pt-8 flex items-center justify-between flex-wrap gap-6">
        <p className="text-white/80">
          © {new Date().getFullYear()} All right reserved
        </p>
        <div className="flex items-center gap-8">
          <Link href={"/"}>
            <Twitter strokeWidth={1} className="hover:text-white" />
          </Link>
          <Link href={"/"}>
            <Linkedin strokeWidth={1} />
          </Link>
          <Link href={"/"}>
            <Instagram strokeWidth={1} />
          </Link>
          <Link href={"/"}>
            <Github strokeWidth={1} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const links = [
  {
    text: "Features",
    path: "dashboard",
  },
  {
    text: "Pricing",
    path: "pricing",
  },
  {
    text: "About",
    path: "about",
  },
  {
    text: "Blog",
    path: "blog",
  },
];
