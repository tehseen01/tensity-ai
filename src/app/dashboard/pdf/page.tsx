import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";

export const PdfPage = () => {
  return (
    <div className="flex h-dvh items-center justify-center">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="p-2" minSize={10}>
          hello
        </ResizablePanel>
        <ResizableHandle withHandle className="w-1" />
        <ResizablePanel className="p-2">there</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
