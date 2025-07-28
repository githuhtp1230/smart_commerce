import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { RiImageAddFill, RiImageAddLine } from "react-icons/ri";

interface Props {
  onSelectedFile?: (file: File) => void;
  className?: string;
  textClassName?: string;
  subTextClassName?: string;
  iconClassName?: string;
}

const DropZone = ({
  onSelectedFile,
  className,
  textClassName,
  subTextClassName,
  iconClassName,
}: Props) => {
  const handleSelectedFile = (file: File) => {
    onSelectedFile?.(file);
  };

  return (
    <Dropzone onDrop={(file) => handleSelectedFile(file[0])}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed border-border-primary rounded-sm h-full flex flex-col justify-center items-center cursor-pointer gap-2",
            className
          )}
        >
          <input {...getInputProps()} />
          <p className={cn("text-muted-foreground", textClassName)}>
            Drag your photo here or{" "}
            <span
              className={cn("hover:underline text-blue-400", subTextClassName)}
            >
              Browse form device
            </span>
          </p>
          <RiImageAddFill
            className={cn("text-muted-foreground size-18", iconClassName)}
          />
        </div>
      )}
    </Dropzone>
  );
};
export default DropZone;
