import { RatingFilter } from "@/components/common/RatingFilter";
import { Button } from "@/components/ui/button";
import { Reply, Star } from "lucide-react";
import React from "react";
import type { IProductDetail } from "@/type/products";

interface Props {
  productDetail?: IProductDetail;
}

const ProductDetailReview = ({ productDetail }: Props) => {
  const reviews = [
    {
      rating: 5,
      date: "June 12, 2025",
      text: "I've been using this iMac for about a month now and I'm extremely impressed with both the performance and the design...",
      helpful: 24,
    },
    {
      rating: 4,
      date: "June 5, 2025",
      text: "The iMac is beautiful and performs very well for everyday tasks...",
      helpful: 18,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header: Rating Summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-1">
            <p>{productDetail?.averageRating ?? 0}</p>
            <RatingFilter averageRating={productDetail?.averageRating ?? 0} />
          </div>
          <span className="text-2xl text-border-primary">|</span>
          <div className="flex items-center gap-1">
            <p>{productDetail?.reviewCount ?? 0}</p>
            <p className="text-muted-foreground">ratings</p>
          </div>
          <div className="flex items-center gap-1">
            <p>{productDetail?.reviewCount ?? 0}</p>
            <p className="text-muted-foreground">reviews</p>
          </div>
        </div>
        <Button className="mt-4 md:mt-0 bg-txt-blue hover:bg-txt-primary-blue/90 text-white">
          Write a Review
        </Button>
      </div>

      {/* Reviews */}
      <div className="border-t border-border pt-6 space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-border pb-6">
            <div className="flex justify-between">
              <div className="flex items-center mt-1 text-yellow-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  by Verified Purchase
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {review.date}
              </span>
            </div>

            <p className="mt-3 text-muted-foreground">{review.text}</p>

            <div className="mt-3">
              <Button
                variant="ghost"
                size="default"
                className="text-sm text-muted-foreground flex items-center gap-1"
              >
                <Reply className="h-4 w-4" /> Reply
              </Button>
            </div>
          </div>
        ))}

        <div className="text-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailReview;
