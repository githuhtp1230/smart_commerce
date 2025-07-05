import { AppBadge } from "@/components/common/AppBadge";
import PurchaseButton from "@/components/common/button/PurchaseButton";
import QuantityButton from "@/components/common/button/QuantityButton";
import AttributeChecked from "@/components/common/checked/AttributeChecked";
import { RatingFilter } from "@/components/common/RatingFilter";
import { formatUtcToVietnamDate } from "@/helper/format-utc-to-vietnam-date";
import { getTimeRemaining } from "@/helper/get-time-remaining";
import type { IProductDetail } from "@/type/products";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import useProductDetail from "./product-detail-helper/use-product-detail";
import { Badge } from "@/components/ui/badge";

interface Props {
  productDetail?: IProductDetail;
}

const ProductDetailInformation = ({ productDetail }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);

  const {
    attributeGroups,
    selectedProductVariation,
    validSelectAttrValIds,
    setProductDetail,
    isCheckedAttrVal,
    handleSelectAttrVal,
    salePrice,
  } = useProductDetail();

  useEffect(() => {
    setProductDetail(productDetail);
  }, [productDetail]);

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
              $
              {salePrice ??
                selectedProductVariation?.price ??
                productDetail?.price}
            </span>
            {salePrice && (
              <span className="text-lg text-muted-foreground line-through ml-2">
                ${selectedProductVariation?.price}
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
          {/* {selectedProductVariation?.price} */}
          {productDetail?.promotion && (
            <p className="text-sm text-orange-700 font-medium mt-2">
              Special offer ends in{" "}
              {getTimeRemaining(productDetail?.promotion?.endDate)}
            </p>
          )}
        </div>
        {attributeGroups.map(([attrName, attrVals]) => {
          return (
            <div className="flex items-center gap-8" key={attrName}>
              <span className="text-txt-secondary">{attrName}</span>
              <div className="flex gap-2">
                {[...attrVals].map((attrVal) => {
                  return (
                    <AttributeChecked
                      key={attrVal.id}
                      name={attrVal.value}
                      onCheckedChanged={() => handleSelectAttrVal(attrVal)}
                      checked={isCheckedAttrVal(attrVal)}
                      disabled={
                        validSelectAttrValIds.size > 0 &&
                        !validSelectAttrValIds.has(attrVal.id)
                      }
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
            // onClick={handleBuyNow}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInformation;
