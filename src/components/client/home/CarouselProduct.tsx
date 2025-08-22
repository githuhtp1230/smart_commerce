import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function CarouselWithPagination() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const images = [
    "https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-4ba4-620a-9b7a-cc999892b9e9/raw?se=2025-08-22T17%3A27%3A34Z&sp=r&sv=2024-08-04&sr=b&scid=753efadd-4500-50f2-9e19-16f93b9884d6&skoid=5c72dd08-68ae-4091-b4e1-40ccec0693ae&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-22T12%3A31%3A19Z&ske=2025-08-23T12%3A31%3A19Z&sks=b&skv=2024-08-04&sig=L75b2s9q/cUN65gVL1HE%2BPnvlmKUyohBLKQsKWf/qqI%3D",
    "https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-a568-622f-a8a8-6bbe2ac2d720/raw?se=2025-08-22T17%3A32%3A05Z&sp=r&sv=2024-08-04&sr=b&scid=026d51d8-7c51-51f8-b694-17442e64837e&skoid=5c72dd08-68ae-4091-b4e1-40ccec0693ae&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-22T15%3A47%3A11Z&ske=2025-08-23T15%3A47%3A11Z&sks=b&skv=2024-08-04&sig=oto436jqYrSp%2B/hC5A7M9tGvHjrNhILXm4OWiVgoMYk%3D"


  ];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    const interval = setInterval(() => {
      const nextIndex = api.selectedScrollSnap() + 1;
      if (nextIndex < api.scrollSnapList().length) {
        api.scrollTo(nextIndex);
      } else {
        api.scrollTo(0); // quay về đầu
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <>

      <div className="w-full relative cursor-pointer">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <Card className="p-0">
                  <CardContent className="flex aspect-video items-center justify-center p-0">
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination dots */}
        <div className="mt-4 flex items-center justify-center gap-2 absolute bottom-3 left-1/2 -translate-x-[50%]">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-3.5 w-3.5 rounded-full border-2 transition-colors",
                current === index + 1
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-400"
              )}
            />
          ))}
        </div>
      </div>

    </>
  );
}
