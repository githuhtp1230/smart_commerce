import { RatingFilter } from "@/components/common/RatingFilter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import type { IProductSummary } from "@/type/products";
import { ShoppingCart, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  product: IProductSummary;
}

const ProductSummaryItem = ({ product }: Props) => {
  const salePrice = product.promotion
    ? product.price * (product.promotion?.discountValuePercent / 100)
    : undefined;

  return (
    <Link to={`${PATH.PRODUCTS}/${product.id}`} className="group">
      <Card className="bg-primary shadow-xs p-0">
        <img src={product.image} className="h-50 rounded-lg" />
        <div className="p-3">
          <h1 className="text-base group-hover:text-blue-400">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-2">
            <RatingFilter />
            <p className="text-sm">( {product.reviewCount} people rated )</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              {salePrice && (
                <p className="line-through font-light text-txt-secondary">
                  {product.price}đ
                </p>
              )}
              <h1 className="font-semibold text-3xl">
                {salePrice ?? product.price}đ
              </h1>
            </div>
            <Button className="bg-blue-400 hover:bg-blue-400">
              <ShoppingCart className="text-white" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductSummaryItem;
