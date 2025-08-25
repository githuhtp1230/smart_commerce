import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import DropZone from "@/components/common/dropzone/DropZone";
import { toastError } from "@/components/common/sonner";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Props {
  onChangeValue?: (files: File[]) => void;
}

const AddImageCarousel = ({ onChangeValue }: Props) => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toastError("Vui lòng chọn file ảnh");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toastError("File ảnh quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
      return;
    }

    try {
      const preview = await convertToBase64(file);
      setImages((prev) => [...prev, { file, preview }]);
      onChangeValue?.([...images.map((img) => img.file), file]);
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    onChangeValue?.(images.map((img) => img.file));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">
          {images.length}/10 ảnh đã chọn
        </span>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mt-3"
      >
        <CarouselContent className="w-full">
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "basis-1/7 pl-2 box-content",
                index === 0 && "pl-4"
              )}
            >
              <Card className="p-0 border-none relative group">
                <CardContent className="flex aspect-square items-center justify-center p-0 size-full">
                  <img
                    className={cn(
                      "size-full object-cover object-center rounded-lg border-3"
                    )}
                    src={img.preview}
                    alt=""
                  />
                  <Button
                    onClick={() => handleRemoveImage(index)}
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-red-500 text-white flex items-center justify-center text-xs hover:!bg-red-600 transition-colors opacity-0 group-hover:opacity-100 h-auto rounded-full size-6"
                  >
                    <X className="size-3" />
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
          {images.length < 10 ? (
            <CarouselItem
              className={cn(
                "basis-1/7 pl-2 box-content",
                images.length === 0 && "pl-4"
              )}
            >
              <Card className="p-0 border-none cursor-pointer">
                <CardContent className="flex aspect-square items-center justify-center p-0 size-full">
                  <DropZone
                    onSelectedFile={handleFileSelect}
                    textClassName="text-xs text-center"
                    subTextClassName="text-xs"
                    iconClassName="size-8"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ) : (
            <CarouselItem className="basis-1/7 pl-2 box-content">
              <Card className="p-0 border-none">
                <CardContent className="flex aspect-square items-center justify-center p-0 size-full">
                  <div className="text-center text-muted-foreground">
                    <p className="text-sm">Đã đủ ảnh</p>
                    <p className="text-xs">(Tối đa 10 ảnh)</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-1/2 !bg-primary opacity-80" />
        <CarouselNext className="right-0 translate-x-1/2 !bg-primary opacity-80" />
      </Carousel>
    </div>
  );
};

export default AddImageCarousel;
