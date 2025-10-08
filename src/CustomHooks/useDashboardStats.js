import { useEffect, useState } from "react";
import { getSearchCourses } from "../api/CourseApi";
import { getInstructors } from "../api/instructorApi";
import { getCategories } from "../api/categoryApi";

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    instructors: 0,
    courses: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const [instructorsRes, coursesRes, categoriesRes] = await Promise.all([
        getInstructors(),
        getSearchCourses({ page: 1, limit: 1 }),
        getCategories(),
      ]);

      setStats({
        instructors: instructorsRes?.length || 0,
        courses: coursesRes?.totalCount || coursesRes?.length || 0,
        categories: categoriesRes?.length || 0,
      });
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
};
