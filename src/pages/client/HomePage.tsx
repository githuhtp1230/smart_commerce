import CarouselProduct from "@/components/client/home/CarouselProduct";
import ProductGrid from "@/components/client/home/ProductGrid";
import ServiceFeatures from "@/components/client/home/ServiceFeatures";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="row-span-2 h-full">
          <CarouselProduct />
        </div>
        <div className="row-span-1 cursor-pointer">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/smart-commerce-banner-4-xyEefWT3pd51nfUkE438DCKDjfgdpz.png"
            alt=""
            className="rounded-lg h-full"
          />
        </div>
        <div className="row-span-1 cursor-pointer">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/smart-commerce-banner-5-Uv0E6TQSWhf1tRjbESWkkvX8yTTX2a.png"
            alt=""
            className="rounded-lg h-full"
          />
        </div>
        <div className="lg:col-span-2">
          <ProductGrid />
        </div>
        <div className="lg:col-span-2">
          <ServiceFeatures />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
