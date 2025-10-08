import { StarIcon } from "@heroicons/react/20/solid";
import UserImg from "../assets/images/user.png";

export default function UserReviewCard() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-graylight ">
      <div className="flex justify-between items-start">
        {/* Left Content */}
        <div className="flex items-center space-x-3">
          <img src={UserImg} alt="user-img" />
          <h3 className="text-lg font-semibold text-g-900">Mark Doe</h3>
        </div>

        {/* Right Content */}
        <div className="flex flex-col w-2/3 space-y-1.5">
          <div className="flex items-center space-x-7">
            <div className="space-x-1 flex">
              <StarIcon className="w-5 h-5 text-yellow-500 " />
              <h3 className="text-lg font-semibold text-g-900 ">5</h3>
            </div>
            <p className="text-sm text-g-700">Reviewed on 22nd March, 2024</p>
          </div>

          <p className="text-size-16 text-g-700">
            I was initially apprehensive, having no prior design experience. But
            the instructor, John Doe, did an amazing job of breaking down
            complex concepts into easily digestible modules. The video lectures
            were engaging, and the real-world examples really helped solidify my
            understanding.
          </p>
        </div>
      </div>
    </div>
  );
}
