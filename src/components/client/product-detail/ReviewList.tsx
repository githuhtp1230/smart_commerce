import React from "react";
import type { ReviewResponse } from "@/type/review";
import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  reviews: ReviewResponse[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
