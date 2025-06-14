import { RatingFilter } from "@/components/modules/RatingFilter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { IProductSummary } from "@/type/products";
import { ShoppingCart, X } from "lucide-react";
import React from "react";

interface Props {
  product: IProductSummary;
}

const ProductSummaryItem = ({ product }: Props) => {
  return (
    <div>
      <img
        src="null"
        className="h-65 border border-border-primary rounded-lg"
      />
      <div className="py-2">
        <h1 className="text-sm">{product.name}</h1>
        <div className="flex items-center gap-2 text-muted-foreground mt-2">
          <RatingFilter />
          <p className="text-xs">( {product.reviewCount} people rated )</p>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center gap-2">
            <p
              className={cn(
                !product.discountedPrice
                  ? "font-semibold text-3xl"
                  : "line-through font-light text-txt-secondary"
              )}
            >
              ${product.price}
            </p>
            {product.discountedPrice && (
              <p className="font-semibold text-3xl">
                ${product.discountedPrice}
              </p>
            )}
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

export default ProductSummaryItem;
