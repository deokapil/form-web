"use client";

import { getSignature } from "@/app/_actions";
import { Loader } from "lucide-react";
import { useState } from "react";

type Props = {
  setPhoto: (photo: string) => void;
};

const CloudinaryUploadForm = ({ setPhoto }: Props) => {
  const [loading, setLoading] = useState(false);
  const fileChanged = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const selectedFile = files[0];
      // upload files to cloudinary and return public url
      setLoading(true);
      console.log("one");
      // const allowedTypes = ["image/jpeg", "image/png"];
      // if (!allowedTypes.includes(selectedFile.type)) {
      // ("Only JPEG, PNG, and GIF images are allowed.");
      const file = files[0];
      if (!file) return;
      console.log("two");

      // get a signature using server action
      const { timestamp, signature } = await getSignature();
      if (
        !timestamp ||
        !signature ||
        !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
      ) {
        setLoading(false);
        return;
      }

      // upload to cloudinary using the signature
      const formData = new FormData();

      formData.append("file", file);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      formData.append("signature", signature);
      formData.append("timestamp", `${timestamp}`);
      formData.append("folder", "next");

      console.log("threee");
      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
      if (!endpoint) {
        return;
      }
      const data = await fetch(endpoint, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      console.log(data);
      setLoading(false);
      setPhoto(data.secure_url);
      return;
      // }
      // setImage({
      //   file: selectedFile,
      //   preview: URL.createObjectURL(selectedFile),
      // });
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <p>
          <input type="file" name="photo" onChange={fileChanged} />
        </p>
      )}
    </>
  );
};

export default CloudinaryUploadForm;
