import type { IProductDetail } from "@/type/products";
import { useState } from "react";
import {
  filterAttrValIdSameAttrInAttrGroup,
  getAttributeGroups,
  getSelectValidAttrVals,
} from ".";
import type { IAttributeValue } from "@/type/attribute";

const useProductDetail = () => {
  const [productDetail, setProductDetail] = useState<IProductDetail>();
  const [selectedAttrValIds, setSelectedAttrValIds] = useState<Set<number>>(
    new Set<number>()
  );
  const [validSelectAttrValIds, setValidSelectAttrValIds] = useState<
    Set<number>
  >(new Set<number>());
  const [imagePreview, setImagePreview] = useState<string>();

  const attributeGroupsRecord = getAttributeGroups(
    productDetail?.variations || []
  );

  const attributeGroups = Object.entries(attributeGroupsRecord);

  const isSelectedAttrVal = selectedAttrValIds.size > 0;

  const minPrice = productDetail?.variations?.length
    ? Math.min(
        ...productDetail.variations
          .filter(
            (productVariation) => typeof productVariation.price === "number"
          )
          .map((productVariation) => productVariation.price)
      )
    : undefined;

  const maxPrice = productDetail?.variations?.length
    ? Math.max(
        ...productDetail.variations
          .filter(
            (productVariation) => typeof productVariation.price === "number"
          )
          .map((productVariation) => productVariation.price)
      )
    : undefined;

  const isProductVariation =
    productDetail && productDetail?.variations.length > 0;

  const isCheckedAttrVal = (attrVal: IAttributeValue) =>
    selectedAttrValIds.has(attrVal.id);

  const handleSelectAttrVal = (attrVal: IAttributeValue) => {
    setSelectedAttrValIds((prev) => {
      const next = filterAttrValIdSameAttrInAttrGroup(
        attrVal,
        attributeGroupsRecord,
        prev
      );

      setValidSelectAttrValIds(
        getSelectValidAttrVals(attrVal, productDetail?.variations ?? [])
      );

      if (attrVal.imageUrl) {
        setImagePreview(attrVal.imageUrl);
      }

      return next;
    });
  };

  const selectedProductVariation =
    productDetail?.variations?.length && selectedAttrValIds instanceof Set
      ? productDetail.variations.find((productVariation) =>
          productVariation.attributeValues.every(
            (attrVal) =>
              typeof attrVal.id !== "undefined" &&
              selectedAttrValIds.has(attrVal.id)
          )
        ) || undefined
      : undefined;

  const salePrice = productDetail
    ? productDetail.promotion &&
      typeof productDetail.promotion.discountValuePercent === "number"
      ? ((isProductVariation && selectedProductVariation?.price) ||
          productDetail.price) *
        (1 - productDetail.promotion.discountValuePercent / 100)
      : (isProductVariation && selectedProductVariation?.price) ||
        productDetail.price
    : undefined;

  const isOnSale = productDetail?.promotion;

  const refreshSelectAttrVal = () => {
    setSelectedAttrValIds(new Set());
    setValidSelectAttrValIds(new Set());
    setImagePreview(productDetail?.images[0]);
  };

  return {
    productDetail,
    attributeGroups,
    selectedProductVariation,
    validSelectAttrValIds,
    salePrice,
    minPrice,
    maxPrice,
    isProductVariation,
    isOnSale,
    selectedAttrValIds,
    isSelectedAttrVal,
    imagePreview,
    setImagePreview,
    setProductDetail,
    handleSelectAttrVal,
    isCheckedAttrVal,
    refreshSelectAttrVal,
  };
};

export default useProductDetail;
