import type { IProductSummary } from "@/type/products";
import { create } from "zustand";

interface ProductSummariesState {
  productSummaries: IProductSummary[];
  setProductSummaries: (productSummaries: IProductSummary[]) => void;
}

const useProductSummariesStore = create<ProductSummariesState>((set) => ({
  productSummaries: [],
  setProductSummaries: (productSummaries) =>
    set({ productSummaries: productSummaries }),
}));

export default useProductSummariesStore;
