

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import ProductDetailReview from "./ProductDetailReview";
import ProductDetailAttributeList from "./ProductDetailAttributeList";
import ProductDetailDescription from "./ProductDetailDescription";
import type { IProductDetail } from "@/type/products";
import CustomTabsTrigger from "@/components/common/tabs/CustomTabsTrigger";

interface Props {
  productDetail?: IProductDetail;
}

const ProductDetailTabs = ({ productDetail }: Props) => {
  return (
    <div className="container">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="flex justify-start gap-2 bg-transparent">
          <CustomTabsTrigger
            value="description"
          >
            Description
          </CustomTabsTrigger>
          <CustomTabsTrigger
            value="specifications"
          >
            Specifications
          </CustomTabsTrigger>
          <CustomTabsTrigger
            value="reviews"
          >
            Ratings & reviews (1,283)
          </CustomTabsTrigger>
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
          <ProductDetailReview
            productDetail={productDetail}
          ></ProductDetailReview>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetailTabs;
