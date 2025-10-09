import ArrowRight from "../../../assets/icons/chevron-right.svg";
import ArrowLeft from "../../../assets/icons/left-chevron.svg";
import InstructorCard from "../../InstructorCard";
import { useEffect, useState } from "react";
import { getInstructors } from "../../../api/instructorApi";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TopInstructorSection() {
  const [instructors, setInstructors] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const loadTopInstructors = async () => {
      const res = await getInstructors();
      console.log(res);
      setInstructors(res);
    };

    if (instructors.length === 0) {
      loadTopInstructors();
    }
  }, [instructors.length, setInstructors]);
  return (
    <section className="px-15 space-y-6 overflow-hidden">
      {/* Top Instructors Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-g-900">Top Instructors</h3>
        <div className="flex space-x-6">
          <button
            ref={prevRef}
            className="py-2.5 px-4 bg-g-disabled rounded-lg cursor-pointer"
          >
            <img src={ArrowLeft} alt="left-arrow" />
          </button>
          <button
            ref={nextRef}
            className="py-2.5 px-4 bg-g-disabled rounded-lg cursor-pointer"
          >
            <img src={ArrowRight} alt="right-arrow" />
          </button>
        </div>
      </div>

      {/* Swiper for Instructor Cards */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={5}
        spaceBetween={20}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
      >
        {instructors.map((instructor) => (
          <SwiperSlide key={instructor.id}>
            <InstructorCard data={instructor} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
