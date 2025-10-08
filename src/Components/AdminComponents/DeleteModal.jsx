import { X } from "lucide-react";
import DeleteIcon from "../../assets/images/delete.png";
export default function DeleteModal({ Name, isOpen, onConfirm, onClose }) {
  if (!isOpen) return null;

  console.log(Name);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
      <div className="p-5 w-md bg-white rounded-[20px] border border-foundation-border shadow-md space-y-6 text-center">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="relative w-25 h-25 mx-auto rounded-full bg-[#FF5555]/20 flex items-center justify-center ">
          <div className="absolute w-20 h-20 rounded-full flex justify-center items-center  bg-[#FF5555]/10">
            <img src={DeleteIcon} alt="Delete-icon" />
          </div>
        </div>

        <p className="text-lg font-medium text-[#858585] leading-5">
          Are you sure you want to delete this <br /> Instructor
          <span className="text-[#242B42]"> {Name}</span>?
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className=" px-4 py-3 text-g-700 bg-[#EDEDED] rounded-lg text-size-16 font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-3 text-white bg-[#EF5A5A] rounded-lg text-size-16 font-medium hover:bg-red-500 transition-colors"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
