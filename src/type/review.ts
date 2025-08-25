
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

export interface IUser {
  id: number;
  email: string;
  name: string;
  avatar: string;
  phone: string;
  role: string;
  isActive: boolean;
}

export interface IReview {
  id: number;
  user: IUser;
  productId: number;
  comment: string;
  rating: number;
  createdAt: Date;
}

