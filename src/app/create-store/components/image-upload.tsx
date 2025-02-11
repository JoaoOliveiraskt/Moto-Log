import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, ImagePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: File | string;
  onChange: (file?: File) => void;
  onError?: (error: string) => void;
  label?: string;
  maxSize?: number;
  imageType: "profile" | "banner";
  className?: string;
  previewClassName?: string;
  error?: string;
  optional?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onError,
  label,
  maxSize = 5 * 1024 * 1024,
  imageType,
  className,
  previewClassName,
  error,
  optional,
}: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === "file-too-large") {
          const maxSizeMB = maxSize / (1024 * 1024);
          onError?.(`File too large. Maximum allowed: ${maxSizeMB}MB`);
          onChange(undefined);
        } else if (error.code === "file-invalid-type") {
          onError?.("Invalid file format. Use JPEG, PNG or WebP");
          onChange(undefined);
        }
        return;
      }

      if (acceptedFiles?.[0]) {
        onError?.("");
        onChange(acceptedFiles[0]);
      }
    },
    [onChange, onError, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxSize,
    onDrop,
    multiple: false,
  });

  const previewUrl = value instanceof File ? URL.createObjectURL(value) : value;

  const height = imageType === "profile" ? "h-32" : "h-40";
  const width =
    imageType === "profile" ? "w-32 rounded-full" : "w-full rounded-2xl";

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center gap-x-1">
          <Label>
            {label}
            {optional && (
              <span className="text-muted-foreground"> (opcional)</span>
            )}
          </Label>
        </div>
      )}

      <div
        {...getRootProps()}
        className={cn(
          className,
          height,
          width,
          "relative cursor-pointer border-2 border-dashed",
          "flex items-center justify-center",
          isDragActive ? "border-primary" : "border-muted-foreground/25",
          error ? "border-destructive" : ""
        )}
      >
        <input {...getInputProps()} />

        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className={cn("object-cover", previewClassName)}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onError?.("");
                onChange(undefined);
              }}
              className="absolute top-2 right-2 p-1 bg-destructive rounded-full hover:bg-destructive/90"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImagePlus className="h-8 w-8" />
            <p className="text-xs text-center">
              Arraste ou clique para fazer upload
            </p>
          </div>
        )}
      </div>
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}
