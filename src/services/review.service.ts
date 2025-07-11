import type { ReviewRequest, ReviewResponse } from "@/type/review";
import httpRequest from "@/utils/http-request";

/**
 * Lấy danh sách review theo productId
 */
export const fetchReviewsByProduct = async (
  productId: number
): Promise<ReviewResponse[]> => {
  try {
    const res = await httpRequest.get<{ data: ReviewResponse[] }>(
      `/products/${productId}/reviews`
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Tạo review mới (review gốc hoặc reply tuỳ vào parentReviewId)
 */
export const createReview = async (
  productId: number,
  body: ReviewRequest
): Promise<ReviewResponse> => {
  try {
    const res = await httpRequest.post<{ data: ReviewResponse }>(
      `/products/${productId}/reviews`,
      body
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Cập nhật review
 */
export const updateReview = async (
  reviewId: number,
  reviewRequest: ReviewRequest
): Promise<ReviewResponse> => {
  try {
    const res = await httpRequest.put<{ data: ReviewResponse }>(
      `/reviews/${reviewId}`,
      reviewRequest
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Xoá review
 */
export const deleteReview = async (reviewId: number): Promise<void> => {
  try {
    await httpRequest.delete(`/reviews/${reviewId}`);
  } catch (error) {
    throw error;
  }
};

/**
 * Lấy danh sách review gốc (root reviews) theo productId
 */
export const fetchRootReviews = async (
  productId: number
): Promise<ReviewResponse[]> => {
  try {
    const res = await httpRequest.get<{ data: ReviewResponse[] }>(
      `/products/${productId}/reviews`
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Lấy danh sách replies theo reviewId
 */
export const fetchReviewReplies = async (
  reviewId: number
): Promise<ReviewResponse[]> => {
  try {
    const res = await httpRequest.get<{ data: ReviewResponse[] }>(
      `/reviews/${reviewId}/replies`
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
  