import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

export default function RatingFilter({ onChange }) {
  const [rating, setRating] = useState(null);

  const handleRating = (value) => {
    const newValue = rating === value ? null : value;
    setRating(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="mb-6">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            className={`cursor-pointer transition-colors duration-200 ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            <StarIcon className="w-6 h-6" />
          </span>
        ))}
      </div>
    </div>
  );
}
