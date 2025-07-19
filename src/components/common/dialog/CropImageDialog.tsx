import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DropZone from "../dropzone/DropZone";
import setCanvasPreview from "@/helper/set-canvas-preview";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import { toastError } from "../sonner";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onCompletedCropImage: (image: string, file: File) => void;
}

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;
const MAX_WIDTH = 1580;
const MAX_HEIGHT = 720;

const CropImageDialog = ({
  isOpen,
  setIsOpen,
  onCompletedCropImage,
}: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop | null>({
    unit: "%",
    x: 0,
    y: 0,
    width: 30,
    height: 30,
  });

  const onSelectFile = (file: File) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;

      image.onload = () => {
        const width = image.naturalWidth;
        const height = image.naturalHeight;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          toastError(
            `Ảnh vượt quá kích thước tối đa ${MAX_WIDTH}x${MAX_HEIGHT}px`
          );
          return;
        }
        setImgSrc(image.src);
      };
    };

    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const initialCrop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );

    const centered = centerCrop(initialCrop, width, height);
    setCrop(centered);
  };

  const handleCrop = () => {
    const img = imgRef.current;
    const canvas = previewCanvasRef.current;

    if (!img || !canvas || !crop) return;

    const pixelCrop = convertToPixelCrop(crop, img.width, img.height);

    setCanvasPreview(img, canvas, pixelCrop);
    const dataUrl = canvas.toDataURL();
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "avatar.png", { type: blob.type });
      onCompletedCropImage(dataUrl, file);
      reset();
    });
  };

  const reset = () => {
    setImgSrc("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crop Avatar</DialogTitle>
        </DialogHeader>
        {imgSrc && crop ? (
          <div className="flex flex-col items-center">
            <ReactCrop
              crop={crop}
              onChange={(updatedCrop) => {
                if (
                  updatedCrop.x !== undefined &&
                  updatedCrop.y !== undefined &&
                  updatedCrop.width !== undefined &&
                  updatedCrop.height !== undefined
                ) {
                  setCrop(updatedCrop);
                }
              }}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
              className="h-full"
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Uploaded"
                className="h-full"
                onLoad={onImageLoad}
              />
            </ReactCrop>

            <div className="flex gap-2 justify-center mt-4">
              <Button
                variant="outline"
                className="font-mono text-xs py-2 px-4 rounded-2xl border-border-primary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className="font-mono text-xs py-2 px-4 rounded-2xl bg-red-500 dark:bg-red-500 hover:bg-red-400 hover:dark:bg-red-400 text-white hover:text-white"
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </Button>
              <Button
                className="text-white font-mono text-xs py-2 px-4 rounded-2xl bg-sky-500 hover:bg-sky-400"
                onClick={handleCrop}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <DropZone onSelectedFile={onSelectFile} />
        )}

        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            width: 150,
            height: 150,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CropImageDialog;
