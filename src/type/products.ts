import type { IAttributeValue } from "./attribute";
import type { ICategory } from "./category";
import type { IPromotion } from "./promotion";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price?: number;
  category: ICategory;
  promotion?: IPromotion;
  is_deleted: number;
}

export interface IProductSummary {
  id: number;
  name: string;
  averageRating: number;
  reviewCount: number;
  price: number | null;
  maxPrice: number | null;
  image: string;
  promotion?: IPromotion;
  category?: ICategory;
  createdAt: string;
  is_deleted: number;
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
export interface PaginationProductSummaries {
  data: IProductSummary[];
  total: number;
}
