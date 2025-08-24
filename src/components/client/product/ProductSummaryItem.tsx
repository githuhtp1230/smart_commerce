import { RatingFilter } from "@/components/common/RatingFilter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PATH } from "@/constants/path";
import type { IProductSummary } from "@/type/products";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/helper/format-price-vietnam";
import { cn } from "@/lib/utils";

interface Props {
  product: IProductSummary;
  className?: string;
  priceContainerClassName?: string;
}

const ProductSummaryItem = ({ product, className, priceContainerClassName }: Props) => {
  const salePrice = product.promotion && product.price
    ? product.price * (1 - product.promotion.discountValuePercent / 100)
    : undefined;

  return (
    <Link to={`${PATH.PRODUCTS}/${product.id}`}>
      <Card className={cn("bg-primary shadow-xs p-4 gap-0 group", className)}>
        <div className="relative w-full h-48  dark:bg-white flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full transition-all duration-300 group-hover:scale-110"
          />
        </div>
        <div className="mt-3 px-2">
          <h1 className="text-lg font-medium">
            <div
              className="font-semibold text-base text-gray-900 dark:text-white group-hover:text-blue-400 transition-colors"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block"
              }}
              title={product.name}
            >
              {product.name}
            </div>
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-2">
            <RatingFilter
              className="pointer-events-none"
              averageRating={product.averageRating}
            />
            <p className="text-sm">( {product.reviewCount} people rated )</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className={cn("flex items-center gap-2", priceContainerClassName)}>
              {salePrice && (
                <p className="line-through font-light text-txt-secondary">
                  {formatPrice(product.price)} ₫
                </p>
              )}
              <h1 className="font-semibold text-xl">
                {formatPrice(salePrice ?? product.price)} ₫
              </h1>
            </div>
            <Button className="bg-blue-400 hover:bg-blue-400 size-8">
              <ShoppingCart className="text-white" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductSummaryItem;
