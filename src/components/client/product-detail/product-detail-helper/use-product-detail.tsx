import type { IProductDetail, IProductVariation } from "@/type/products";
import React, { useEffect, useState } from "react";
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

  const attributeGroupsRecord = getAttributeGroups(
    productDetail?.variations || []
  );

  const attributeGroups = Object.entries(attributeGroupsRecord);

  const isSelectedAttrVal = selectedAttrValIds.size > 0;

  const minPrice =
    productDetail &&
    Math.min(
      ...productDetail?.variations.map(
        (productVariation) => productVariation.price
      )
    );

  const maxPrice =
    productDetail &&
    Math.max(
      ...productDetail?.variations.map(
        (productVariation) => productVariation.price
      )
    );

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

      return next;
    });
  };

  const selectedProductVariation = productDetail?.variations.find(
    (productVariation) => {
      return productVariation.attributeValues.every((attrVal) =>
        selectedAttrValIds.has(attrVal.id)
      );
    }
  );

  const salePrice =
    productDetail?.promotion &&
    selectedProductVariation &&
    (isProductVariation
      ? selectedProductVariation?.price *
        (productDetail.promotion.discountValuePercent / 100)
      : productDetail.price);

  const isOnSale = productDetail?.promotion;

  const refreshSelectAttrVal = () => {
    setSelectedAttrValIds(new Set());
    setValidSelectAttrValIds(new Set());
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
    setProductDetail,
    handleSelectAttrVal,
    isCheckedAttrVal,
    refreshSelectAttrVal,
  };
};

export default useProductDetail;
