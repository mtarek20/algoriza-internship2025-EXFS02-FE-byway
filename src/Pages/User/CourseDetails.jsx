import { useParams } from "react-router-dom";
import CourseDetailsHero from "../../Components/UserPagesSections/CourseDetailsPageSections/CourseDetailsHero";
import CourseDetailsInfoSection from "../../Components/UserPagesSections/CourseDetailsPageSections/CourseDetailsInfoSection";
import CourseDetailsReviewsSection from "../../Components/UserPagesSections/CourseDetailsPageSections/CourseDetailsReviewsSection";
import MoreCoursesSection from "../../Components/UserPagesSections/CourseDetailsPageSections/MoreCoursesSection";
import { useAtom } from "jotai";
import { currentCourseAtom } from "../../Store/courseAtom";
import { useEffect, useState } from "react";
import { getCourse } from "../../api/CourseApi";
import ClipLoader from "react-spinners/ClipLoader";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useAtom(currentCourseAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        const res = await getCourse(id);
        setCourse(res);
        console.log(res);
      } catch (error) {
        console.error(error);
        alert(error.data.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [id, setCourse]);

  if (loading || !course)
    return (
      <div className=" flex justify-center my-20 ">
        <ClipLoader color="#3b82f6" />
      </div>
    );

  return (
    <div>
      <CourseDetailsHero />

      <CourseDetailsInfoSection />

      <CourseDetailsReviewsSection />

      <MoreCoursesSection />
    </div>
  );
}
