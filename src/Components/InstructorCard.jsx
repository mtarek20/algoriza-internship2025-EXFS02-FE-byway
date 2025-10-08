import { useAtom } from "jotai";
import StarRate from "../assets/icons/star.svg";
import { apiAtom } from "../Store/apiAtom";

export default function InstructorCard({ data }) {
  const [Api] = useAtom(apiAtom);

  return (
    <div className="p-4 rounded-2xl border border-graylight shadow-shadow">
      <div className="flex flex-col items-center space-y-4">
        {/* Instructor Image */}
        <img
          src={`${Api}${data.imageUrl}`}
          alt="instructor-image"
          className="w-full h-[132px] rounded-lg object-cover"
        />

        {/* Instructor Name */}
        <div className="text-center ">
          <h3 className="text-lg font-semibold text-g-900 ">{data.name}</h3>
          <p className="text-sm text-g-700 ">{data.jobTitle}</p>
        </div>

        <div className=" border-t border-graylight  w-full"></div>

        <div className="flex justify-between items-center w-full ">
          {/* Instructor Rating */}
          <div className="flex items-center space-x-1">
            <img src={StarRate} alt="rating-star" />
            <p className="text-xs font-semibold text-g-900 ">{data.rate}</p>
          </div>

          {/* Student Number */}
          <p className="text-xs font-semibold text-g-700 ">
            {data.studentsCount} Students
          </p>
        </div>
      </div>
    </div>
  );
}
