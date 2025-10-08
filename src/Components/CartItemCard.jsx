import { useAtom } from "jotai";
import ItemImg from "../assets/images/item-img.png";
import RatingStars from "./RatingStars";
import { apiAtom } from "../Store/apiAtom";

export default function CartItemCard({ item, handleRemove }) {
  const [Api] = useAtom(apiAtom);

  return (
    <div className="p-4 border border-graylight rounded-lg flex justify-between">
      <div className="flex ">
        {/* Item Image */}
        <img
          src={`${Api}${item.course.imageUrl}`}
          alt="course-img"
          className="w-[192px] h-[108px] object-cover rounded-sm"
        />

        <div className="flex flex-col ml-2 space-y-2">
          {/* Item Title And Author */}
          <div>
            <h3 className="text-lg font-semibold ">{item.course.name}</h3>
            <p className="text-sm text-g-700">
              By {item.course.instructorName}
            </p>
          </div>

          {/* Item Rating */}
          <div className="flex items-center space-x-2">
            <p className="text-warning-300 text-size-16 font-medium ">
              {item.course.rate}
            </p>
            <RatingStars rating={item.course.rate} />
            {/* Divider */}
            <div className="border-r border-gray-400 h-4 "></div>
            {/* Course Duration */}
            <p className="text-sm text-g-700">
              {item.course.totalHours} Total Hours. {item.course.lecturesNumber}{" "}
              Lectures. {item.course.level}
            </p>
          </div>

          {/* Remove button */}
          <div>
            <button
              onClick={() => handleRemove(item.course.id)}
              className="text-sm text-error-600 font-normal cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* price */}
      <h3 className="text-2xl font-semibold text-g-900">
        ${item.course.cost.toFixed(2)}
      </h3>
    </div>
  );
}
