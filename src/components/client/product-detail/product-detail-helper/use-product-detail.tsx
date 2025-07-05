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

  const isCheckedAttrVal = (attrVal: IAttributeValue) => {
    return selectedAttrValIds.has(attrVal.id);
  };

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
    selectedProductVariation?.price *
      (productDetail.promotion.discountValuePercent / 100);

  return {
    productDetail,
    attributeGroups,
    selectedProductVariation,
    validSelectAttrValIds,
    salePrice,
    setProductDetail,
    handleSelectAttrVal,
    isCheckedAttrVal,
  };
};

export default useProductDetail;
