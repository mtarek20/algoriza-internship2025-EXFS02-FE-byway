import Avatar1 from "../assets/images/avatar.png";
import Avatar2 from "../assets/images/avatar2.png";
import Avatar3 from "../assets/images/avatar3.png";
import Avatar4 from "../assets/images/avatar4.png";

export default function CommunityCard() {
  return (
    <div className=" flex items-center justify-center ">
      <div className="bg-white rounded-2xl shadow-lg p-5 w-64">
        <div className="flex justify-center -space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full border-3 border-white overflow-hidden shadow-md">
            <img
              src={Avatar1}
              alt="Student 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-12 h-12 rounded-full border-3 border-white overflow-hidden shadow-md">
            <img
              src={Avatar2}
              alt="Student 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-12 h-12 rounded-full border-3 border-white overflow-hidden shadow-md">
            <img
              src={Avatar3}
              alt="Student 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-12 h-12 rounded-full border-3 border-white overflow-hidden shadow-md">
            <img
              src={Avatar4}
              alt="Student 4"
              className="w-full h-full object-cover"
            />
          </div>
          {/* <div className="w-12 h-12 rounded-full border-3 border-white overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
              alt="Student 5"
              className="w-full h-full object-cover"
            />
          </div> */}
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900 leading-tight">
            Join our community of
            <br />
            <span className="text-base font-bold">1200+ Students</span>
          </p>
        </div>
      </div>
    </div>
  );
}
