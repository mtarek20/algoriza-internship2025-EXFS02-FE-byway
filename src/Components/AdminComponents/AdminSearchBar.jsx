import { Search } from "lucide-react";
import { useEffect } from "react";
import { getSearchCourses } from "../../api/CourseApi";

export default function AdminSearchBar({ value, placeholder, onChange }) {
  const handleSearch = async () => {
    try {
      await getSearchCourses({
        name: value,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [value]);
  return (
    <div className="relative flex-1">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full py-2.5 pl-9 border border-inputGray rounded-md text-sm text-gray-700 focus:outline-none"
        />
        <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
