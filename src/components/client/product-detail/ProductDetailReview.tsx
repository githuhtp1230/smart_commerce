import { RatingFilter } from "@/components/common/RatingFilter";
import { Button } from "@/components/ui/button";
import { Reply, Star, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import type { IProductDetail } from "@/type/products";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReviewResponse, ReviewRequest } from "@/type/review";
import {
  fetchReviewsByProduct,
  createReview,
  fetchReviewReplies,
} from "@/services/review.service";
import ReviewModal from "./ReviewModal";

interface Props {
  productDetail?: IProductDetail;
}

const ProductDetailReview = ({ productDetail }: Props) => {
  const productId = productDetail?.id;
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery<ReviewResponse[]>({
    queryKey: ["reviews", productId],
    queryFn: () => fetchReviewsByProduct(productId!),
    enabled: !!productId,
  });

  const handleSubmitReview = async ({
    comment,
    rating,
  }: {
    comment: string;
    rating: number;
  }) => {
    if (!productId) return;
    const newReview: ReviewRequest = { comment, rating, parentReviewId: null };
    try {
      await createReview(productId, newReview);
      setReviewModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Lỗi khi tạo đánh giá:", error);
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center mt-1 text-yellow-400">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
      {[...Array(5 - rating)].map((_, i) => (
        <Star key={i} className="h-4 w-4" />
      ))}
    </div>
  );

  const ReviewItem = ({
    review,
    isReply = false,
  }: {
    review: ReviewResponse;
    isReply?: boolean;
  }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState<ReviewResponse[]>([]);
    const [loadingReplies, setLoadingReplies] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [replyComment, setReplyComment] = useState("");
    const toggleReplies = async () => {
      if (!showReplies && review.isRepliesExisting) {
        try {
          setLoadingReplies(true);
          const fetchedReplies = await fetchReviewReplies(review.id);
          setReplies(fetchedReplies);
        } catch (error) {
          console.error("Lỗi khi lấy replies:", error);
        } finally {
          setLoadingReplies(false);
        }
      }
      setShowReplies(!showReplies);
    };

    return (
      <div
        className={`border-border ${
          isReply ? "ml-6 pl-4 border-l" : "border-b pb-6"
        }`}
      >
        
        <div className="flex justify-between">
          {!isReply && renderStars(review.rating)}
          <span className="text-sm text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>

        <b className="mb-2 text-muted-foreground border-l-4 border-blue-500 pl-3 italic">
          {review.name}
        </b>
        <p className="mt-2 mb-2 text-muted-foreground border-l-4 border-primary pl-3 italic">
          {review.parentReviewId ? (
            <b className="text-sm text-blue-500">
              {review.parentReviewName ?? "người dùng"}{" "}
            </b>
          ) : null}
          {review.comment}
        </p>

        <div className="mt-3 flex gap-2">
          <Button
            variant="ghost"
            size="default"
            className="text-sm text-muted-foreground flex items-center gap-1"
            onClick={() => setIsReplying(!isReplying)}
          >
            <Reply className="h-4 w-4" /> {isReplying ? "Hủy" : "Trả lời"}
          </Button>
          {isReplying && (
            <div className="mt-3 space-y-2">
              <textarea
                className="w-full border rounded p-2 text-sm resize-none overflow-x-auto overflow-y-hidden whitespace-nowrap"
                rows={1}
                placeholder="Nhập phản hồi..."
                value={replyComment}
                onChange={(e) => setReplyComment(e.target.value)}
              />

              <Button
                className="bg-txt-blue hover:bg-txt-primary-blue/90 text-white"
                size="sm"
                onClick={async () => {
                  try {
                    const replyRequest: ReviewRequest = {
                      comment: replyComment,
                      rating: review.rating, // hoặc 0 nếu bạn không chấm sao cho reply
                      parentReviewId: review.id,
                    };
                    await createReview(review.productId, replyRequest);
                    setReplyComment("");
                    setIsReplying(false);
                    // Reload replies
                    const fetchedReplies = await fetchReviewReplies(review.id);
                    setReplies(fetchedReplies);
                    setShowReplies(true);
                  } catch (error) {
                    console.error("Lỗi khi tạo reply:", error);
                  }
                }}
              >
                Gửi phản hồi
              </Button>
            </div>
          )}

          {review.isRepliesExisting && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleReplies}
              className="text-sm text-muted-foreground flex items-center gap-1"
            >
              {showReplies ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {showReplies ? "Ẩn phản hồi" : "Xem phản hồi"}
            </Button>
          )}
        </div>

        {showReplies && (
          <div className="mt-3 space-y-4">
            {loadingReplies ? (
              <div className="text-muted-foreground text-sm">
                Đang tải phản hồi...
              </div>
            ) : replies.length === 0 ? (
              <div className="text-muted-foreground text-sm">
                Chưa có phản hồi nào.
              </div>
            ) : (
              replies.map((reply) => (
                <ReviewItem key={reply.id} review={reply} isReply={true} />
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
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
        <Button
          className="mt-4 md:mt-0 bg-txt-blue hover:bg-txt-primary-blue/90 text-white"
          onClick={() => setReviewModalOpen(true)}
        >
          Write a Review
        </Button>
      </div>

      <div className="border-t border-border pt-6 space-y-6">
        {isLoading ? (
          <div className="text-center text-muted-foreground">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No reviews yet
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        )}

        <div className="text-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      </div>

      {isReviewModalOpen && (
        <ReviewModal
          onClose={() => setReviewModalOpen(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
};

export default ProductDetailReview;
