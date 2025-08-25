import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  fetchNewProductSummaries,
  fetchProductSummaries,
  fetchRandomHotProducts,
} from "@/services/products.service";
import type { IProductSummary } from "@/type/products";
import { useEffect, useState } from "react";
import ProductSummaryItem from "../product/ProductSummaryItem";

const ProductGrid = () => {
  const [products, setProducts] = useState<IProductSummary[]>([]);
  const [newProducts, setNewProducts] = useState<IProductSummary[]>([]);
  const [hotProducts, setHotProducts] = useState<IProductSummary[]>([]);
  const [saleProducts, setSaleProducts] = useState<IProductSummary[]>([]);

  useEffect(() => {
    // tất cả sản phẩm (có phân trang)
    fetchProductSummaries(new URLSearchParams()).then((data) =>
      setProducts(data.data)
    );

    // sản phẩm mới nhất
    fetchNewProductSummaries(new URLSearchParams()).then((data) =>
      setNewProducts(data.data)
    );

    // sản phẩm hot random
    fetchRandomHotProducts().then((data) => setHotProducts(data));

    // sản phẩm sales -> tạm thời demo bằng random hot hoặc sau này tách API riêng
    fetchRandomHotProducts().then((data) => setSaleProducts(data));
  }, []);

  return (
    <div className="bg-background rounded-lg p-2 h-full">
      {/* Sản phẩm sales */}
      <div className="mb-10 mt-2 flex flex-col items-start">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-red-500">FLASH SALE</h2>
          <img
            src="./images/flashSale.png"
            alt="Flash Sale"
            className="w-10 h-10 mb-2 object-contain"
          />
        </div>
        <div className="mt-1 w-20 h-1 bg-red-500 rounded-full"></div>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {saleProducts.map((product) => (
            <CarouselItem key={product.id} className="basis-1/4">
              <ProductSummaryItem
                product={product}
                className="h-full flex flex-col justify-between"
                priceContainerClassName="mt-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 w-10 h-10" />
        <CarouselNext className="absolute right-0 w-10 h-10" />
      </Carousel>
      {/* Tất cả sản phẩm */}
      <div className="mb-6 mt-10">
        <h2 className="text-xl font-bold text-txt-primary mb-2">
          Tất cả sản phẩm
        </h2>
        <div className="w-16 h-1 bg-blue-500 rounded"></div>
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-1/4">
              <ProductSummaryItem
                product={product}
                className="h-full flex flex-col justify-between"
                priceContainerClassName="mt-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 w-10 h-10" />
        <CarouselNext className="absolute right-0 w-10 h-10" />
      </Carousel>

      {/* Sản phẩm mới */}
      <div className="mb-6 mt-10">
        <h2 className="text-xl font-bold text-txt-primary mb-2">
          Sản phẩm mới nhất
        </h2>
        <div className="w-16 h-1 bg-blue-500 rounded"></div>
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {newProducts.map((product) => (
            <CarouselItem key={product.id} className="basis-1/4">
              <ProductSummaryItem
                product={product}
                className="h-full flex flex-col justify-between"
                priceContainerClassName="mt-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 w-10 h-10" />
        <CarouselNext className="absolute right-0 w-10 h-10" />
      </Carousel>

      {/* Sản phẩm hot */}
      <div className="mb-6 mt-10">
        <h2 className="text-xl font-bold text-txt-primary mb-2">
          Sản phẩm nổi bật
        </h2>
        <div className="w-16 h-1 bg-blue-500 rounded"></div>
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {hotProducts.map((product) => (
            <CarouselItem key={product.id} className="basis-1/4">
              <ProductSummaryItem
                product={product}
                className="h-full flex flex-col justify-between"
                priceContainerClassName="mt-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 w-10 h-10" />
        <CarouselNext className="absolute right-0 w-10 h-10" />
      </Carousel>
    </div>
  );
};

export default ProductGrid;
