import { Star } from "lucide-react";

interface StarSelectorProps {
  rating: number;
  onChange: (value: number) => void;
}

const StarSelector = ({ rating, onChange }: StarSelectorProps) => {
  return (
    <div className="flex items-center gap-1 cursor-pointer text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => onChange(star)}
          className={`h-6 w-6 ${star <= rating ? "fill-current" : ""}`}
        />
      ))}
    </div>
  );
};

export default StarSelector;
