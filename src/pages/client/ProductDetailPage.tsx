import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Search,
  Truck,
  Rocket,
  Zap,
  RotateCcw,
  Package,
  CreditCard,
  ThumbsUp,
  Instagram,
  Youtube,
  Reply,
} from "lucide-react";
import { Facebook } from "@/assets/icons";
import { useQuery } from "@tanstack/react-query";
import { fetchProductDetail } from "@/services/products.service";
import type { IProductDetail } from "@/type/products";
import { RatingFilter } from "@/components/common/RatingFilter";
import { AppBadge } from "@/components/common/AppBadge";
import { formatUtcToVietnamDate } from "@/helper/format-utc-to-vietnam-date";
import { getTimeRemaining } from "@/helper/get-time-remaining";
import QuantityButton from "@/components/common/button/QuantityButton";
import ProductDetailInformation from "@/components/client/product-detail/ProductDetailInformation";
import ProductDetailDescription from "@/components/client/product-detail/ProductDetailDescription";
import ProductDetailAttributeList from "@/components/client/product-detail/ProductDetailAttributeList";
import ProductDetailReview from "@/components/client/product-detail/ProductDetailReview";
import ProductDetailTabs from "@/components/client/product-detail/ProductDetailTabs";

interface Color {
  name: string;
  hex: string;
}

interface ProductImage {
  url: string;
  thumbnail: string;
}

interface SimilarProduct {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const [productDetail, setProductDetail] = useState<IProductDetail>();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("Blue");
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["productSummaries", numericProductId],
    queryFn: () => fetchProductDetail(numericProductId),
  });

  useEffect(() => {
    if (data) {
      setProductDetail(data);
    }
  }, [data, isSuccess]);

  const colors: Color[] = [
    { name: "Blue", hex: "#0070c9" },
    { name: "Pink", hex: "#ff80ab" },
    { name: "Green", hex: "#4caf50" },
    { name: "Silver", hex: "#e0e0e0" },
    { name: "Orange", hex: "#ff9800" },
  ];

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

  return (
    <div>
      <section className="py-8 flex gap-10">
        <div className="w-[40%]">
          <img
            className="w-full"
            src="https://bhstore.vn/uploads/iphone-15-promax-bhstore_3_1731640873.png"
          />
        </div>
        <ProductDetailInformation productDetail={productDetail} />
      </section>

      {/* Product Details */}
      <ProductDetailTabs />

      {/* Similar Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Similar Products
            </h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-muted hover:bg-muted/80"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-muted hover:bg-muted/80"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {similarProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover object-top"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background rounded-full shadow-sm"
                  >
                    <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                  </Button>
                  {product.id === 3 && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                      New
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground text-sm line-clamp-2 h-10">
                    {product.name}
                  </h3>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400 text-xs">
                      {[...Array(Math.floor(product.rating))].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                      {product.rating % 1 !== 0 && (
                        <Star className="h-3 w-3 fill-current" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-foreground">
                      ${product.price}
                    </span>
                    <Button size="sm" variant="ghost" className="p-1 h-8">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </div>
      </section>

      <footer className="bg-muted pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">About Phoenix</h3>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Careers",
                  "Corporate Responsibility",
                  "Press Center",
                  "Investor Relations",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Stay Connected</h3>
              <ul className="space-y-2">
                {[
                  {
                    name: "Facebook",
                    icon: <Facebook className="text-blue-500 mr-2 h-4 w-4" />,
                  },
                  {
                    name: "Instagram",
                    icon: <Instagram className="text-pink-600 mr-2 h-4 w-4" />,
                  },
                  {
                    name: "YouTube",
                    icon: <Youtube className="text-red-600 mr-2 h-4 w-4" />,
                  },
                ].map((social) => (
                  <li key={social.name}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary flex items-center"
                    >
                      {social.icon}
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">
                Customer Service
              </h3>
              <ul className="space-y-2">
                {[
                  "Help Center",
                  "Track Your Order",
                  "Returns & Exchanges",
                  "Shipping Information",
                  "Contact Us",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">
                Payment Methods
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  <CreditCard className="text-blue-700 h-5 w-5" />,
                  <CreditCard className="text-red-500 h-5 w-5" />,
                  <CreditCard className="text-blue-500 h-5 w-5" />,
                  <CreditCard className="text-blue-800 h-5 w-5" />,
                  <CreditCard className="text-black h-5 w-5" />,
                ].map((icon, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-background p-2 rounded border border-border"
                  >
                    {icon}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="font-bold text-foreground mb-4">
                  Subscribe to our Newsletter
                </h3>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="rounded-r-none"
                  />
                  <Button className="bg-orange-400 hover:bg-orange-500 text-white rounded-l-none">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20minimalist%20modern%20tech%20company%20logo%20with%20an%20abstract%20phoenix%20bird%20design%20in%20orange%20gradient%20colors%2C%20simple%20and%20clean%20design%20on%20transparent%20background%2C%20professional%20corporate%20identity&width=120&height=40&seq=15&orientation=landscape"
                  alt="Phoenix Logo"
                  className="h-8"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                © 2025 Phoenix Electronics. All rights reserved. |{" "}
                <a href="#" className="hover:text-primary">
                  Privacy Policy
                </a>{" "}
                |{" "}
                <a href="#" className="hover:text-primary">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailPage;
