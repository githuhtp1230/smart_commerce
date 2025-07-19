import React, { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toastError, toastSuccess } from "@/components/common/sonner";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface AvatarEditorProps {
  avatarUrl: string | null;
  userName: string | null | undefined;
  onAvatarChange: (newAvatarUrl: string) => void;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({
  avatarUrl,
  userName,
  onAvatarChange,
}) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop | undefined>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (!validTypes.includes(file.type)) {
        toastError("Please select a JPEG or PNG image");
        return;
      }
      if (file.size > maxSize) {
        toastError("Image size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImageSrc(reader.result?.toString() || null)
      );
      reader.readAsDataURL(file);
      setIsImageDialogOpen(true);
    }
  };


  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        1,
        width,
        height
      ),
      width,
      height
    );
    setCrop(crop);
  };

  const getCroppedImg = async (): Promise<string | null> => {
    if (!completedCrop || !imgRef.current) {
      toastError("Please crop the image before saving");
      return null;
    }

    try {
      const image = imgRef.current;
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob from canvas"));
              return;
            }
            const url = URL.createObjectURL(blob);
            resolve(url);
          },
          "image/jpeg",
          0.9 
        );
      });
    } catch (error) {
      console.error("Crop error:", error);
      toastError("Failed to process image: " + (error as Error).message);
      return null;
    }
  };

  const handleImageSave = async () => {
    const croppedImageUrl = await getCroppedImg();
    if (croppedImageUrl) {
      onAvatarChange(croppedImageUrl);
      setIsImageDialogOpen(false);
      setImageSrc(null);
      setCrop(undefined);
      setCompletedCrop(null);
      toastSuccess("Image cropped and displayed successfully");
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-40 w-40">
        <AvatarImage
          src={
            avatarUrl ||
            "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20smiling%20Asian%20man%20in%20his%2030s%20wearing%20a%20light%20blue%20button-up%20shirt%20against%20a%20neutral%20dark%20green%20background%2C%20business%20headshot%20with%20soft%20lighting%2C%20high%20quality%20professional%20photo&width=300&height=300&seq=1&orientation=squarish"
          }
          alt={userName || "User"}
        />
        <AvatarFallback className="text-2xl">
          {userName?.slice(0, 2).toUpperCase() || "AL"}
        </AvatarFallback>
      </Avatar>
      <button
        id="editAvatarBtn"
        className="absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        onClick={() => inputRef.current?.click()}
      >
        <Pencil className="w-4 h-4 text-gray-600" />
      </button>
      <input
        type="file"
        accept="image/jpeg,image/png"
        ref={inputRef}
        className="hidden"
        onChange={onSelectFile}
      />
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Profile Picture</DialogTitle>
          </DialogHeader>
          {imageSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={onImageLoad}
                style={{ maxHeight: "500px", width: "100%" }}
              />
            </ReactCrop>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsImageDialogOpen(false);
                setImageSrc(null);
                setCrop(undefined);
                setCompletedCrop(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleImageSave}
              disabled={!completedCrop}
              className="bg-blue-500 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AvatarEditor;
