import { useState } from "react";
import ChevronUp from "../assets/icons/chevron-up.svg";
import ChevronDown from "../assets/icons/down-chevron.svg";

export default function DropDownMenu({ sort, setSort }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const options = [
    { label: "The latest", value: "latest" },
    { label: " The oldest", value: "oldest" },
    { label: "Highest Price", value: "highest-price" },
    { label: "Lowest Price", value: "lowest-price" },
  ];

  const selectedLabel =
    options.find((option) => option.value === sort)?.label || "The latest";

  const handleSelect = (value) => {
    setSort(value);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative dropdown-menu">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="py-2.5 px-6 rounded-lg border border-g-900 text-sm font-medium flex items-center justify-between min-w-[170px]"
      >
        {selectedLabel}
        {isMenuOpen ? (
          <img src={ChevronUp} alt="chevron-up" className="ml-1.5 w-4 h-4" />
        ) : (
          <img
            src={ChevronDown}
            alt="chevron-down"
            className="ml-1.5 w-4 h-4"
          />
        )}
      </button>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="absolute w-full py-1.5 bg-white shadow-dropmenu border border-gray-200 z-10 rounded-lg mt-2">
          <ul className="text-sm text-g-900 font-medium">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left hover:bg-gray-100 px-6 py-1.5 `}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
