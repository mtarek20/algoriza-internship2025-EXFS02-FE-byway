import { atom } from "jotai";

export const ratingAtom = atom(null);
export const lecturesAtom = atom(null);
export const priceRangeAtom = atom([0, 1500]);
export const categoryAtom = atom([]);

export const sortAtom = atom("The latest");

export const resetFilter = atom(null, (get, set) => {
  set(ratingAtom, null);
  set(lecturesAtom, null);
  set(priceRangeAtom, [0, 1500]);
  set(categoryAtom, []);
  set(sortAtom, "The latest");
});
