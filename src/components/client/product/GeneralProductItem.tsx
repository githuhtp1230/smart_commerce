import { RatingFilter } from "@/components/modules/RatingFilter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import React from "react";

const GeneralProductItem = () => {
  return (
    <div>
      <img
        src="null"
        className="h-65 border border-border-primary rounded-lg"
      />
      <div className="py-2">
        <h1 className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
          necessitatibus.
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground mt-2">
          <RatingFilter />
          <p className="text-xs">( 32 people rated )</p>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center gap-2">
            <p className="line-through font-light text-txt-secondary">$32</p>
            <p className="font-semibold text-3xl">$18</p>
          </div>
          <Button className="bg-blue-400 hover:bg-blue-400">
            <ShoppingCart />
            <span className="text-sm">Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneralProductItem;
