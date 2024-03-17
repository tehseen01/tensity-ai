"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { File, Loader2 } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";

const Page = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const { toast } = useToast();

  const handleUploadFile = async (acceptedFile: any) => {
    try {
      setIsUploading(true);
      const startProgress = handleUploadProgress();

      if (!acceptedFile) return;

      const formData = new FormData();
      formData.append("file", acceptedFile);

      const response = await axios.post("/api/upload", formData);

      clearInterval(startProgress);
      setUploadingProgress(100);

      return toast({
        title: "Upload Success",
        description: response.data,
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      return toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleUploadProgress = () => {
    setUploadingProgress(0);

    const interval = setInterval(() => {
      setUploadingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <div className="flex items-center justify-center flex-col h-full">
      <p className="text-4xl">Start New Chat</p>
      <Dropzone
        multiple={false}
        onDrop={async (acceptedFile) => {
          await handleUploadFile(acceptedFile[0]);
        }}
        accept={{ "application/pdf": [".pdf"] }}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <div
            {...getRootProps()}
            className="h-60 md:w-1/2 border border-dashed my-8 p-2 rounded-xl grid place-items-center"
          >
            <input {...getInputProps()} />

            <div className="flex items-center flex-col justify-center gap-4">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-cloud-upload"
                >
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M12 12v9" />
                  <path d="m16 16-4-4-4 4" />
                </svg>
              </span>
              <p className="text-center text-white/70">
                <span className="font-bold text-white/90">Click to upload</span>{" "}
                or drag & drop
                <br /> PDF (upto 5mb)
              </p>
              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-secondary flex items-center rounded-md overflow-hidden divide-x divide-background">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <File className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}
              {isUploading ? (
                <div className="w-full">
                  <Progress value={uploadingProgress} className="w-full h-3" />
                  {uploadingProgress === 100 ? (
                    <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </Dropzone>

      <div>
        <Button variant={"secondary"}>Upload from URL</Button>
      </div>
    </div>
  );
};

export default Page;
