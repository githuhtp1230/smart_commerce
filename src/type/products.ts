import type { IAttributeValue } from "./attribute";

export interface IProductSummary {
  id: number;
  name: string;
  averageRating: number;
  reviewCount: number;
  price: number;
  discountedPrice?: number;
}

export interface IProductVariation {
  id: number;
  price: number;
  discountedPrice: number;
  stock: 32;
  image: string;
  attributeValues: IAttributeValue[];
}
export interface IProductDetail extends IProductSummary {
  attributeValues: IAttributeValue[];
  variations: IProductVariation[];
  createdAt: string;
}
