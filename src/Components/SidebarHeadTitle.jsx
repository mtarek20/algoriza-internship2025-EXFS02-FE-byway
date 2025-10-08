import ChevronUp from "../assets/icons/chevron-up.svg";

export default function SidebarHeadTitle({ title }) {
  return (
    <div className="w-full ">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-[16px] font-medium text-g-900">{title}</h3>
        <img src={ChevronUp} alt="arrow-up-icon" />
      </div>
      <div className="border-t border-graylight w-full"></div>
    </div>
  );
}
