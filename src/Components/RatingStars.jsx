import { StarIcon } from "@heroicons/react/20/solid";
import StarRate from "../assets/icons/star.svg";

export default function RatingStars({ rating = 5 }) {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={` ${index < rating ? "text-[#EAB308]" : "text-gray-300"}`}
        >
          <StarIcon className="w-5 h-5" />
        </span>
      ))}
    </div>
  );
}
