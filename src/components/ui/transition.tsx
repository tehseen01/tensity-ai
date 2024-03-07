"use client";

import { MotionProps, motion as m } from "framer-motion";
import { ReactNode } from "react";

interface TransitionProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

const Transition = (props: TransitionProps) => {
  const { children, className, initial, whileInView, transition, ...rest } =
    props;

  return (
    <m.div
      initial={initial || { opacity: 0.5, y: 50 }}
      whileInView={whileInView || { opacity: 1, y: 0 }}
      transition={
        transition || {
          delay: 0.1,
          duration: 1,
          ease: "easeInOut",
        }
      }
      viewport={{ once: true }}
      {...rest}
      className={className}
    >
      {children}
    </m.div>
  );
};

export default Transition;
