import { useEffect, useState } from "react";
import { Eye, Edit, Trash2, ListFilter, BellIcon } from "lucide-react";
import { StarIcon } from "@heroicons/react/20/solid";
import CustomButton from "../../Components/CustomButton";
import CustomSearchBar from "../../Components/CustomSearchBar";
import Pagination from "../../Components/Pagination";
import Divider from "../../Components/Divider";
import {
  deleteInstructor,
  getSearchInstructors,
} from "../../api/instructorApi";
import InstructorModal from "../../Components/AdminComponents/InstructorModal";
import DeleteModal from "../../Components/AdminComponents/DeleteModal";
import RatingStars from "../../Components/RatingStars";
import toast from "react-hot-toast";
import AdminSearchBar from "../../Components/AdminComponents/AdminSearchBar";

export default function Instructors() {
  const [search, setSearch] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [selected, setSelected] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async () => {
    const data = await getSearchInstructors(search, page);
    setInstructors(data.instructors);
    setTotalInstructors(data.total);
    setTotalPages(data.totalPages);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, [search, page]);

  useEffect(() => {
    setPage(1);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteInstructor(id);
      getData();
      toast.success("Course deleted successfully");
      setDeleteId(null);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data);
      } else {
        toast.error("Failed to delete course");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div className="flex items-end gap-2">
          <h2 className="text-3xl font-medium text-[#202637]">Instructors</h2>
          <p className="text-xs text-content-secondery">
            <span className="font-bold">Dashboard</span> / Instructors
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-white shadow-notification flex items-center justify-center">
          <BellIcon color="#96A0B6" />
        </div>
      </div>

      <Divider />

      {/* Table */}
      <div className="bg-white p-6 rounded-[20px] shadow-instructor-table border border-foundation-border">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-medium text-content-primary">
              Instructors
            </h2>
            <span className="bg-greydark text-greyDarkText px-3 py-1 rounded-4xl text-size-16 font-medium ">
              {totalInstructors}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Add Instructor Button */}
            <CustomButton
              title="Add Instructor"
              withIcon={false}
              onClick={() => setModalType("add")}
            />

            {/* SearchBar */}
            <div className="shadow-md rounded-lg">
              <AdminSearchBar
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search for Instructors"
              />
            </div>

            {/* Filter */}
            <div className="p-2.5 border border-foundation-border shadow-md rounded-lg flex justify-center items-center">
              <button className="text-shadow-content-tertiary hover:text-gray-600">
                <ListFilter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg  border border-graylight">
          <table className="min-w-full  ">
            <thead className="bg-[#F1F5FF] ">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-content-primary">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-content-primary">
                  Job Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-content-primary">
                  Rate
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-content-primary">
                  Action
                </th>
              </tr>
            </thead>

            {instructors.length === 0 && (
              <tbody>
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-content-primary "
                  >
                    No Instructors Found
                  </td>
                </tr>
              </tbody>
            )}
            <tbody className="bg-white divide-y divide-graylight">
              {instructors.map((instructor) => (
                <tr key={instructor.id}>
                  {/* Name */}
                  <td className="px-6 py-4  text-sm font-medium text-content-primary">
                    {instructor.name}
                  </td>

                  {/* Job Title */}
                  <td className="px-6 py-4  text-sm text-content-primary font-medium">
                    {instructor.jobTitle}
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4 ">
                    <RatingStars rating={instructor.rate} />
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4  text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {/* View */}
                      <button
                        onClick={() => {
                          setSelected(instructor);
                          setModalType("view");
                        }}
                        className="text-violet-normal hover:text-primary-600 p-1 rounded"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {/* Update */}
                      <button
                        onClick={() => {
                          setSelected(instructor);
                          setModalType("update");
                        }}
                        className="text-violet-normal hover:text-primary-600 p-1 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          setDeleteId(instructor.id);
                          setSelected(instructor);
                        }}
                        className="text-red-600 hover:text-red-800 p-1 rounded "
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalType && (
          <InstructorModal
            type={modalType}
            instructor={selected}
            onClose={() => {
              setModalType(null);
              setSelected(null);
              getData();
            }}
          />
        )}

        {
          <DeleteModal
            isOpen={!!deleteId}
            onClose={() => setDeleteId(null)}
            onConfirm={() => handleDelete(deleteId)}
            Name={selected?.name}
          />
        }

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
}
