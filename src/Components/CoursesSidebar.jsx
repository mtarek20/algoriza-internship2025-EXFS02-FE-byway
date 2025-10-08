import { useState, useEffect } from "react";
import CustomCheckInput from "./CustomCheckInput";
import CustomRadioInput from "./CustomRadioInput";
import RatingFilter from "./RatingFilter";
import SidebarHeadTitle from "./SidebarHeadTitle";
import { getCategories } from "../api/categoryApi";

export default function CoursesSidebar({ filters, setFilters }) {
  const [apiCategories, setApiCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => setApiCategories(res));
  }, []);

  const handleRatingChange = (rating) => {
    setFilters((prev) => ({
      ...prev,
      minRating: rating,
      maxRating: 5,
    }));
  };

  // ✅ Handle Lectures Range
  const handleLecturesChange = (range) => {
    const [min, max] = range;
    setFilters((prev) => ({
      ...prev,
      minLectures: min,
      maxLectures: max,
    }));
  };

  // ✅ Handle Price Range
  const handlePriceChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: 0,
      maxPrice: value,
    }));
  };

  // ✅ Handle Category Multi Select
  const handleCategoryChange = (cat) => {
    setFilters((prev) => {
      const current = prev.categoryNames || [];
      if (current.includes(cat)) {
        return {
          ...prev,
          categoryNames: current.filter((c) => c !== cat),
        };
      } else {
        return {
          ...prev,
          categoryNames: [...current, cat],
        };
      }
    });
  };

  return (
    <div>
      {/* Rating Filter */}
      <div>
        <SidebarHeadTitle title="Rating" />
        <div className="px-4 py-2">
          <RatingFilter onChange={handleRatingChange} />
        </div>
      </div>

      {/* Number of Lectures */}
      <div>
        <SidebarHeadTitle title="Number of Lectures" />
        <div className="px-4 py-2">
          {[
            { label: "1-15", range: [1, 15] },
            { label: "16-30", range: [16, 30] },
            { label: "31-45", range: [31, 45] },
            { label: "More than 45", range: [46, 1000] },
          ].map((item, i) => (
            <CustomRadioInput
              key={i}
              id={i}
              label={item.label}
              onChange={() => handleLecturesChange(item.range)}
              checked={
                filters.minLectures === item.range[0] &&
                filters.maxLectures === item.range[1]
              }
            />
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <SidebarHeadTitle title="Price" />
        <div className="px-4 py-2">
          <div className="relative mb-6">
            <input
              type="range"
              min={0}
              max={1500}
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-500 absolute start-0 -bottom-6">
              $0
            </span>
            <span className="text-sm text-gray-500 absolute end-0 -bottom-6">
              ${filters.maxPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <SidebarHeadTitle title="Category" />
        <div className="px-4 py-2">
          {apiCategories.map((cat, i) => (
            <CustomCheckInput
              key={i}
              id={cat.name}
              label={cat.name}
              value={cat.name}
              onChange={() => handleCategoryChange(cat.name)}
              checked={filters.categoryNames?.includes(cat.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
