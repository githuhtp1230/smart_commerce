import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  averageRating?: number;
  className?: string;
}

export function RatingFilter({ averageRating, className }: Props) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  useEffect(() => {
    if (averageRating) {
      setRating(Math.floor(averageRating));
    }
  }, [averageRating]);

  return (
    <div className={cn("flex space-x-1", className)}>
      {[1, 2, 3, 4, 5].map((ratingValue) => (
        <Star
          key={ratingValue}
          className={`h-4 w-4 cursor-pointer ${
            (
              hoveredRating !== null
                ? hoveredRating >= ratingValue
                : rating !== null && rating >= ratingValue
            )
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
          onMouseEnter={() => setHoveredRating(ratingValue)}
          onMouseLeave={() => setHoveredRating(null)}
          onClick={() => setRating(ratingValue === rating ? null : ratingValue)}
        />
      ))}
    </div>
  );
}
