import { AppBadge } from "@/components/common/AppBadge";
import PurchaseButton from "@/components/common/button/PurchaseButton";
import QuantityButton from "@/components/common/button/QuantityButton";
import AttributeChecked from "@/components/common/checked/AttributeChecked";
import { RatingFilter } from "@/components/common/RatingFilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatUtcToVietnamDate } from "@/helper/format-utc-to-vietnam-date";
import { getTimeRemaining } from "@/helper/get-time-remaining";
import type { IProductDetail } from "@/type/products";
import { ShoppingCart } from "lucide-react";
import React, { use, useEffect, useMemo, useState } from "react";
import {
  getProductVariation,
  groupVariationAttribute,
} from "./product-detail-helper";
import type { IAttributeValue } from "@/type/attribute";

interface Props {
  productDetail?: IProductDetail;
}

const ProductDetailInformation = ({ productDetail }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAttrValIds, setSelectedAttrValIds] = useState<Set<number>>(
    new Set()
  );
  const [isClickedAttributeVal, setIsClickedAttributeVal] = useState(false);

  const attributeGroups = useMemo(() => {
    return Object.entries(
      groupVariationAttribute(productDetail?.variations || [])
    );
  }, [productDetail?.variations]);

  const selectedVariation = useMemo(() => {
    return getProductVariation(
      [...selectedAttrValIds],
      productDetail?.variations ?? []
    );
  }, [productDetail?.variations, selectedAttrValIds]);

  const salePrice = useMemo(() => {
    return productDetail?.promotion && selectedVariation
      ? selectedVariation.price *
          (1 - productDetail.promotion.discountValuePercent / 100)
      : undefined;
  }, [selectedVariation]);

  const handleCheckedAttrVal = (attrValParam: IAttributeValue) => {
    const newSelectedAttrValIds = new Set<number>(selectedAttrValIds);
    let isDeleteOldChecked = false;
    attributeGroups.forEach(([_, attrValSet]) => {
      if (!isDeleteOldChecked) {
        attrValSet.forEach((attrVal) => {
          if (
            selectedAttrValIds.has(attrVal.id) &&
            attrVal.attribute.name === attrValParam.attribute.name
          ) {
            newSelectedAttrValIds.delete(attrVal.id);
            isDeleteOldChecked = true;
          }
        });
      }
    });
    newSelectedAttrValIds.add(attrValParam.id);
    setSelectedAttrValIds(newSelectedAttrValIds);
  };

  const handleBuyNow = () => {};

  useEffect(() => {
    const defaultAttrIds = attributeGroups
      .map(([_, attrValMap]) => {
        console.log(attrValMap);
        return attrValMap.get(0)?.id;
      })
      .filter((id): id is number => id !== undefined);

    setSelectedAttrValIds(new Set(defaultAttrIds));
  }, [attributeGroups]);

  return (
    <div className="flex-1">
      <div className="space-y-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {productDetail?.name}
          </h1>
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-1">
              <p>{productDetail?.averageRating}</p>
              <RatingFilter averageRating={productDetail?.averageRating} />
            </div>
            <span className="text-2xl text-border-primary">|</span>
            <div className="flex items-center gap-1">
              <p>{productDetail?.reviewCount}</p>
              <p className="text-muted-foreground">ratings</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <AppBadge badgeColor="green" content="In stock" />
            <span className="text-sm text-muted-foreground">
              {`Release on ${
                productDetail?.createdAt &&
                formatUtcToVietnamDate(productDetail?.createdAt)
              }`}
            </span>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-foreground">
              {salePrice ?? selectedVariation?.price}VNĐ
            </span>
            {salePrice && (
              <span className="text-lg text-muted-foreground line-through ml-2">
                {selectedVariation?.price}VNĐ
              </span>
            )}
            {salePrice && (
              <Badge
                variant="secondary"
                className="ml-3 bg-orange-100 text-orange-800 text-xl"
              >
                {productDetail?.promotion?.description}
              </Badge>
            )}
          </div>
          {productDetail?.promotion && (
            <p className="text-sm text-orange-700 font-medium mt-2">
              Special offer ends in{" "}
              {getTimeRemaining(productDetail?.promotion?.endDate)}
            </p>
          )}
        </div>
        {attributeGroups.map(([attributeName, attrMap]) => {
          return (
            <div className="flex items-center gap-8" key={attributeName}>
              <span className="text-txt-secondary">{attributeName}</span>
              <div className="flex gap-2">
                {[...attrMap].map(([attrValId, attrVal]) => {
                  return (
                    <AttributeChecked
                      key={attrValId}
                      name={attrVal.value}
                      onCheckedChanged={(_) => handleCheckedAttrVal(attrVal)}
                      checked={selectedAttrValIds.has(attrVal.id)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
        <div>
          <h3 className="text-base text-txt-secondary">Quantity:</h3>
          <div className="flex items-center mt-2 gap-3">
            <QuantityButton
              action={"decrease"}
              onClick={() => setQuantity((pre) => pre - 1)}
              disabled={quantity == 1}
            />
            <span className="text-foreground text-sm">{quantity}</span>
            <QuantityButton
              action={"increase"}
              onClick={() => setQuantity((pre) => pre + 1)}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <PurchaseButton
            className="min-w-40"
            message="Add to cart"
            variant="outline"
            icon={ShoppingCart}
          />
          <PurchaseButton
            message="Buy now"
            variant="default"
            className="min-w-40"
            onClick={handleBuyNow}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInformation;
