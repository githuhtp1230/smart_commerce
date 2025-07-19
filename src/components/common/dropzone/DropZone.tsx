import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { RiImageAddFill, RiImageAddLine } from "react-icons/ri";

interface Props {
  onSelectedFile?: (file: File) => void;
}

const DropZone = ({ onSelectedFile }: Props) => {
  const handleSelectedFile = (file: File) => {
    onSelectedFile?.(file);
  };

  return (
    <Dropzone onDrop={(file) => handleSelectedFile(file[0])}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-border-primary rounded-sm h-100 flex flex-col justify-center items-center cursor-pointer gap-2"
        >
          <input {...getInputProps()} />
          <p className="text-muted-foreground">
            Drag your photo here or{" "}
            <span className="text-blue-400 hover:underline">
              Browse form device
            </span>
          </p>
          <RiImageAddFill className="text-muted-foreground size-18" />
        </div>
      )}
    </Dropzone>
  );
};
export default DropZone;
