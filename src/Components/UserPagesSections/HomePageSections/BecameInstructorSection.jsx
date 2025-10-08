import Instructor1 from "../../../assets/images/instructor-1.png";
import Instructor2 from "../../../assets/images/instructor-2.png";
import CustomButton from "../../CustomButton";

export default function BecameInstructorSection() {
  return (
    <div className="p-15 space-y-15">
      {/* Became Instructor  */}
      <div className="grid grid-cols-2 gap-10">
        {/* left side */}
        <div className="flex items-center">
          <div className="w-full flex justify-center">
            <img src={Instructor1} alt="instructor-image" className="" />
          </div>
        </div>

        {/* left side */}
        <div className="flex flex-col justify-center items-start">
          <h3 className="text-xl font-semibold ">Become an Instructor</h3>
          <p className="text-lg text-gray-700 mt-2 mb-4">
            Instructors from around the world teach millions of students on
            Byway. We provide the tools and skills to teach what you love.
          </p>
          <CustomButton title="Start Your Instructor Journey" />
        </div>
      </div>

      {/* CheckOut grid */}
      {/* Became Instructor grid */}
      <div className="grid grid-cols-2 gap-10">
        {/* left side */}
        <div className="flex flex-col justify-center items-start">
          <h3 className="text-xl font-semibold ">
            Transform your life through education
          </h3>
          <p className="text-lg text-gray-700 mt-2 mb-4">
            Learners around the world are launching new careers, advancing in
            their fields, and enriching their lives.
          </p>
          <CustomButton title="Checkout Courses" />
        </div>

        {/* right side */}
        <div className="flex items-center">
          <div className="w-full flex justify-center">
            <img src={Instructor2} alt="instructor-image" className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
