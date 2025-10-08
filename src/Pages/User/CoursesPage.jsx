import { useEffect, useState } from "react";
import CourseCard from "../../Components/CourseCard";
import CoursesSidebar from "../../Components/CoursesSidebar";
import DropDownMenu from "../../Components/DropDownMenu";
import Pagination from "../../Components/Pagination";
import Filter from "../../assets/icons/filter.svg";
import { Link } from "react-router-dom";
import { getSearchCourses } from "../../api/CourseApi";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  const [sort, setSort] = useState("The Latest");
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1500,
    minRating: 0,
    maxRating: 5,
    minLectures: 0,
    maxLectures: 1000,
    categoryNames: [],
    sortBy: sort,
  });

  const handleSortChange = (value) => {
    setSort(value);
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  useEffect(() => {
    getSearchCourses({ ...filters, page, limit })
      .then((res) => {
        setCourses(res.data);
        setTotalPages(res.totalPages);
      })
      .catch((err) => console.error(err));
  }, [filters, page, sort]);

  return (
    <div className="px-15 pt-13">
      <div className="space-y-6">
        <h1 className="text-[40px] font-bold text-g-900">Design Courses</h1>
        <h3 className="text-2xl font-semibold text-g-900">
          All Development Courses
        </h3>

        {/* Filter and Sort buttons */}
        <div className="flex justify-between">
          <button className="py-2.5 px-6 rounded-lg border border-g-900 text-sm font-medium flex items-center">
            <img src={Filter} alt="filter-icon" className="mr-1.5" /> Filter
          </button>

          <div className="flex items-center space-x-4">
            <span>Sort By</span>
            <DropDownMenu sort={sort} setSort={handleSortChange} />
          </div>
        </div>
      </div>

      {/* Sidebar + Courses */}
      <div className="flex mt-5 gap-4 justify-between">
        <div className="w-1/4">
          <CoursesSidebar filters={filters} setFilters={setFilters} />
        </div>

        <div className="w-3/4">
          {courses.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <h2 className="text-2xl font-semibold text-gray-600">
                No courses found
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-3 space-x-4 space-y-6">
              {courses.map((course) => (
                <div key={course.id}>
                  <Link to={`/courses/${course.id}`}>
                    <CourseCard data={course} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mb-10">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}
