// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const App: React.FC = () => {
  const [mainImage, setMainImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [bundleSelected, setBundleSelected] = useState(true);

  const colors = [
    { name: "Blue", value: "bg-blue-500" },
    { name: "Silver", value: "bg-gray-300" },
    { name: "Green", value: "bg-green-500" },
    { name: "Pink", value: "bg-pink-400" },
    { name: "Purple", value: "bg-purple-500" },
  ];

  const productImages = [
    {
      url: "https://readdy.ai/api/search-image?query=A%20sleek%2024-inch%20iMac%20with%20Retina%204.5K%20display%20in%20blue%20color%2C%20positioned%20at%20a%20slight%20angle%20to%20showcase%20its%20thin%20profile.%20The%20image%20has%20a%20clean%20white%20background%20with%20subtle%20shadows%20for%20depth.%20The%20screen%20displays%20a%20vibrant%20colorful%20wallpaper%20that%20highlights%20the%20display%20quality.&width=600&height=500&seq=1&orientation=landscape",
      alt: "Blue iMac front view"
    },
    {
      url: "https://readdy.ai/api/search-image?query=A%2024-inch%20iMac%20with%20Retina%204.5K%20display%20shown%20from%20the%20side%20angle%2C%20highlighting%20its%20incredibly%20thin%20design.%20The%20aluminum%20body%20gleams%20under%20soft%20studio%20lighting%20against%20a%20clean%20white%20background.%20The%20profile%20view%20emphasizes%20the%20elegant%20engineering%20of%20the%20all-in-one%20computer.&width=600&height=500&seq=2&orientation=landscape",
      alt: "iMac side view"
    },
    {
      url: "https://readdy.ai/api/search-image?query=A%20close-up%20detail%20shot%20of%20the%2024-inch%20iMac%20with%20Retina%204.5K%20display%2C%20focusing%20on%20the%20bottom%20chin%20area%20with%20the%20Apple%20logo%20and%20the%20stand%20connection.%20The%20image%20has%20a%20clean%20white%20background%20with%20professional%20studio%20lighting%20that%20highlights%20the%20premium%20materials%20and%20build%20quality.&width=600&height=500&seq=3&orientation=landscape",
      alt: "iMac stand detail"
    },
    {
      url: "https://readdy.ai/api/search-image?query=A%20rear%20view%20of%20the%2024-inch%20iMac%20with%20Retina%204.5K%20display%20showing%20the%20ports%20and%20connectivity%20options.%20The%20slim%20profile%20is%20visible%20from%20behind%2C%20with%20the%20curved%20back%20panel%20in%20blue%20aluminum.%20The%20image%20has%20a%20clean%20white%20background%20with%20subtle%20shadows%20for%20a%20professional%20product%20photography%20look.&width=600&height=500&seq=4&orientation=landscape",
      alt: "iMac back view"
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Emily Johnson",
      date: "May 28, 2025",
      rating: 5,
      title: "Absolutely stunning display and performance",
      content: "I've been using this iMac for about a month now and I'm blown away by the display quality. The colors are incredibly vibrant and text is razor-sharp. Performance is excellent for my design work and the new speakers sound amazing. The thin design is also a huge plus for my small workspace.",
      image: "https://readdy.ai/api/search-image?query=A%20person%20working%20on%20a%20blue%20iMac%20in%20a%20modern%20home%20office%20setting%20with%20natural%20light%20coming%20through%20windows.%20The%20workspace%20is%20clean%20and%20minimalist%20with%20a%20few%20design%20books%20and%20a%20small%20plant.%20The%20image%20shows%20the%20iMac%20being%20used%20for%20graphic%20design%20work%20with%20vibrant%20colors%20on%20screen.&width=100&height=100&seq=5&orientation=squarish",
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      date: "June 1, 2025",
      rating: 4,
      title: "Great for creative work, but could use more ports",
      content: "The 4.5K display is absolutely gorgeous and color accuracy is spot on for my photography work. The M-series chip handles Photoshop and Lightroom with ease. My only complaint is I wish it had more ports - I'm constantly connecting and disconnecting peripherals. Still, it's a beautiful machine that's transformed my workflow.",
      helpful: 18,
      verified: true
    },
    {
      id: 3,
      name: "Sarah Williams",
      date: "May 15, 2025",
      rating: 5,
      title: "Perfect family computer with stunning design",
      content: "We upgraded from an older iMac and the difference is night and day. The screen is beautiful, startup is instant, and it handles everything from my husband's work applications to the kids' games without any slowdown. The built-in camera is great for video calls with family. Absolutely love the slim design too - it looks like a piece of art in our living room!",
      image: "https://readdy.ai/api/search-image?query=A%20family%20room%20setting%20with%20a%20blue%20iMac%20positioned%20on%20a%20wooden%20desk.%20The%20scene%20shows%20a%20cozy%20living%20space%20with%20a%20sofa%20visible%20in%20the%20background.%20The%20iMac%20screen%20displays%20a%20video%20call%20with%20family%20members%2C%20demonstrating%20its%20use%20as%20a%20family%20computer%20in%20a%20warm%2C%20inviting%20home%20environment.&width=100&height=100&seq=6&orientation=squarish",
      helpful: 31,
      verified: true,
      sellerResponse: {
        date: "May 16, 2025",
        content: "Thank you for your wonderful review, Sarah! We're delighted to hear how well the new iMac is serving your family's diverse needs. The improved camera was indeed designed with better video calling in mind, so we're glad you're enjoying that feature!"
      }
    }
  ];

  const bundleItems = [
    {
      name: "Magic Keyboard with Touch ID",
      price: 149,
      image: "https://readdy.ai/api/search-image?query=Apple%20Magic%20Keyboard%20with%20Touch%20ID%20and%20numeric%20keypad%2C%20shown%20from%20a%20slight%20angle%20on%20a%20clean%20white%20background.%20The%20sleek%20aluminum%20keyboard%20features%20white%20keys%20with%20the%20Touch%20ID%20sensor%20visible%20in%20the%20top%20right%20corner.%20The%20image%20highlights%20the%20premium%20build%20quality%20and%20minimalist%20design%20of%20Apples%20peripheral.&width=80&height=60&seq=7&orientation=landscape"
    },
    {
      name: "Magic Mouse",
      price: 99,
      image: "https://readdy.ai/api/search-image?query=Apple%20Magic%20Mouse%20shown%20from%20a%20top-down%20angle%20on%20a%20clean%20white%20background.%20The%20sleek%20white%20mouse%20with%20its%20smooth%20glass%20surface%20and%20minimalist%20single-piece%20design%20is%20clearly%20visible.%20The%20image%20highlights%20the%20premium%20build%20quality%20and%20the%20characteristic%20curved%20profile%20of%20Apples%20wireless%20mouse%20peripheral.&width=80&height=60&seq=8&orientation=landscape"
    },
    {
      name: "AppleCare+ (3 years)",
      price: 169,
      image: "https://readdy.ai/api/search-image?query=A%20simple%20icon%20or%20graphic%20representing%20AppleCare+%20protection%20plan%20on%20a%20clean%20white%20background.%20The%20image%20shows%20a%20stylized%20Apple%20logo%20with%20a%20plus%20sign%20and%20a%20protective%20shield%20symbol%2C%20indicating%20the%20extended%20warranty%20and%20support%20service%20for%20Apple%20products.%20The%20design%20is%20minimal%20and%20professional.&width=80&height=60&seq=9&orientation=landscape"
    }
  ];

  const specs = [
    { name: "Processor", value: "Apple M2 chip with 8-core CPU, 10-core GPU" },
    { name: "Memory", value: "16GB unified memory" },
    { name: "Storage", value: "512GB SSD" },
    { name: "Display", value: "24-inch 4.5K Retina display (4480 × 2520) with P3 and True Tone" },
    { name: "Camera", value: "1080p FaceTime HD camera with M2 image signal processor" },
    { name: "Audio", value: "Six-speaker system with force-cancelling woofers, Spatial Audio" },
    { name: "Connectivity", value: "Wi-Fi 6E (802.11ax), Bluetooth 5.3" },
    { name: "Ports", value: "2 Thunderbolt / USB 4 ports, 2 USB 3 ports, Gigabit Ethernet, 3.5mm headphone jack" },
    { name: "Dimensions", value: "Height: 18.1 inches (46.1 cm), Width: 21.5 inches (54.7 cm), Depth: 5.8 inches (14.7 cm)" },
    { name: "Weight", value: "9.88 pounds (4.48 kg)" }
  ];

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const calculateTotalBundle = () => {
    const basePrice = 1499;
    return bundleSelected ? 
      basePrice + bundleItems.reduce((total, item) => total + item.price, 0) : 
      basePrice;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Left Column - Product Images */}
          <div className="lg:w-2/5">
            <div className="rounded-lg overflow-hidden bg-white shadow-sm mb-4 h-[500px]">
              <img 
                src={productImages[mainImage].url} 
                alt={productImages[mainImage].alt}
                className="w-full h-full object-contain object-center"
              />
            </div>
            <div className="flex gap-3 mt-4">
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 ${mainImage === index ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setMainImage(index)}
                >
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:w-3/5">
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New Release</Badge>
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Best Seller</Badge>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">24" iMac with Retina 4.5K display</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fa-solid fa-star ${i < 4.7 ? 'text-amber-400' : 'text-gray-300'}`}></i>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.7 (128 reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">$1,499.00</span>
                <span className="text-lg text-gray-500 line-through">$1,699.00</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Save 12%</Badge>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <i className="fa-solid fa-check text-green-500"></i>
                <span className="text-green-700 font-medium">In Stock</span>
                <span className="text-gray-500 text-sm ml-4">Free delivery by June 12, 2025</span>
              </div>

              <Separator className="my-2" />

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex gap-3 mb-6">
                  {colors.map((color, index) => (
                    <div 
                      key={index}
                      className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center ${color.value} ${selectedColor === index ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                      onClick={() => setSelectedColor(index)}
                      title={color.name}
                    >
                      {selectedColor === index && <i className="fa-solid fa-check text-white"></i>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Configuration</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-gray-300 rounded-lg p-4 cursor-pointer bg-blue-50 border-blue-300">
                    <h4 className="font-medium">M2 Chip</h4>
                    <p className="text-sm text-gray-600">8-core CPU, 10-core GPU</p>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-4 cursor-pointer">
                    <h4 className="font-medium">M2 Pro Chip</h4>
                    <p className="text-sm text-gray-600">10-core CPU, 16-core GPU</p>
                    <p className="text-sm text-blue-600 mt-1">+$300</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="!rounded-button"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={incrementQuantity}
                    className="!rounded-button"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <Button className="flex-1 py-6 text-base !rounded-button whitespace-nowrap cursor-pointer" size="lg">
                  <i className="fa-solid fa-cart-shopping mr-2"></i>
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fa-solid fa-heart text-lg"></i>
                </Button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 mt-1">
                    <i className="fa-solid fa-shield-halved text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Apple 1-Year Limited Warranty</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Every Mac comes with a one-year limited warranty and up to 90 days of complimentary technical support.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-blue-600 mt-1 !rounded-button whitespace-nowrap cursor-pointer">
                      Learn more about AppleCare+
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <Tabs defaultValue="description">
            <TabsList className="mb-6">
              <TabsTrigger value="description" className="!rounded-button whitespace-nowrap cursor-pointer">Description</TabsTrigger>
              <TabsTrigger value="specs" className="!rounded-button whitespace-nowrap cursor-pointer">Technical Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="!rounded-button whitespace-nowrap cursor-pointer">Reviews (128)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="text-gray-700 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Immersive 24‑inch 4.5K Retina display</h2>
              <p>
                The new iMac features a stunning 24-inch 4.5K Retina display with 11.3 million pixels, P3 wide color gamut, and over a billion colors. This immersive display delivers vibrant, brilliant images with superb detail, making everything from photos and videos to web browsing and document editing look incredibly sharp and true to life.
              </p>
              <p>
                The M2 chip takes iMac's performance to a whole new level with faster CPU and GPU cores, a more powerful Neural Engine, and support for more unified memory. This translates to blazing-fast performance for everyday tasks, creative workflows, and gaming.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-microchip text-blue-600 text-xl"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Powerful M2 Chip</h3>
                  <p className="text-gray-600">
                    8-core CPU with 4 performance cores and 4 efficiency cores, 10-core GPU, and 16-core Neural Engine
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-display text-blue-600 text-xl"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Stunning 4.5K Retina Display</h3>
                  <p className="text-gray-600">
                    4480 × 2520 resolution with P3 wide color gamut and True Tone technology
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-camera text-blue-600 text-xl"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">1080p FaceTime HD Camera</h3>
                  <p className="text-gray-600">
                    Look your best on video calls with advanced image signal processor
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-volume-high text-blue-600 text-xl"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Studio-quality Audio</h3>
                  <p className="text-gray-600">
                    Six-speaker system with force-cancelling woofers and support for Spatial Audio
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {specs.map((spec, index) => (
                  <div key={index} className="py-3 border-b border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">{spec.name}</span>
                      <span className="text-gray-700">{spec.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl font-bold text-gray-900">4.7</div>
                      <div>
                        <div className="flex mb-1">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fa-solid fa-star ${i < 4.7 ? 'text-amber-400' : 'text-gray-300'}`}></i>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">Based on 128 reviews</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="w-12 text-sm text-gray-600">{rating} stars</div>
                          <Progress 
                            value={rating === 5 ? 75 : rating === 4 ? 18 : rating === 3 ? 5 : rating === 2 ? 1 : 1} 
                            className="h-2 flex-1" 
                          />
                          <div className="w-8 text-right text-sm text-gray-600">
                            {rating === 5 ? '75%' : rating === 4 ? '18%' : rating === 3 ? '5%' : rating === 2 ? '1%' : '1%'}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <Button className="w-full !rounded-button whitespace-nowrap cursor-pointer">Write a Review</Button>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <Card key={review.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{review.name}</div>
                                  <div className="text-sm text-gray-500">{review.date}</div>
                                </div>
                              </div>
                              {review.verified && (
                                <Badge variant="outline" className="text-green-600 bg-green-50">
                                  <i className="fa-solid fa-check mr-1 text-xs"></i> Verified Purchase
                                </Badge>
                              )}
                            </div>
                            
                            <div className="mb-2">
                              <div className="flex mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <i key={i} className={`fa-solid fa-star ${i < review.rating ? 'text-amber-400' : 'text-gray-300'}`}></i>
                                ))}
                              </div>
                              <h4 className="font-bold text-gray-900">{review.title}</h4>
                            </div>
                            
                            <p className="text-gray-700 mb-4">{review.content}</p>
                            
                            {review.image && (
                              <div className="mb-4">
                                <div className="w-24 h-24 rounded-md overflow-hidden">
                                  <img 
                                    src={review.image} 
                                    alt="Customer uploaded" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <Button variant="ghost" size="sm" className="text-gray-500 !rounded-button whitespace-nowrap cursor-pointer">
                                <i className="fa-regular fa-thumbs-up mr-1"></i>
                                Helpful ({review.helpful})
                              </Button>
                              <Separator orientation="vertical" className="mx-2 h-4" />
                              <Button variant="ghost" size="sm" className="text-gray-500 !rounded-button whitespace-nowrap cursor-pointer">
                                <i className="fa-regular fa-flag mr-1"></i>
                                Report
                              </Button>
                            </div>
                            
                            {review.sellerResponse && (
                              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs bg-blue-100 text-blue-600">A</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-sm">Apple Response</span>
                                  <span className="text-xs text-gray-500">{review.sellerResponse.date}</span>
                                </div>
                                <p className="text-sm text-gray-700">{review.sellerResponse.content}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap cursor-pointer">
                        <i className="fa-solid fa-chevron-left mr-1"></i>
                        Previous
                      </Button>
                      <span className="mx-4 flex items-center text-sm">Page 1 of 13</span>
                      <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap cursor-pointer">
                        Next
                        <i className="fa-solid fa-chevron-right ml-1"></i>
                      </Button>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Frequently Bought Together */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Bought Together</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-32 h-32 flex-shrink-0">
                  <img 
                    src={productImages[0].url} 
                    alt="iMac" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xl font-medium text-center md:text-left">+</div>
                
                {bundleItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute -top-2 -right-2">
                        <div className="w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={bundleSelected} 
                            onChange={() => setBundleSelected(!bundleSelected)}
                            className="w-3 h-3"
                          />
                        </div>
                      </div>
                    </div>
                    {index < bundleItems.length - 1 && (
                      <div className="text-xl font-medium text-center md:text-left">+</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="mt-8">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">24" iMac with Retina 4.5K display</span>
                    <span>$1,499.00</span>
                  </div>
                  
                  {bundleItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={bundleSelected} 
                          onChange={() => setBundleSelected(!bundleSelected)}
                          className="mr-3"
                        />
                        <span>{item.name}</span>
                      </div>
                      <span>${item.price}.00</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total price:</span>
                  <span>${calculateTotalBundle().toFixed(2)}</span>
                </div>
                
                <div className="text-sm text-gray-500 mt-2">
                  {bundleSelected ? 'You save $49.00 compared to buying separately' : ''}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1 flex flex-col justify-center">
              <Button className="w-full py-6 text-base mb-3 !rounded-button whitespace-nowrap cursor-pointer">
                Add Bundle to Cart
              </Button>
              <p className="text-sm text-gray-600 text-center">
                These items are frequently purchased together by other customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
