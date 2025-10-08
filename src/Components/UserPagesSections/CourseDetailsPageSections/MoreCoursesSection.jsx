import React from "react";
import CourseCard from "../../CourseCard";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { coursesAtom } from "../../../Store/courseAtom";

export default function MoreCoursesSection() {
  const { id } = useParams();
  const [courses] = useAtom(coursesAtom);
  const currentCourse = courses.find((course) => course.id === parseInt(id));
  const similarCourses = courses
    .filter(
      (c) =>
        c.categoryId === currentCourse?.categoryId && c.id !== currentCourse.id
    )
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);
  return (
    <div className="px-15 py-29 space-y-6">
      <h3 className="text-xl font-semibold text-g-900">
        More Courses Like This
      </h3>

      <div className="grid grid-cols-4 gap-7  ">
        {similarCourses.map((course) => (
          <CourseCard key={course.id} data={course} />
        ))}
      </div>
    </div>
  );
}
