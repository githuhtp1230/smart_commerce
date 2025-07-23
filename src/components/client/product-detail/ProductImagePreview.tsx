import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Props {
  image?: string;
  images: string[];
  onSelectImage?: (image: string) => void;
}

const ProductImagePreview = ({ images, image, onSelectImage }: Props) => {
  return (
    <div className="w-[40%] ">
      <div className="h-96 flex justify-center items-center ">
        {image || images[0] ? (
          <img
            className="w-full h-full object-contain object-center"
            src={image || images[0]}
          />
        ) : (
          <p className="text-sm text-muted-foreground">NONE IMAGE</p>
        )}
      </div>
      {images.length > 1 && (
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
                  "basis-1/5 pl-2 box-content",
                  index === 0 && "pl-4"
                )}
              >
                <Card
                  className="p-0 border-none cursor-pointer"
                  onClick={() => onSelectImage?.(img)}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-0 size-full">
                    <img
                      className={cn(
                        "size-full object-cover object-center rounded-lg border-3",
                        image === img
                          ? "border-border-brand"
                          : "border-transparent"
                      )}
                      src={img}
                      alt=""
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2 !bg-primary opacity-80" />
          <CarouselNext className="right-0 translate-x-1/2 !bg-primary opacity-80" />
        </Carousel>
      )}
    </div>
  );
};

export default ProductImagePreview;
