import InstructorImg from "../../../assets/images/instructor-profile.png";
import graduationHatIcon from "../../../assets/icons/graduation-hat-02.svg";
import AwardIcon from "../../../assets/icons/award-03.svg";
import PlayIcon from "../../../assets/icons/play.svg";
import { useAtom } from "jotai";
import { currentCourseAtom } from "../../../Store/courseAtom";
import { apiAtom } from "../../../Store/apiAtom";

export default function CourseDetailsInstructorSection() {
  const [currentCourse] = useAtom(currentCourseAtom);
  const [Api] = useAtom(apiAtom);

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-xl font-semibold text-g-900">Instructor</h3>

      <div>
        <h2 className="text-xl font-semibold text-primary-600">
          {currentCourse.instructor.name}
        </h2>
        <p className="text-[16px] text-g-700">
          {currentCourse.instructor.jobTitle}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <img
          src={`${Api}${currentCourse.instructor.imageUrl}`}
          alt="instructor-image"
          className="w-[120px] h-[120px] rounded-full object-cover bg-gray-300"
        />
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-1 items-center">
            <img src={AwardIcon} alt="award-icon" />
            <p className="text-sm text-g-900">40,445 Reviews</p>
          </div>
          <div className="flex space-x-1 items-center">
            <img src={graduationHatIcon} alt="award-icon" />
            <p className="text-sm text-g-900">
              {currentCourse.instructor.studentsCount} Students
            </p>
          </div>
          <div className="flex space-x-1 items-center">
            <img src={PlayIcon} alt="award-icon" />
            <p className="text-sm text-g-900">
              {currentCourse.instructor.coursesCount} Courses
            </p>
          </div>
        </div>
      </div>

      <p className="text-size-16 text-g-700">
        With over a decade of industry experience, Ronald brings a wealth of
        practical knowledge to the classroom. He has played a pivotal role in
        designing user-centric interfaces for renowned tech companies, ensuring
        seamless and engaging user experiences.
      </p>
    </div>
  );
}
