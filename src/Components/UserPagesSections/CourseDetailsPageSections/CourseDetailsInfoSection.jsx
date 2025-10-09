import BorderdButton from "../../BorderdButton";
import Divider from "../../Divider";
import CourseDetailsInstructorSection from "./CourseDetailsInstructorSection";
import CourseDetailsContentSection from "./CourseDetailsContentSection";
import { useAtom } from "jotai";
import { currentCourseAtom } from "../../../Store/courseAtom";
import { useRef } from "react";
import CourseDetailsReviewsSection from "./CourseDetailsReviewsSection";

export default function CourseDetailsInfoSection() {
  const tabs = ["Description", "Instructor", "Content", "Reviews"];
  const [course] = useAtom(currentCourseAtom);

  // ✅ مراجع لكل جزء في الصفحة
  const descriptionRef = useRef(null);
  const instructorRef = useRef(null);
  const contentRef = useRef(null);
  const reviewsRef = useRef(null);

  // ✅ خريطة تربط أسماء التابس بالمراجع
  const sectionRefs = {
    Description: descriptionRef,
    Instructor: instructorRef,
    Content: contentRef,
    Reviews: reviewsRef,
  };

  // ✅ وظيفة التمرير السلس
  const handleTabClick = (tab) => {
    const section = sectionRefs[tab]?.current;
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="mt-10 px-15 space-y-6 w-2/3">
        {/* Buttons */}
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <BorderdButton
              key={tab}
              title={tab}
              onClick={() => handleTabClick(tab)}
            />
          ))}
        </div>
        <Divider />

        {/* Description */}
        <div ref={descriptionRef}>
          <h3 className="text-xl font-semibold text-g-900">Description</h3>
          <p className="text-[16px] text-g-700 mt-1 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Certification */}
        <div>
          <h3 className="text-xl font-semibold text-g-900">Certification</h3>
          <p className="text-[16px] text-g-700 mt-1 leading-relaxed">
            {course.certification}
          </p>
        </div>

        <Divider />

        {/* Instructor Info */}
        <CourseDetailsInstructorSection instructorRef={instructorRef} />

        <Divider />
        {/* Content Info */}
        <CourseDetailsContentSection course={course} contentRef={contentRef} />

        <Divider />
      </div>
      {/* Reviews */}
      <CourseDetailsReviewsSection reviewsRef={reviewsRef} />
    </>
  );
}
