import { StarIcon } from "@heroicons/react/24/solid";

export default function RatingBreakdown() {
  const breakdown = [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 10 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 },
  ];

  return (
    <div className="text-sm text-gray-700">
      {/* Average rating */}
      <div className="flex items-center mb-2">
        <StarIcon className="w-5 h-5 text-yellow-500 mr-1" />
        <span className="font-semibold text-lg">4.6</span>
        <span className="ml-2 text-gray-500">146,951 reviews</span>
      </div>

      {/* Breakdown */}
      <div className="space-y-1">
        {breakdown.map((item) => (
          <div key={item.stars} className="flex items-center">
            {/* Stars */}
            <div className="flex text-yellow-500 mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < item.stars ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Percentage */}
            <span className="text-gray-700">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
