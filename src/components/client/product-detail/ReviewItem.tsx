import React, { useState } from "react";
import type { ReviewResponse } from "@/type/review";
import { fetchReviewReplies } from "@/services/review.service";

interface ReviewItemProps {
  review: ReviewResponse;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<ReviewResponse[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const toggleReplies = async () => {
    if (!showReplies) {
      try {
        setLoadingReplies(true);
        const fetchedReplies = await fetchReviewReplies(review.id);
        setReplies(fetchedReplies);
      } catch (error) {
        console.error("Error fetching replies", error);
      } finally {
        setLoadingReplies(false);
      }
    }
    setShowReplies(!showReplies);
  };

  return (
    <div className="p-3 border rounded mb-2">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">{review.name}</p>
          <p>
            <strong>Rating:</strong> {review.rating}
          </p>
          <p>{review.comment}</p>
        </div>
        {review.isRepliesExisting && (
          <button
            className="text-blue-600 hover:underline"
            onClick={toggleReplies}
          >
            {showReplies ? "Ẩn phản hồi" : "Xem phản hồi"}
          </button>
        )}
      </div>

      {showReplies && (
        <div className="pl-5 mt-2 border-l">
          {loadingReplies ? (
            <p>Đang tải phản hồi...</p>
          ) : replies.length === 0 ? (
            <p>Không có phản hồi.</p>
          ) : (
            replies.map((reply) => <ReviewItem key={reply.id} review={reply} />)
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
