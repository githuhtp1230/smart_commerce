import type { IAttributeValue } from "./attribute";
import type { IProduct, IProductVariation } from "./products";

export interface IAddCartItemRequest {
  productId: number;
  productVariationId: number | undefined;
  quantity: number;
}

export interface ICartItem {
  id: number;
  product: IProduct;
  image: string;
  quantity: number;
  productVariation?: IProductVariation;
  isSelected?: boolean;
}
