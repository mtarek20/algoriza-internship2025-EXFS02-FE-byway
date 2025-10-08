import { Edit3, Eye, Trash } from "lucide-react";
import RatingStars from "../RatingStars";
import { useAtom } from "jotai";
import { apiAtom } from "../../Store/apiAtom";

export default function AdminCourseCard({ course, onView, onEdit, onDelete }) {
  const [Api] = useAtom(apiAtom);

  return (
    <div className="p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
      {/* Course Image + Category */}
      <div className="relative">
        <img
          src={`${Api}${course.imageUrl}`}
          alt={course.name}
          className="h-[140px] w-full rounded-lg object-cover"
        />
        <div className="absolute top-2 left-2 bg-violet-light py-1 px-4 rounded-full">
          <p className="text-sm font-medium text-violet-normal">
            {course.categoryName}
          </p>
        </div>
      </div>

      {/* Course Title */}
      <h3 className="text-lg font-semibold text-g-900 mt-4 line-clamp-1">
        {course.name}
      </h3>

      {/* Instructor */}
      <p className="text-sm text-g-700 mt-1.5 mb-2">
        By {course.instructorName}
      </p>

      {/* Rating */}
      <RatingStars rating={course.rate} />

      {/* Info */}
      <p className="text-xs font-medium text-g-700 mt-2">
        {course.totalHours}h • {course.lecturesNumber} Lectures • {course.level}
      </p>

      {/* Price */}
      <p className="text-xl font-semibold text-g-900 mt-2">${course.cost}.00</p>

      {/* Actions */}
      <div className="flex justify-start items-center space-x-3 mt-4">
        <button
          onClick={() => onView(course)}
          className="p-2.5 border border-foundation-border shadow-sm text-violet-normal bg-white rounded-lg hover:bg-gray-50 transition"
        >
          <Eye className="w-4 h-4" />
        </button>

        <button
          onClick={() => onEdit(course)}
          className="p-2.5 border border-foundation-border shadow-sm text-violet-normal bg-white rounded-lg hover:bg-gray-50 transition"
        >
          <Edit3 className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDelete(course)}
          className="p-2.5 border border-foundation-border shadow-sm bg-white rounded-lg text-[#EB5757] hover:bg-red-50 transition"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
