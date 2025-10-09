import { BellIcon, ChevronDown, ListFilter } from "lucide-react";
import Divider from "../../Components/Divider";
import { useEffect, useState } from "react";
import CustomSearchBar from "../../Components/CustomSearchBar";
import CustomButton from "../../Components/CustomButton";
import {
  createCourse,
  deleteCourse,
  getSearchCourses,
  updateCourse,
} from "../../api/CourseApi";
import AdminCourseCard from "../../Components/AdminComponents/AdminCourseCard";
import DeleteModal from "../../Components/AdminComponents/DeleteModal";
import CourseModal from "../../Components/AdminComponents/CourseModal";
import Pagination from "../../Components/Pagination";
import { getCategories } from "../../api/categoryApi";
import toast from "react-hot-toast";
import AdminSearchBar from "../../Components/AdminComponents/AdminSearchBar";
import FilterMenu from "../../Components/FilterMenu";
import ClipLoader from "react-spinners/ClipLoader";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [price, setPrice] = useState(1500);

  const [modalType, setModalType] = useState(null);
  const [selected, setSelected] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Courses
  const getCourses = async () => {
    setLoading(true);
    try {
      const res = await getSearchCourses({
        name: search,
        categoryName: category || null,
        rating: selectedRating,
        minPrice: 0,
        maxPrice: price,
        page,
        limit: 9,
      });

      setCourses(res.data);
      setTotalPages(res.totalPages);
      setTotalCount(res.totalCount);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, [search, category, page, selectedRating, price]);

  // Save Course (Add / Update)
  const handleSaveCourse = async (payload, type, id) => {
    try {
      if (type === "add") {
        await createCourse(payload);
        toast.success("Course created successfully");
      } else if (type === "update") {
        await updateCourse(id, payload);
        toast.success("Course updated successfully");
      }
      getCourses();
      setModalType(null);
      setSelected(null);
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error(err.response.data);
      } else {
        toast.error("Failed to save course");
      }
    }
  };

  // Delete Course
  const handleDelete = async () => {
    if (!deleteItem) return;
    try {
      await deleteCourse(deleteItem.id);
      toast.success("Course deleted successfully");
      setDeleteItem(null);
      getCourses();
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error(err.response.data);
      } else {
        toast.error("Failed to delete course");
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-2">
            <h2 className="text-3xl font-medium text-[#202637]">Courses</h2>
            <p className="text-xs text-content-secondery">
              <span className="font-bold">Dashboard</span> / Courses
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-white shadow-notification flex items-center justify-center">
            <BellIcon color="#96A0B6" />
          </div>
        </div>

        <Divider />
      </div>

      {/* Course Modal */}
      {modalType && (
        <CourseModal
          isOpen={!!modalType}
          course={selected}
          modalType={modalType}
          onClose={() => {
            setModalType(null);
            setSelected(null);
          }}
          onSave={handleSaveCourse}
        />
      )}

      {/* All Courses */}
      {!modalType && (
        <div className="bg-white p-6 rounded-[20px] shadow-instructor-table border border-foundation-border mt-11">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-medium text-content-primary">
                Courses
              </h2>
              <span className="bg-greydark text-greyDarkText px-3 py-1 rounded-4xl text-size-16 font-medium ">
                {totalCount}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Add course Button */}
              <CustomButton
                title="Add Course"
                withIcon={false}
                onClick={() => {
                  setModalType("add");
                  setSelected(null);
                }}
              />

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="py-2 px-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* SearchBar */}
              <div className="shadow-md rounded-lg">
                <AdminSearchBar
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  value={search}
                  placeholder="Search for Courses"
                />
              </div>

              {/* Filter */}
              <FilterMenu
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                price={price}
                setPrice={setPrice}
              />
            </div>
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center my-20">
              <ClipLoader color="#3b82f6" />
            </div>
          )}

          {/* Courses Grid */}
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <AdminCourseCard
                  key={course.id}
                  course={course}
                  onView={() => {
                    setModalType("view");
                    setSelected(course);
                  }}
                  onEdit={() => {
                    setModalType("update");
                    setSelected(course);
                  }}
                  onDelete={() => setDeleteItem(course)}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center my-20">
              <p>No Courses Found</p>
            </div>
          )}
          {/* Pagination */}
          {courses.length > 0 && (
            <div className="flex justify-center mt-10">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          )}
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        Name={deleteItem?.name}
      />
    </div>
  );
}
