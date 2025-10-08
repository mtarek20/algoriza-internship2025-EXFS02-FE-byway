import ChartImage from "../../assets/images/Chart.png";

export default function StatisticsCard() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-[416px] flex flex-col justify-between ">
      <h2 className="text-gray-800 font-semibold mb-4">Statistics</h2>

      <div className="flex justify-center mb-5">
        <img
          src={ChartImage}
          alt="Statistics Chart"
          className="w-40 h-40 object-contain"
        />
      </div>

      <div className="flex justify-between text-center">
        <div>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2.5 h-2.5 bg-blue-700 rounded-full"></span>
            <span className="text-gray-700 text-sm font-medium">
              Instructors
            </span>
          </div>
          <p className="text-gray-800 font-semibold text-lg mt-1">60%</p>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2.5 h-2.5 bg-sky-400 rounded-full"></span>
            <span className="text-gray-700 text-sm font-medium">
              Categories
            </span>
          </div>
          <p className="text-gray-800 font-semibold text-lg mt-1">20%</p>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2.5 h-2.5 bg-gray-200 rounded-full"></span>
            <span className="text-gray-700 text-sm font-medium">Courses</span>
          </div>
          <p className="text-gray-800 font-semibold text-lg mt-1">20%</p>
        </div>
      </div>
    </div>
  );
}
