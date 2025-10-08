import { useAtom } from "jotai";
import { useEffect } from "react";
import axios from "axios";
import {
  filtersAtom,
  paginationAtom,
  coursesAtom,
  totalPagesAtom,
  loadingAtom,
} from "../state/courseAtoms";

const BASE_URL = "http://localhost:5046/api/Courses";

export function useCourses() {
  const [filters] = useAtom(filtersAtom);
  const [pagination, setPagination] = useAtom(paginationAtom);
  const [courses, setCourses] = useAtom(coursesAtom);
  const [totalPages, setTotalPages] = useAtom(totalPagesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const params = {
          ...filters,
          page: pagination.page,
          limit: pagination.limit,
        };

        const res = await axios.get(`${BASE_URL}/search`, { params });
        setCourses(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filters, pagination.page]);

  return {
    courses,
    totalPages,
    loading,
    pagination,
    setPagination,
  };
}
