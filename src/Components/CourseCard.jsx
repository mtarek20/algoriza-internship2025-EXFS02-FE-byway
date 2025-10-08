import { useAtom } from "jotai";
import RatingStars from "./RatingStars";
import { apiAtom } from "../Store/apiAtom";

export default function CourseCard({ data }) {
  const [Api] = useAtom(apiAtom);

  return (
    <div className="p-4  border border-graylight rounded-2xl shadow overflow-hidden ">
      <div className="flex flex-col">
        {/* Course Image */}
        <div className="relative">
          <img
            src={`${Api}${data.imageUrl}`}
            alt="course-image"
            className="h-[140px] rounded-lg  object-cover"
          />

          {/* Course Tag */}
          <div className="absolute top-2 left-2 bg-violet-light py-1 px-4 rounded-full ">
            <p className="text-sm font-medium text-violet-normal">
              {data.categoryName}
            </p>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-semibold text-g-900 mt-4 text-nowrap overflow-hidden text-ellipsis ">
          {data.name}
        </h3>
        {/* Course Author */}
        <p className="text-sm text-g-700 mt-1.5 mb-2">
          By {data.instructorName}
        </p>

        {/* Course Rating */}
        <RatingStars rating={data.rate} />

        {/* Course Description */}
        <p className="text-xs font-medium text-g-700 mt-2">
          {data.totalHours} Total Hours. {data.lecturesNumber} Lectures.
          {data.level}
        </p>

        {/* Course Price */}
        <p className="text-xl font-semibold text-g-900 mt-2">${data.cost}</p>
      </div>
    </div>
  );
}
