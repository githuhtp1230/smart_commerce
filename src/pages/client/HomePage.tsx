import CarouselProduct from "@/components/client/home/CarouselProduct";
import React from "react";

const HomePage = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="row-span-2">
          <CarouselProduct />
        </div>
        <div className="col-span-1">02</div>
        <div className="col-span-1">03</div>
      </div>
    </div>
  );
};

export default HomePage;
