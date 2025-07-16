import { AppBadge } from "@/components/common/AppBadge";
import PurchaseButton from "@/components/common/button/PurchaseButton";
import QuantityButton from "@/components/common/button/QuantityButton";
import AttributeChecked from "@/components/common/checked/AttributeChecked";
import { RatingFilter } from "@/components/common/RatingFilter";
import { formatUtcToVietnamDate } from "@/helper/format-utc-to-vietnam-date";
import { getTimeRemaining } from "@/helper/get-time-remaining";
import type { IProductDetail } from "@/type/products";
import { Minus, RefreshCcw, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import useProductDetail from "./product-detail-helper/use-product-detail";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CardError from "@/components/common/notification/CardError";
import ProductImagePreview from "./ProductImagePreview";
import type { IAttributeValue } from "@/type/attribute";
import { useMutation } from "@tanstack/react-query";
import { addCartItem } from "@/services/cart.service";
import { getProductVariation } from "./product-detail-helper";
import { toastError, toastInfo, toastSuccess, toastWarning } from "@/components/common/sonner";

interface Props {
  productDetail?: IProductDetail;
}

const ProductDetailInformation = ({ productDetail }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const { mutate } = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: addCartItem,
  });

  const {
    attributeGroups,
    selectedProductVariation,
    validSelectAttrValIds,
    salePrice,
    isProductVariation,
    minPrice,
    maxPrice,
    isOnSale,
    isSelectedAttrVal,
    imagePreview,
    setImagePreview,
    setProductDetail,
    isCheckedAttrVal,
    handleSelectAttrVal,
    refreshSelectAttrVal,
  } = useProductDetail();

  const handleError = (): boolean => {
    const hasError = !!(isProductVariation && !selectedProductVariation);
    console.log(isProductVariation);
    console.log(selectedProductVariation);
    console.log(hasError);
    setIsError(hasError);
    return hasError;
  };

  const handleBuyNow = () => {
    handleError();
  };

  const handleAddToCart = () => {
    const hasError = handleError();
    if (productDetail?.id && !hasError) {
      mutate({
        productId: productDetail?.id,
        productVariationId: selectedProductVariation?.id,
        quantity: quantity,
      });
      toastSuccess("Add item to cart successfully")
    }
  };

  const handleCheckAttrVal = (attrVal: IAttributeValue) => {
    handleSelectAttrVal(attrVal);
    setIsError(false);
  };

  useEffect(() => {
    setProductDetail(productDetail);
  }, [productDetail, setProductDetail]);

  return (
    <div className="flex gap-10 px-4">
      <ProductImagePreview
        images={productDetail?.images ?? []}
        image={imagePreview}
        onSelectImage={(value) => setImagePreview(value)}
      />
      <div className="flex-1 space-y-3.5">
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
              <p className="text-muted-foreground">people rated and reviewed</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <AppBadge badgeColor="green" content="In stock" />
            <span className="text-txt-brand">
              {`Release on ${productDetail?.createdAt &&
                formatUtcToVietnamDate(productDetail?.createdAt)
                }`}
            </span>
          </div>
        </div>
        <div className="border-t pt-3">
          <div className="flex items-center">
            {isProductVariation && !selectedProductVariation ? (
              <div className="flex items-center gap-2">
                <span className="text-4xl font-semibold text-foreground">
                  ${minPrice}
                </span>{" "}
                <Minus />{" "}
                <span className="text-4xl font-semibold text-foreground">
                  ${maxPrice}
                </span>
              </div>
            ) : (
              <>
                <span className="text-4xl font-bold text-foreground">
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
              </>
            )}
            {isOnSale && (
              <Badge
                variant="secondary"
                className="ml-3 bg-orange-100 text-orange-800 text-xl"
              >
                {productDetail?.promotion?.description}
              </Badge>
            )}
          </div>
          {productDetail?.promotion && (
            <p className="text-txt-system-danger font-medium mt-2">
              Special offer ends in{" "}
              {getTimeRemaining(productDetail?.promotion?.endDate)}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex justify-between items-start",
            !isProductVariation && "hidden"
          )}
        >
          <div className="space-y-2">
            {attributeGroups.map(([attrName, attrVals]) => {
              return (
                <div className="flex items-center gap-8" key={attrName}>
                  <span className="text-txt-secondary">{attrName}</span>
                  <div className="flex gap-3">
                    {[...attrVals].map((attrVal) => {
                      return (
                        <AttributeChecked
                          key={attrVal.id}
                          name={attrVal.value}
                          onCheckedChanged={() => handleCheckAttrVal(attrVal)}
                          checked={isCheckedAttrVal(attrVal)}
                          disabled={
                            validSelectAttrValIds.size > 0 &&
                            !validSelectAttrValIds.has(attrVal.id)
                          }
                          image={attrVal.imageUrl}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <Button
            onClick={refreshSelectAttrVal}
            variant="ghost"
            className="flex items-center gap-2"
            disabled={!isSelectedAttrVal}
          >
            <RefreshCcw className="text-txt-brand" />
            <p className="text-txt-brand">Refresh</p>
          </Button>
        </div>
        <div>
          <h3 className="text-base text-txt-secondary">Quantity:</h3>
          <div className="flex items-center mt-2 gap-4">
            <QuantityButton
              action={"decrease"}
              onClick={() => setQuantity((pre) => pre - 1)}
              disabled={quantity == 1}
            />
            <span className="text-foreground">{quantity}</span>
            <QuantityButton
              action={"increase"}
              onClick={() => setQuantity((pre) => pre + 1)}
            />
          </div>
        </div>
        {isError && (
          <CardError message="Please select full attributes before taking actions" />
        )}
        <div className="flex gap-2 mt-5">
          <PurchaseButton
            className="min-w-40"
            message="Add to cart"
            variant="outline"
            icon={ShoppingCart}
            onClick={handleAddToCart}
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
