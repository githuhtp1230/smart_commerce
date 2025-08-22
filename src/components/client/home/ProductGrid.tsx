

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetchNewProductSummaries, fetchProductSummaries } from "@/services/products.service";
import type { IProductSummary } from "@/type/products";
import { useEffect, useState } from "react";
import ProductSummaryItem from "../product/ProductSummaryItem";
const ProductGrid = () => {

    const [products, setProducts] = useState<IProductSummary[]>([]);
    const [newProducts, setNewProducts] = useState<IProductSummary[]>([]);

    useEffect(() => {
        fetchProductSummaries(new URLSearchParams()).then((data) => setProducts(data.data));
        fetchNewProductSummaries(new URLSearchParams()).then((data) => setNewProducts(data.data));
    }, []);


    return (
        <div className="bg-background rounded-lg p-2 h-full">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-txt-primary mb-2">Tất cả sản phẩm</h2>
                <div className="w-16 h-1 bg-blue-500 rounded"></div>
            </div>

            <Carousel className="w-full">
                <CarouselContent>
                    {products.map((product) => (
                        <CarouselItem key={product.id} className="basis-1/4">
                            <ProductSummaryItem product={product} className="h-full flex flex-col justify-between" priceContainerClassName=" mt-auto" />
                        </CarouselItem>

                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 flex items-center justify-center w-10 h-10 bg-transparent rounded-full shadow-md border-none outline-none text-txt-tertiary">
                </CarouselPrevious>
                <CarouselNext className="absolute right-0 flex items-center justify-center w-10 h-10 bg-transparent rounded-full shadow-md border-none outline-none">
                </CarouselNext>
            </Carousel>

            <div className="mb-6 mt-10">
                <h2 className="text-xl font-bold text-txt-primary mb-2">Sản phẩm mới nhất</h2>
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
                <CarouselPrevious className="absolute left-0  flex items-center justify-center w-10 h-10 bg-transparent rounded-full shadow-md border-none outline-none text-txt-tertiary">
                </CarouselPrevious>
                <CarouselNext className="absolute right-0 flex items-center justify-center w-10 h-10 bg-transparent rounded-full shadow-md border-none outline-none">
                </CarouselNext>
            </Carousel>
        </div>
    )
}

export default ProductGrid
