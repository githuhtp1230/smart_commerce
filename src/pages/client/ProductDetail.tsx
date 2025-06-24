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
} from "lucide-react";
import { Facebook } from "@/assets/icons";
import { useQuery } from "@tanstack/react-query";
import { fetchProductDetail } from "@/services/products.service";
import type { IProductDetail } from "@/type/products";
import { RatingFilter } from "@/components/common/RatingFilter";
import { AppBadge } from "@/components/common/AppBadge";
import { formatUtcToVietnamDate } from "@/helper/format-utc-to-vietnam-date";

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

const ProductDetail: React.FC = () => {
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

  const productImages: ProductImage[] = [
    {
      url: "https://readdy.ai/api/search-image?query=A%20sleek%20and%20modern%2024-inch%20Apple%20iMac%20with%20Retina%204.5K%20display%20in%20blue%20color%2C%20positioned%20on%20a%20clean%20white%20desk%20with%20a%20minimalist%20setup%2C%20showing%20a%20vibrant%20blue%20screen%20with%20abstract%20wave%20patterns%2C%20professional%20studio%20lighting%2C%20high-resolution%20product%20photography&width=600&height=500&seq=1&orientation=landscape",
      thumbnail:
        "https://readdy.ai/api/search-image?query=A%20thumbnail%20image%20of%20a%20blue%20Apple%20iMac%20with%20Retina%20display%20showing%20the%20front%20view%20of%20the%20screen%20with%20abstract%20blue%20wave%20patterns%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20minimalist%20style&width=80&height=80&seq=2&orientation=squarish",
    },
    {
      url: "https://readdy.ai/api/search-image?query=Side%20view%20of%20a%2024-inch%20Apple%20iMac%20in%20blue%20color%20showing%20its%20slim%20profile%20design%2C%20positioned%20on%20a%20white%20desk%20with%20clean%20background%2C%20professional%20studio%20lighting%2C%20high-resolution%20product%20photography%20with%20soft%20shadows&width=600&height=500&seq=3&orientation=landscape",
      thumbnail:
        "https://readdy.ai/api/search-image?query=A%20thumbnail%20image%20showing%20the%20side%20profile%20view%20of%20a%20blue%20Apple%20iMac%2C%20highlighting%20its%20ultra-thin%20design%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20minimalist%20style&width=80&height=80&seq=4&orientation=squarish",
    },
    {
      url: "https://readdy.ai/api/search-image?query=Close-up%20view%20of%20the%20bottom%20portion%20of%20a%20blue%2024-inch%20Apple%20iMac%20showing%20the%20Apple%20logo%20and%20stand%2C%20positioned%20on%20a%20white%20desk%20with%20clean%20background%2C%20professional%20studio%20lighting%2C%20high-resolution%20product%20photography&width=600&height=500&seq=5&orientation=landscape",
      thumbnail:
        "https://readdy.ai/api/search-image?query=A%20thumbnail%20image%20showing%20a%20close-up%20of%20the%20Apple%20logo%20and%20stand%20on%20a%20blue%20iMac%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20minimalist%20style&width=80&height=80&seq=6&orientation=squarish",
    },
  ];

  const similarProducts: SimilarProduct[] = [
    {
      id: 1,
      name: "Razer Kraken V3 Wired 7.1 Surround Sound Gaming Headset",
      price: 59.99,
      rating: 4.5,
      reviews: 128,
      image:
        "https://readdy.ai/api/search-image?query=Professional%20product%20photography%20of%20a%20black%20gaming%20headset%20with%20RGB%20lighting%2C%20Razer%20Kraken%20model%2C%20on%20a%20clean%20white%20background%20with%20soft%20shadows%2C%20high%20resolution%20detailed%20image%20showing%20ear%20cups%20and%20headband&width=200&height=200&seq=7&orientation=squarish",
    },
    {
      id: 2,
      name: "2022 Apple 10.9-inch iPad Air (Wi-Fi, 64GB) - Purple",
      price: 599,
      rating: 4.8,
      reviews: 3542,
      image:
        "https://readdy.ai/api/search-image?query=Professional%20product%20photography%20of%20a%20purple%20Apple%20iPad%20Air%20tablet%20showing%20the%20front%20display%20with%20colorful%20wallpaper%2C%20positioned%20at%20an%20angle%20on%20a%20clean%20white%20background%20with%20soft%20shadows%2C%20high%20resolution%20detailed%20image&width=200&height=200&seq=8&orientation=squarish",
    },
    {
      id: 3,
      name: "Logitech G923 Racing Wheel and Pedals for PlayStation/PC",
      price: 299,
      rating: 4.6,
      reviews: 872,
      image:
        "https://readdy.ai/api/search-image?query=Professional%20product%20photography%20of%20a%20Logitech%20G923%20racing%20wheel%20and%20pedal%20set%20for%20gaming%2C%20black%20color%20with%20silver%20accents%2C%20on%20a%20clean%20white%20background%20with%20soft%20shadows%2C%20high%20resolution%20detailed%20image%20showing%20buttons%20and%20texture&width=200&height=200&seq=9&orientation=squarish",
    },
    {
      id: 4,
      name: "Garmin Venu Sq Smart Watch with GPS",
      price: 199.99,
      rating: 4.3,
      reviews: 651,
      image:
        "https://readdy.ai/api/search-image?query=Professional%20product%20photography%20of%20a%20Garmin%20Venu%20Sq%20smartwatch%20with%20black%20band%20and%20color%20display%20showing%20fitness%20tracking%20interface%2C%20positioned%20at%20an%20angle%20on%20a%20clean%20white%20background%20with%20soft%20shadows%2C%20high%20resolution%20detailed%20image&width=200&height=200&seq=10&orientation=squarish",
    },
    {
      id: 5,
      name: "Apple AirPods Pro",
      price: 249,
      rating: 4.7,
      reviews: 12453,
      image:
        "https://readdy.ai/api/search-image?query=Professional%20product%20photography%20of%20Apple%20AirPods%20Pro%20wireless%20earbuds%20with%20charging%20case%2C%20white%20color%2C%20positioned%20at%20an%20angle%20on%20a%20clean%20white%20background%20with%20soft%20shadows%2C%20high%20resolution%20detailed%20image%20showing%20the%20earbuds%20and%20case&width=200&height=200&seq=11&orientation=squarish",
    },
    {
      id: 6,
      name: "Apple Magic Mouse (Wireless, Rechargeable)",
      price: 79,
      rating: 4.4,
      reviews: 3219,
      image:
        "https://readdy.ai/api/search-image?query=Professional%20product%20photography%20of%20an%20Apple%20Magic%20Mouse%20in%20white%20color%2C%20showing%20its%20sleek%20minimalist%20design%20with%20touch-sensitive%20surface%2C%20positioned%20at%20an%20angle%20on%20a%20clean%20white%20background%20with%20soft%20shadows%2C%20high%20resolution%20detailed%20image&width=200&height=200&seq=12&orientation=squarish",
    },
  ];

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

  return (
    <div>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <div className="flex">
                <div className="w-20 mr-4 space-y-3">
                  {productImages.map((image, index) => (
                    <div
                      key={index}
                      className={`border rounded cursor-pointer overflow-hidden ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-border"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image.thumbnail}
                        alt={`iMac thumbnail ${index + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex-1 border border-border rounded overflow-hidden">
                  <img
                    src={productImages[selectedImage].url}
                    alt="24-inch iMac with Retina 4.5K display"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {productDetail?.name}
                  </h1>
                  <RatingFilter averageRating={productDetail?.averageRating} />
                  <div className="mt-2 flex items-center gap-2">
                    <AppBadge badgeColor="green" content="In stock" />
                    <span className="text-sm text-muted-foreground">
                      {`Release on ${
                        productDetail?.createdAt &&
                        formatUtcToVietnamDate(productDetail?.createdAt)
                      }`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-b border-border py-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-foreground">
                      62,910,000 đ
                    </span>
                    <span className="text-lg text-muted-foreground line-through ml-2">
                      $69,900,000 đ
                    </span>
                    <Badge
                      variant="secondary"
                      className="ml-3 bg-orange-100 text-orange-800 text-xl"
                    >
                      10% off
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Free shipping by Jun 23, 2025 • Eligible for Return, Refund
                    or Replacement within 30 days of receipt if you are not
                    fully satisfied (within 14 days for Outlet).{" "}
                  </p>
                  <p className="text-sm text-orange-700 font-medium mt-2">
                    Special offer ends in 23:00:45 hours
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    Quantity:
                  </h3>
                  <div className="flex items-center mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      className="rounded-r-none"
                      disabled={quantity === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-12 h-9 border-x-0 text-center text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                      className="rounded-l-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">
                Ratings & reviews (1,283)
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="description"
              className="bg-background p-6 rounded-lg shadow-sm"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  <span className="font-bold">LIGHTNING FAST.</span> The M1 chip
                  delivers speed to tackle any all-day workflow, with a big leap
                  in CPU, GPU, and machine learning performance. The iMac
                  24-inch delivers impressive performance in an incredibly thin
                  design. The new iMac features a 24-inch 4.5K Retina display
                  with 11.3 million pixels, 500 nits of brightness, and over a
                  billion colors.
                </p>
                <p className="text-muted-foreground">
                  It has a 1080p FaceTime camera, studio-quality mics, and a
                  six-speaker sound system — the best camera and audio ever in a
                  Mac. Touch ID comes to iMac, making it easier than ever to
                  securely log in, make purchases, switch user profiles, and
                  more. The new iMac joins the family of Mac models powered by
                  M1, including MacBook Air, 13-inch MacBook Pro, and Mac mini,
                  marking another step forward in Apple's transition to Apple
                  silicon.
                </p>
                <p className="text-muted-foreground">
                  Combining the power of M1 with macOS Big Sur, the new iMac
                  instantly wakes from sleep, everyday tasks feel noticeably
                  faster and fluid, and apps launch with amazing speed. The
                  8-core CPU delivers up to 85 percent faster performance than
                  the previous generation, while the 7-core or 8-core GPU
                  delivers up to 2x faster graphics performance.
                </p>
                <div className="mt-6">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%2024-inch%20Apple%20iMac%20in%20blue%20color%20on%20a%20white%20desk%20with%20keyboard%20and%20mouse%2C%20showing%20vibrant%20screen%20display%20with%20blue%20wave%20patterns%2C%20in%20a%20modern%20minimalist%20home%20office%20setting%20with%20soft%20natural%20lighting%2C%20high-resolution%20lifestyle%20product%20photography&width=800&height=400&seq=14&orientation=landscape"
                    alt="iMac lifestyle image"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-muted-foreground">
                  <span className="font-bold">SIMPLY STUNNING.</span> The new
                  iMac features a 24-inch 4.5K Retina display with narrow
                  borders and 11.3 million pixels. With a P3 wide color gamut
                  and over a billion colors, plus 500 nits of brightness, images
                  on the new iMac are vivid and more brilliant. This spectacular
                  display features True Tone technology, which automatically
                  adjusts the color temperature of the display to match a user's
                  ambient lighting.
                </p>
                <p className="text-muted-foreground">
                  The combination of the outstanding Retina display, powerful
                  speakers, and spacious microphones makes the ideal machine for
                  all your needs. The new iMac has the best sound system ever in
                  a Mac. It features a six-speaker sound system, with
                  force-backed woofers placed back-to-back for an impressive
                  response, while reducing unwanted vibrations.
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="specifications"
              className="bg-background p-6 rounded-lg shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-foreground mb-3">
                    Technical Specifications
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">
                        Processor
                      </span>
                      <span className="w-2/3 text-foreground">
                        Apple M1 chip with 8-core CPU
                      </span>
                    </li>
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">
                        Memory
                      </span>
                      <span className="w-2/3 text-foreground">
                        8GB unified memory
                      </span>
                    </li>
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">
                        Storage
                      </span>
                      <span className="w-2/3 text-foreground">256GB SSD</span>
                    </li>
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">
                        Graphics
                      </span>
                      <span className="w-2/3 text-foreground">7-core GPU</span>
                    </li>
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">
                        Display
                      </span>
                      <span className="w-2/3 text-foreground">
                        24-inch 4.5K Retina display (4480 x 2520)
                      </span>
                    </li>
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">
                        Camera
                      </span>
                      <span className="w-2/3 text-foreground">
                        1080p FaceTime HD camera
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-3">
                    Connectivity
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">Wi-Fi</span>
                      <span className="w-2/3 text-foreground">
                        Wi-Fi 6 (802.11ax)
                      </span>
                    </li>
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">
                        Bluetooth
                      </span>
                      <span className="w-2/3 text-foreground">
                        Bluetooth 5.0
                      </span>
                    </li>
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">Ports</span>
                      <span className="w-2/3 text-foreground">
                        Two Thunderbolt / USB 4 ports, Two USB 3 ports
                      </span>
                    </li>
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">Audio</span>
                      <span className="w-2/3 text-foreground">
                        Six-speaker system with force-cancelling woofers
                      </span>
                    </li>
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">
                        Microphone
                      </span>
                      <span className="w-2/3 text-foreground">
                        Studio-quality three-mic array
                      </span>
                    </li>
                    <li className="flex">
                      <span className="w-1/3 text-muted-foreground">Power</span>
                      <span className="w-2/3 text-foreground">
                        143W power adapter
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="reviews"
              className="bg-background p-6 rounded-lg shadow-sm"
            >
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="text-5xl font-bold text-foreground">
                        4.7
                      </div>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        1,283 reviews
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-1">
                        {[
                          { stars: 5, percentage: 78 },
                          { stars: 4, percentage: 15 },
                          { stars: 3, percentage: 5 },
                          { stars: 2, percentage: 1 },
                          { stars: 1, percentage: 1 },
                        ].map((rating) => (
                          <div key={rating.stars} className="flex items-center">
                            <span className="text-xs w-8">{rating.stars}★</span>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="bg-yellow-400 h-full rounded-full"
                                style={{ width: `${rating.percentage}%` }}
                              />
                            </div>
                            <span className="text-xs w-8 text-right">
                              {rating.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Write a Review
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="space-y-6">
                    {[
                      {
                        title: "Amazing display and performance",
                        rating: 5,
                        date: "June 12, 2025",
                        text: "I've been using this iMac for about a month now and I'm extremely impressed with both the performance and the design. The M1 chip handles everything I throw at it with ease, from photo editing to multiple browser tabs. The display is absolutely stunning - colors are vibrant and text is crisp. The blue color is beautiful and adds a nice touch to my home office.",
                        helpful: 24,
                      },
                      {
                        title: "Great for everyday use, but storage is limited",
                        rating: 4,
                        date: "June 5, 2025",
                        text: "The iMac is beautiful and performs very well for everyday tasks. The screen is absolutely gorgeous and the speakers sound amazing for built-in speakers. My only complaint is that 256GB of storage fills up quickly if you work with large files or install many applications. I'd recommend getting an external drive or paying for the upgrade to at least 512GB.",
                        helpful: 18,
                      },
                    ].map((review, index) => (
                      <div key={index} className="border-b border-border pb-6">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              {review.title}
                            </h4>
                            <div className="flex items-center mt-1">
                              <div className="flex text-yellow-400">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-4 w-4 fill-current"
                                  />
                                ))}
                                {[...Array(5 - review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4" />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground ml-2">
                                Verified Purchase
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {review.date}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-muted-foreground">{review.text}</p>
                        </div>
                        <div className="mt-3 flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-sm text-muted-foreground flex items-center"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                          <span className="mx-2 text-muted">|</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-sm text-muted-foreground"
                          >
                            Report
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="text-center">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
          </div>
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
                    icon: <Facebook className="text-blue-600 mr-2 h-4 w-4" />,
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

export default ProductDetail;
