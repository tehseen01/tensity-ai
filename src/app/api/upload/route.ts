import { uploadFileToCloudinary } from "@/lib/cloudinary";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) throw new Error("Unauthorized user");

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file)
      return NextResponse.json({ error: "File not found" }, { status: 404 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = file.name.toLowerCase().replaceAll(/\s/g, "-");

    await uploadFileToCloudinary(fileName, buffer, "/tensity-ai");

    return NextResponse.json("File uploaded successfully!", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response("Upload Error: " + error.message, { status: 501 });
  }
}
