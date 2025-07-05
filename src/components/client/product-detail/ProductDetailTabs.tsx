import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDetailReview from "./ProductDetailReview";
import ProductDetailAttributeList from "./ProductDetailAttributeList";
import ProductDetailDescription from "./ProductDetailDescription";
import type { IProductDetail } from "@/type/products";

interface Props {
  productDetail?: IProductDetail;
}

const ProductDetailTabs = ({ productDetail }: Props) => {
  return (
    <div className="container">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="flex justify-start gap-2 bg-transparent">
          <TabsTrigger
            value="description"
            className="!bg-transparent text-[17px] pb-1 box-content border-t-0 border-x-0 border-b-2 border-b-transparent rounded-none hover:text-blue-500 hover:border-b-blue-500 data-[state=active]:text-blue-500 data-[state=active]:border-b-blue-500  dark:hover:text-blue-500 dark:data-[state=active]:text-blue-500 dark:data-[state=active]:border-b-blue-500 "
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="!bg-transparent text-[17px] pb-1 box-content border-t-0 border-x-0 border-b-2 border-b-transparent rounded-none hover:text-blue-500 hover:border-b-blue-500  data-[state=active]:text-blue-500 data-[state=active]:border-b-blue-500  dark:hover:text-blue-500 dark:data-[state=active]:text-blue-500 dark:data-[state=active]:border-b-blue-500 "
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="!bg-transparent text-[17px] pb-1 box-content border-t-0 border-x-0 border-b-2 border-b-transparent rounded-none hover:text-blue-500 hover:border-b-blue-500  data-[state=active]:text-blue-500 data-[state=active]:border-b-blue-500   dark:hover:text-blue-500 dark:data-[state=active]:text-blue-500 dark:data-[state=active]:border-b-blue-500 "
          >
            Ratings & reviews (1,283)
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="description"
          className="bg-background p-6 rounded-lg shadow-sm"
        >
          <ProductDetailDescription />
        </TabsContent>

        <TabsContent
          value="specifications"
          className="bg-background rounded-lg shadow-sm mt-3"
        >
          <ProductDetailAttributeList productDetail={productDetail} />
        </TabsContent>

        <TabsContent
          value="reviews"
          className="bg-background p-6 rounded-lg shadow-sm"
        >
          <ProductDetailReview />
          none
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetailTabs;
