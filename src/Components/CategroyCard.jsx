import { useAtom } from "jotai";
import { apiAtom } from "../Store/apiAtom";

export default function CategroyCard({
  categoryIcon,
  categoryTitle,
  categoryDescription,
}) {
  const [Api] = useAtom(apiAtom);

  return (
    <div className="py-6  rounded-2xl border border-graylight shadow-md">
      <div className="flex flex-col space-y-2.5 text-center justify-center items-center">
        {/* Category Icon */}
        <div className="h-[100px] w-[100px] bg-primary-100 rounded-full flex items-center justify-center text-center">
          <img src={`${Api}${categoryIcon}`} alt="Category Icon" />
        </div>

        {/* Category Title */}
        <h3 className="text-xl font-semibold text-g-900">{categoryTitle}</h3>
        {/* Category Description */}
        <p className="text-[16px] text-g-700">{categoryDescription}</p>
      </div>
    </div>
  );
}
