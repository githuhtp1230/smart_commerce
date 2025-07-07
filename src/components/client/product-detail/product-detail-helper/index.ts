
import type { IProductVariation } from "@/type/products";
import type { AttributeGroups } from "./type";
import type { IAttributeValue } from "@/type/attribute";

export const groupVariationAttribute = (
  productVariations: IProductVariation[]
): AttributeGroups => {
  const attributeGroups: AttributeGroups = {};
  productVariations.forEach((productVariation) => {
    productVariation.attributeValues.forEach((attrVal) => {
      const attrName = attrVal.attribute.name;
      if (!attributeGroups[attrName]) {
        attributeGroups[attrName] = new Map();
      }
      attributeGroups[attrName].set(attrVal.id, attrVal);
    });
  });
  return attributeGroups;
};

export const getProductVariation = (
  attributeValIds: number[],
  variations: IProductVariation[]
): IProductVariation | undefined => {
  return variations.find((variation) => {
    return variation.attributeValues.every((attrVal) => {
      return attributeValIds.includes(attrVal.id);
    });
  });
};

export const check = (
  attrVal: IAttributeValue,
  variations: IProductVariation[]
) => {
  for (const variation of variations) {
    for (const attrVal of variation.attributeValues) {
    }
  }
};
