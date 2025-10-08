import ArrowRight from "../assets/icons/chevron-right.svg";
import ArrowLeft from "../assets/icons/left-chevron.svg";

export default function SectionHeader({ title, className }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className={`${className} text-2xl font-semibold text-g-900`}>
        {title}
      </h3>
      <div className="flex space-x-6">
        <button className="py-2.5 px-4 bg-g-disabled rounded-lg cursor-pointer">
          <img src={ArrowLeft} alt="left-arrow" />
        </button>
        <button className="py-2.5 px-4 bg-g-disabled rounded-lg cursor-pointer">
          <img src={ArrowRight} alt="right-arrow" />
        </button>
      </div>
    </div>
  );
}
