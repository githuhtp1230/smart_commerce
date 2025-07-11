import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import StarSelector from "./StarSelector";

interface Props {
  onClose: () => void;
  onSubmit: (review: { comment: string; rating: number }) => void;
}

const ReviewModal = ({ onClose, onSubmit }: Props) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit({ comment, rating });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-background-secondary p-6 rounded-lg space-y-4 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold">Viết đánh giá sản phẩm</h2>
        <Input
          placeholder="Nhập nội dung đánh giá"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <StarSelector rating={rating} onChange={(value) => setRating(value)} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button
            className="bg-txt-blue hover:bg-txt-primary-blue/90 text-white"
            onClick={handleSubmit}
          >
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
