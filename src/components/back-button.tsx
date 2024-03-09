"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const { back } = useRouter();

  return (
    <Button variant={"ghost"} onClick={() => back()}>
      <ArrowLeft />
    </Button>
  );
};

export default BackButton;
