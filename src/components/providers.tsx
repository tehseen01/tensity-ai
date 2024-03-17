"use client";

import React, { ReactNode, useEffect } from "react";
import { ThemeProvider } from "./theme-provider";
import axios from "axios";
import { useSubscription } from "@/lib/store";
import { Toaster } from "./ui/toaster";

const Providers = ({ children }: { children: ReactNode }) => {
  const { setSubscription } = useSubscription();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/user/subscription");
        setSubscription(data.subscription);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
