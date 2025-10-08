import React from "react";

export default function StatsCounterSection() {
  const statsValues = [
    { value: "250+", label: "Courses by our best mentors" },
    { value: "1000+", label: "Courses by our best mentors" },
    { value: "15+", label: "Courses by our best mentors" },
    { value: "2400+", label: "Courses by our best mentors" },
  ];

  return (
    <section className="bg-grayBackground py-10 px-15 ">
      <div className="grid grid-cols-4   divide-x-2 divide-solid divide-graylight text-center ">
        {statsValues.map((stat, index) => (
          <div key={index}>
            <h3 className="text-[32px] font-semibold text-g-900">
              {stat.value}
            </h3>
            <p className="text-sm text-g-900">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
