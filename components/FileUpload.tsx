"use client";
import { useRef, useState } from "react";
import config from "@/lib/config";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  // type: "image" | "video";
  // accept: string;
  // placeholder: string;
  // folder: string;
  // variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  // value?: string;
}

const FileUpload = ({
  // type,
  // accept,
  // placeholder,
  // folder,
  // variant,
  onFileChange,
  // value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>();
  const [progress, setProgress] = useState(0);

  // const styles = {
  //   button:
  //     variant === "dark"
  //       ? "bg-dark-300"
  //       : "bg-light-600 border-gray-100 border",
  //   placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
  //   text: variant === "dark" ? "text-light-100" : "text-dark-400",
  // };

  const onError = (error: any) => {
    console.log(error);
    toast({
      title: `Image upload failed`,
      description: `Your image could not be uploaded. Please try again.`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `Image uploaded successfully`,
      description: `${res.filePath} uploaded successfully!`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        className="hidden"
        fileName="test-upload.png"
      />
      <button
        className={cn("upload-btn")}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className={cn("text-base")}>{"placeholder"}</p>

        {file && <p className={cn("upload-filename")}>{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default FileUpload;
