import type { IProductVariation } from "@/type/products";
import type { IAttributeValue } from "@/type/attribute";

type AttributeGroups = Record<string, IAttributeValue[]>;

export const getAttributeGroups = (
  productVariations: IProductVariation[]
): AttributeGroups => {
  const attributeGroup: AttributeGroups = {};
  productVariations.forEach((productVariation) => {
    productVariation.attributeValues.forEach((attrVal) => {
      const attrName = attrVal.attribute.name;
      if (!attributeGroup[attrName]) {
        attributeGroup[attrName] = [];
      }
      if (!findAttrVal(attributeGroup[attrName], attrVal)) {
        attributeGroup[attrName].push(attrVal);
      }
    });
  });
  return attributeGroup;
};

const findAttrVal = (attrVals: IAttributeValue[], attrVal: IAttributeValue) => {
  return attrVals.find((a) => a.id === attrVal.id);
};

export const filterAttrValIdSameAttrInAttrGroup = (
  attrVal: IAttributeValue,
  attrGroups: AttributeGroups,
  selectedAttrValIds: Set<number>
): Set<number> => {
  const attrVals = attrGroups[attrVal.attribute.name];
  const newSelectedAttrValIds = new Set(selectedAttrValIds);

  for (const i of attrVals) {
    if (newSelectedAttrValIds.has(i.id)) {
      newSelectedAttrValIds.delete(i.id);
      break;
    }
  }

  newSelectedAttrValIds.add(attrVal.id);

  return newSelectedAttrValIds;
};

export const getProductVariation = (
  selectedAttrValIds: Set<number>,
  productVariations: IProductVariation[]
): IProductVariation | undefined => {
  return productVariations.find((productVariation) => {
    return productVariation.attributeValues.every((attrVal) =>
      selectedAttrValIds.has(attrVal.id)
    );
  });
};

const getAttrValById = (
  attrVals: IAttributeValue[],
  id: number
): IAttributeValue | undefined => {
  return attrVals.find((attrVal) => attrVal.id === id);
};

export const getSelectValidAttrVals = (
  attrValSelected: IAttributeValue,
  productVariations: IProductVariation[]
) => {
  const validAttrValIdVariations = new Set<number>();
  for (const productVariation of productVariations) {
    const attrVals = productVariation.attributeValues;
    for (const attrVal of attrVals) {
      if (attrVal.attribute.id === attrValSelected?.attribute.id) {
        validAttrValIdVariations.add(attrVal.id);
      } else if (
        getAttrValById(attrVals, attrVal.id) &&
        getAttrValById(attrVals, attrValSelected.id)
      ) {
        validAttrValIdVariations.add(attrVal.id);
      }
    }
  }
  return validAttrValIdVariations;
};
