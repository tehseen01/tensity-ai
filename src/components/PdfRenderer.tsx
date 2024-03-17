"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  ChevronDown,
  ChevronUp,
  Expand,
  Loader2,
  RotateCw,
  Search,
} from "lucide-react";
import { Input } from "./ui/input";
import { useResizeDetector } from "react-resize-detector";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfRendererProps {
  url: string;
}

export const PdfRenderer = ({ url }: PdfRendererProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);

  const { width, ref } = useResizeDetector();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      <div className="pb-2 flex justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <Button className="size-8" size={"icon"} variant={"ghost"}>
            <ChevronUp size={18} />
          </Button>
          <div className="flex items-center justify-center gap-2">
            <Input
              value={currPage}
              className="w-10 h-8 py-1 px-2 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-white"
            />
            <span>/ {numPages}</span>
          </div>
          <Button className="size-8" size={"icon"} variant={"ghost"}>
            <ChevronDown size={18} />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button className="size-8" size={"icon"} variant={"ghost"}>
            <Search size={18} />
          </Button>
          <Button className="size-8" size={"icon"} variant={"ghost"}>
            <RotateCw size={18} />
          </Button>
          <Button className="size-8" size={"icon"} variant={"ghost"}>
            <Expand size={18} />
          </Button>
        </div>
      </div>
      <div className="h-[calc(100dvh_-_3.5rem)] overflow-y-auto" ref={ref}>
        <Document
          file={url}
          loading={
            <div className="flex items-center justify-center mt-28">
              <Loader2 className="animate-spin" />
            </div>
          }
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page width={width ? width : 1} pageNumber={currPage} />
        </Document>
      </div>
    </div>
  );
};
