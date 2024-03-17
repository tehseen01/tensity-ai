import { PdfRenderer } from "@/components/PdfRenderer";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";

import { Mic } from "lucide-react";

const Page = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-4 px-4 py-2 md:hidden">
        <Button className="w-full" variant={"ghost"}>
          Chats
        </Button>
        <Button className="w-full" variant={"secondary"}>
          Documents
        </Button>
      </div>
      <div className="flex h-dvh items-center justify-center max-md:flex-col">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="p-2" minSize={10}>
            <PdfRenderer url="/resume.pdf" />
          </ResizablePanel>
          <ResizableHandle withHandle className="w-1 max-md:hidden" />
          <ResizablePanel
            className="p-2 flex flex-col max-md:hidden"
            minSize={10}
          >
            <div className="h-full mb-2">Chats</div>
            <div className="mt-auto w-full border rounded-xl flex items-center p-2 gap-4">
              <Textarea placeholder="Ask me anything" />
              <div>
                <Button size={"icon"} variant={"secondary"}>
                  <Mic />
                </Button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Page;
