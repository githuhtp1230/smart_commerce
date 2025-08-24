"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { IProductSummary } from "@/type/products";
import { fetchRandomProducts } from "@/services/products.service";

export default function CarouselProduct() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [products, setProducts] = React.useState<IProductSummary[]>([]);

  // Lấy sản phẩm random
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRandomProducts(5);
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm random:", error);
      }
    };
    fetchData();
  }, []);

  // Auto scroll
  React.useEffect(() => {
    if (!api) return;

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
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative w-full h-[400px] md:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden shadow-lg">
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={product.id || index}>
              <Card className="p-0 border-0 shadow-none">
                <CardContent className="relative w-full h-[400px] md:h-[480px] lg:h-[520px] p-0 cursor-pointer">
                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
                  />

                  {/* Overlay gradient chỉ phủ vùng tiêu đề */}
                  <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none rounded-b-xl" />

                  {/* Category badge */}
                  {product.category && (
                    <div className="absolute top-4 right-4 bg-blue-600/80 backdrop-blur-sm text-white text-xs md:text-sm font-medium px-3 py-1 rounded-full shadow">
                      {product.category.name}
                    </div>
                  )}

                  {/* Product info */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-lg md:text-xl font-semibold drop-shadow-md">
                      {product.name}
                    </h3>
                    {product.price && (
                      <p className="mt-1 text-base md:text-lg font-medium text-white">
                        {product.price.toLocaleString("vi-VN")}₫
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all",
              current === index + 1
                ? "bg-blue-500 scale-125 shadow-md"
                : "bg-gray-300 hover:bg-gray-400"
            )}
          />
        ))}
      </div>
    </div>
  );
}
