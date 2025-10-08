import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getSearchCourses } from "../api/CourseApi";
import { useAtom } from "jotai";
import { apiAtom } from "../Store/apiAtom";

export default function CustomSearchBar({ placeholder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [Api] = useAtom(apiAtom);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setResults([]);
      setShowResults(false);
      return;
    }
    try {
      const res = await getSearchCourses({ name: value });
      setResults(res.data || []);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <div className="relative flex-1">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => results.length > 0 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="w-full py-2.5 pl-9 border border-inputGray rounded-md text-sm text-gray-700 focus:outline-none"
        />
        <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      {showResults && results.length > 0 && (
        <ul className="absolute z-50 bg-white border border-gray-200 rounded-md mt-2 w-full max-h-72 overflow-y-auto shadow-lg">
          {results.map((course) => (
            <li key={course.id}>
              <Link
                to={`/courses/${course.id}`}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50"
              >
                <img
                  src={`${Api}${course.imageUrl}`}
                  alt={course.name}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {course.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {course.instructorName}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
