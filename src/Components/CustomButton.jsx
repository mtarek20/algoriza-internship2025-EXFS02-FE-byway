import ArrowIcon from "../assets/icons/arrow-narrow-right.svg";
export default function CustomButton({
  title,
  withIcon = true,
  isBorderd = false,
  fullWidth = false,
  onClick,
  disabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2.5 flex rounded-lg text-center cursor-pointer  ${
        isBorderd
          ? "border border-gray-textdark text-gray-textdark"
          : "bg-g-textDark text-white"
      } ${fullWidth && "w-full"}`}
      style={disabled ? { opacity: 0.5 } : {}}
    >
      <h3 className="text-sm w-full font-medium  mr-1.5 ">{title}</h3>
      {withIcon && <img src={ArrowIcon} alt="arrow-icon" />}
    </button>
  );
}
