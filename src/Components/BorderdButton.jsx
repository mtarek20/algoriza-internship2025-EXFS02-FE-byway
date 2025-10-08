import React from "react";

export default function BorderdButton({ title, isActive = false }) {
  return (
    <div>
      <button
        className={`${
          isActive && "bg-primary-50"
        } px-6 py-4.5 border border-graylight rounded-lg text-center text-sm text-g-900 cursor-pointer hover:bg-primary-50`}
      >
        {title}
      </button>
    </div>
  );
}
