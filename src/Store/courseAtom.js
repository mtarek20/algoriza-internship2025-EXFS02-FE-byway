import { atom } from "jotai";

export const coursesAtom = atom([]);
export const topCoursesAtom = atom([]);
export const pagedCoursesAtom = atom([]);
export const currentCourseAtom = atom(null);
export const totalPagesAtom = atom(1);
export const loadingAtom = atom(false);

export const filtersAtom = atom({
  name: "",
  categoryName: "",
  minPrice: null,
  maxPrice: null,
  minRating: null,
  maxRating: null,
  minLectures: null,
  maxLectures: null,
  sort: "The latest",
});

export const paginationAtom = atom({
  page: 1,
  limit: 9,
});
