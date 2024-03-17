import Pricing from "@/components/pricing";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { InfiniteMovingCardsDemo } from "@/components/ui/infinite-moving-cards";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Transition from "@/components/ui/transition";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { AudioLines, FileAudio, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="md:mt-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full -z-10">
        <Image
          src={"/hero-circle.svg"}
          width={600}
          height={600}
          alt="header"
          className="w-full"
        />
      </div>
      <ContainerScroll>
        <div className="lg:w-9/12 md:w-10/12 w-11/12 mx-auto pt-28 relative space-y-4">
          <Transition initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h2 className="lg:text-6xl md:text-6xl sm:text-5xl text-4xl font-bold text-center">
              AI-Powered Productivity Suite: Unleash the Power of Information
            </h2>
          </Transition>
          <Transition initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <p className="text-center py-4 text-2xl text-white/40 lg:px-28 md:px-20 sm:px-16 px-4">
              Turn PDFs into insights, text into voices, and voices into text -
              effortlessly.
            </p>
          </Transition>
          <Transition initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <div className="flex items-center justify-center py-4">
              <SignedOut>
                <Button
                  className="uppercase"
                  variant={"outline"}
                  size={"lg"}
                  asChild
                >
                  <Link href={"/sign-up"}>Get Started</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button
                  asChild
                  variant={"outline"}
                  size={"lg"}
                  className="uppercase"
                >
                  <Link href={"/dashboard"}>Explore</Link>
                </Button>
              </SignedIn>
            </div>
          </Transition>
        </div>
      </ContainerScroll>
      <Transition>
        <p className="md:text-2xl text-xl md:w-2/3 max-md:px-4 mx-auto md:py-28 py-10 text-center text-white/50">
          Drowning in information? We get it. Text, audio, and PDFs can pile up{" "}
          <span className="text-white/90 font-semibold">quickly,</span>{" "}
          hindering your{" "}
          <span className="text-white/90 font-semibold">productivity</span> and
          making it difficult to extract the information you need. Here&apos;s
          where our AI-powered suite comes in,{" "}
          <span className="text-white/90 font-semibold">transforming</span> your
          workflow with intelligent tools that make accessing information{" "}
          <span className="text-white/90 font-semibold">faster</span> and easier
          than ever.
        </p>
      </Transition>
      <div className="flex items-center justify-center flex-col gap-4 py-10">
        <Transition>
          <span className="text-cyan-400 text-xl">AI Solution</span>
        </Transition>
        <Transition className="w-full">
          <h4
            className="md:text-6xl text-4xl
            md:w-1/2 mx-auto text-center font-bold"
          >
            Chat Smarter, Not Harder with TensityAI
          </h4>
        </Transition>
      </div>
      <StickyScroll content={solutionSlides} />
      <Pricing />
      <div className="py-8 md:pt-16">
        <h5 className="text-4xl text-center">What the community is saying</h5>
      </div>
      <InfiniteMovingCardsDemo />
    </main>
  );
}

const solutionSlides = [
  {
    icon: <FileText />,
    title: "Talk to PDF",
    description:
      "* Ask questions, get answers: Upload a PDF and our AI will analyze the content, allowing you to ask natural language questions and receive precise answers in seconds.  * Save time and effort: Skip skimming through pages. Get straight to the information you need, saving valuable time and boosting your efficiency.",
    content: (
      <Image
        src={"/feature-1.jpg"}
        width={500}
        height={500}
        alt="talk to pdf"
        loading="lazy"
        className="object-cover w-full h-full"
      />
    ),
  },
  {
    icon: <AudioLines />,
    title: "Text to speech",
    description:
      "* Listen while you work: Convert any text into high-quality, natural-sounding speech. Listen on the go, during commutes, or while multitasking. * Improve accessibility: Enhance the accessibility of your content for individuals with visual impairments or learning difficulties.",
    content: (
      <Image
        src={"/speech.jpg"}
        width={500}
        height={500}
        alt="talk to pdf"
        loading="lazy"
        className="object-cover w-full h-full"
      />
    ),
  },
  {
    icon: <FileAudio />,
    title: "Speech to text",
    description:
      "* Speak your mind, see it typed: Dictate your thoughts, ideas, or notes and watch them effortlessly convert into accurate text. * Boost productivity: Capture your ideas on the fly with voice dictation, saving precious time and keeping your workflow uninterrupted.",
    content: (
      <Image
        src={"/feature-3.jpg"}
        width={500}
        height={500}
        alt="talk to pdf"
        loading="lazy"
        className="object-cover w-full h-full"
      />
    ),
  },
];
