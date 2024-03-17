import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { ArrowRight, FileText, Music, Speech } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user) return;

  return (
    <div className="flex h-dvh items-center p-4 flex-col max-w-screen-md mx-auto">
      <div className="md:mt-20 mt-10">
        <h3 className="md:text-6xl text-5xl font-bold">
          Hello, {`${user?.firstName} ${user?.lastName || ""}`}
        </h3>
        <p className="md:text-6xl text-4xl opacity-40">
          How can I help you today.
        </p>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 items-center justify-between gap-4 mt-10 w-full">
        {cards.map((card, index) => (
          <Link
            href={card.path}
            key={card.title + index}
            className="border p-3 rounded-lg hover:bg-secondary/30 group max-md:flex max-md:gap-4"
          >
            <div className="flex gap-4 items-center order-2">
              <span className="font-bold text-lg ">{card.title}</span>
            </div>
            <p className="opacity-50 my-2 max-md:hidden">{card.description}</p>
            <div className="flex justify-between items-center">
              <span className={cn("p-2 rounded-lg", card.className)}>
                {card.icon}
              </span>
              <div className="p-1 border rounded-full invisible group-hover:visible max-md:hidden">
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

const cards = [
  {
    title: "Talk to your PDF",
    icon: <FileText />,
    path: "/dashboard/pdf",
    description:
      " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum, numquam!",
    className: "text-violet-500 bg-violet-300/15",
  },
  {
    title: "Audio generation",
    icon: <Speech />,
    path: "/dashboard/audio-generation",
    description:
      " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum, numquam!",
    className: "text-green-500 bg-green-300/15",
  },
  {
    title: "Audio convertor",
    icon: <Music />,
    path: "/dashboard/audio-convertor",
    description:
      " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum, numquam!",
    className: "text-orange-500 bg-orange-300/15",
  },
];
