import ArrowRight from "../../../assets/icons/chevron-right.svg";
import ArrowLeft from "../../../assets/icons/left-chevron.svg";
import Icon from "../../../assets/icons/telescope.png";
import CategroyCard from "../../CategroyCard";
import { useAtom } from "jotai";
import { categoriesAtom } from "../../../Store/categoryAtom";
import { getCategories } from "../../../api/categoryApi";
import { useEffect } from "react";

export default function TopCategories() {
  const [categories, setCategories] = useAtom(categoriesAtom);

  useEffect(() => {
    const loadCategories = async () => {
      const res = await getCategories();
      console.log(res);
      setCategories(res);
    };

    if (categories.length === 0) {
      loadCategories();
    }
  }, [categories, setCategories]);
  return (
    <section className="px-15 space-y-6">
      {/* Top Categories Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-g-900">Top Categories</h3>
        <div className="flex space-x-6">
          <button className="py-2.5 px-4 bg-g-disabled rounded-lg cursor-pointer">
            <img src={ArrowLeft} alt="left-arrow" />
          </button>
          <button className="py-2.5 px-4 bg-g-disabled rounded-lg cursor-pointer">
            <img src={ArrowRight} alt="right-arrow" />
          </button>
        </div>
      </div>

      {/* Top Categories Cards */}
      <div className="grid grid-cols-4 gap-8">
        {categories.map((category) => (
          <CategroyCard
            key={category.id}
            categoryIcon={category.imageUrl}
            categoryTitle={category.name}
            categoryDescription={category.coursesCount}
          />
        ))}
      </div>
    </section>
  );
}
