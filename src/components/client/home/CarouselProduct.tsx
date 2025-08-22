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
    "https://www.cnet.com/a/img/resize/15fef67176bef6c5179128b6f877d7d96338b9c3/hub/2024/09/18/f4dfbd54-08f9-42cc-9309-1c3923a06558/iphone-16-plus-pro-pro-max-family-4559.jpg?auto=webp&fit=crop&height=900&width=1200",
    "https://www.cnet.com/a/img/resize/15fef67176bef6c5179128b6f877d7d96338b9c3/hub/2024/09/18/f4dfbd54-08f9-42cc-9309-1c3923a06558/iphone-16-plus-pro-pro-max-family-4559.jpg?auto=webp&fit=crop&height=900&width=1200",
    "https://www.cnet.com/a/img/resize/15fef67176bef6c5179128b6f877d7d96338b9c3/hub/2024/09/18/f4dfbd54-08f9-42cc-9309-1c3923a06558/iphone-16-plus-pro-pro-max-family-4559.jpg?auto=webp&fit=crop&height=900&width=1200",
    "https://www.cnet.com/a/img/resize/15fef67176bef6c5179128b6f877d7d96338b9c3/hub/2024/09/18/f4dfbd54-08f9-42cc-9309-1c3923a06558/iphone-16-plus-pro-pro-max-family-4559.jpg?auto=webp&fit=crop&height=900&width=1200",
    "https://www.cnet.com/a/img/resize/15fef67176bef6c5179128b6f877d7d96338b9c3/hub/2024/09/18/f4dfbd54-08f9-42cc-9309-1c3923a06558/iphone-16-plus-pro-pro-max-family-4559.jpg?auto=webp&fit=crop&height=900&width=1200"
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
