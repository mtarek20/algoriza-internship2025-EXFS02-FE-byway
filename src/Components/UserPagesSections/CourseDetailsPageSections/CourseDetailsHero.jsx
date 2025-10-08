import BreadCrump from "../../BreadCrump";
import RatingStars from "../../RatingStars";
import ProfileImage from "../../../assets/images/profile.png";
import CodeIcon from "../../../assets/icons/code-browser.svg";
import CourseDetailCard from "../../CourseDetailCard";
import { useAtom } from "jotai";
import { currentCourseAtom } from "../../../Store/courseAtom";
import { apiAtom } from "../../../Store/apiAtom";

export default function CourseDetailsHero() {
  const [course] = useAtom(currentCourseAtom);
  const [Api] = useAtom(apiAtom);
  return (
    <section className="bg-grayBackground px-15 py-10 flex relative">
      <div className="w-2/3">
        <BreadCrump
          firstBread="Home"
          SecondBread="Courses"
          thirdBread={course.name}
        />
        {/* Course Title And Description */}
        <div className="mt-8 space-y-4">
          <h1 className="text-[40px] font-bold text-g-900 ">{course.name}</h1>
          <p className="text-[16px] text-g-700 mt-4 w-[729px]">
            {course.description}
          </p>
        </div>

        {/* Course info */}
        <div className="mt-6 space-y-4">
          {/* Course Rating */}
          <div className="flex items-center space-x-3">
            <p className="text-warning-300 text-[16px] font-medium ">
              {course.rate}
            </p>
            <RatingStars rating={course.rate} />
            {/* Divider */}
            <div className="border-r border-gray-400 h-4 "></div>
            {/* Course Duration */}
            <p className="text-sm text-g-700">
              {course.totalHours} Total Hours. {course.lecturesNumber} Lectures.
              {""} {course.level}
            </p>
          </div>

          {/* Course Instructor */}
          <div className="flex items-center ">
            <img
              src={`${Api}${course.instructor.imageUrl}`}
              alt="course creator"
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="text-sm text-g-700 ml-2">
              Created by
              <span className="text-primary-600"> {course.instructorName}</span>
            </p>
          </div>

          {/* Course Tag */}
          <div className="flex items-center">
            <img src={CodeIcon} alt="code-icon" />
            <p className="text-sm text-g-700 ml-3"> {course.categoryName}</p>
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <CourseDetailCard />
      </div>
    </section>
  );
}
