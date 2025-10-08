import { Link } from "react-router-dom";
import CourseCard from "../../CourseCard";
import { useAtom } from "jotai";
import { coursesAtom } from "../../../Store/courseAtom";
import { useEffect } from "react";
import { getCourses } from "../../../api/CourseApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TopCoursesSection() {
  const [courses, setCourses] = useAtom(coursesAtom);

  useEffect(() => {
    const loadTopCourses = async () => {
      const res = await getCourses();
      setCourses(res);
    };

    if (courses.length === 0) {
      loadTopCourses();
    }
  }, [courses.length, setCourses]);

  const topCourses = courses.sort((a, b) => b.rate - a.rate);
  return (
    <section className="px-15 space-y-6">
      {/* Top Courses Header */}
      <div className="flex items-center justify-between">
        <h3 className={`text-2xl font-semibold text-g-900`}>Top Courses</h3>
        <Link to="courses">
          <p className="text-sm text-primary-500 cursor-pointer">See All</p>
        </Link>
      </div>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        className="pb-6 "
      >
        <div>
          {topCourses.map((course) => (
            <SwiperSlide key={course.id}>
              <Link to={`/courses/${course.id}`} key={course.id}>
                <CourseCard data={course} />
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {/* Top Courses Cards */}
    </section>
  );
}
// className = "grid grid-cols-4 gap-7";
