export interface ReviewResponse {
  id: number;
  productId: number;
  userId: number;
  parentReviewId: number | null;
  rating: number;
  comment: string;
  createdAt: string;
  isRepliesExisting: boolean;
  replies?: ReviewResponse[] | null;
  name: string;  
  parentReviewName?: string;
  avatar: string;
}
export interface ReviewRequest {
  comment: string;
  rating: number;
  parentReviewId?: number | null;
}
