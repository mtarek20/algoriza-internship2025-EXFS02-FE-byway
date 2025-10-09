import { useState, useRef, useEffect } from "react";
import { ListFilter } from "lucide-react";

const FilterMenu = ({ selectedRating, setSelectedRating, price, setPrice }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
    // onFilterChange({ rating, price });
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    // onFilterChange({ rating: selectedRating, price: newPrice });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 border border-foundation-border shadow-md rounded-lg flex justify-center items-center"
      >
        <ListFilter className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-xl p-4 z-50 border border-foundation-border">
          <div className="mb-4">
            <p className="font-medium mb-2">Rating</p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingSelect(star)}
                  className={`text-xl ${
                    selectedRating >= star ? "text-yellow-400" : "text-gray-300"
                  } hover:text-yellow-400 transition`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Price Range</p>
            <input
              type="range"
              min="0"
              max="1500"
              step="50"
              value={price}
              onChange={handlePriceChange}
              className="w-full accent-blue-500"
            />

            <p className="text-sm text-gray-500 text-center mt-1">${price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
