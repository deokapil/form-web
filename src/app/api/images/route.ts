import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

export async function POST(req: Request) {
  const form = new formidable.IncomingForm();
  return new Response(JSON.stringify({ message: "Hello World" }));
}
