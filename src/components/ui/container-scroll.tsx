"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Transition from "./transition";

export const ContainerScroll = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1, 1.05];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());

  return (
    <div
      className="flex items-center justify-center relative p-2"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "1200px",
        }}
      >
        {children}
        <ScrollCard rotate={rotate} scale={scale} />
      </div>
    </div>
  );
};

export const ScrollCard = ({ rotate, scale }: { rotate: any; scale: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2,
        duration: 1,
        ease: "easeInOut",
      }}
      viewport={{ once: true }}
      style={{
        rotateX: rotate, // rotate in X-axis
        scale,
      }}
      className="max-w-6xl mx-auto h-[30rem] md:h-[40rem] w-full border-2 border-[#6C6C6C] p-6 bg-secondary rounded-xl shadow-2xl mt-16"
    ></motion.div>
  );
};
