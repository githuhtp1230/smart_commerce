import type { IAttributeValue } from "./attribute";
import type { IPromotion } from "./promotion";

export interface IProductSummary {
  id: number;
  name: string;
  averageRating: number;
  reviewCount: number;
  price: number;
  promotion?: IPromotion;
}

export interface IProductVariation {
  id: number;
  price: number;
  promotion: IPromotion;
  stock: 32;
  image: string;
  attributeValues: IAttributeValue[];
}
export interface IProductDetail extends IProductSummary {
  images: string[];
  attributeValues: IAttributeValue[];
  variations: IProductVariation[];
  createdAt: string;
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
