export interface IProductSummary {
  id: number;
  name: string;
  averageRating: number;
  reviewCount: number;
  price: number;
  discountedPrice?: number;
}
