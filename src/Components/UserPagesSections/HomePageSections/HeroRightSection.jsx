import React from "react";
import Student1 from "../../../assets/images/student1.png";
import Student2 from "../../../assets/images/student2.png";
import Student3 from "../../../assets/images/student3.png";

import Dots1 from "../../../assets/images/dots1.png";
import Dots2 from "../../../assets/images/dots2.png";
import Ellipse from "../../../assets/images/Ellipse1.png";
import Ellipse2 from "../../../assets/images/Ellipse2.png";
import Ellipse3 from "../../../assets/images/Ellipse3.png";

export default function HeroRightSection() {
  return (
    <div className="relative w-full md:w-[500px] h-full flex items-center justify-end">
      <div className="relative  w-[217px] h-[222px] bg-[#60A5FA] rounded-full flex items-center justify-center shadow-md    -top-[50px] -right-50">
        <img
          src={Student1}
          alt="Graduate"
          className=" rounded-full object-cover w-full h-[289px] absolute bottom-0 "
        />
        <img
          src={Ellipse}
          alt="Ellipse"
          className="  absolute -right-5 -bottom-3  -z-10"
        />
        <img
          src={Dots1}
          alt="Dots"
          className="  absolute -top-9 -left-7 -z-20"
        />
      </div>

      <div className="relative  w-[222px] h-[222px] bg-[#FACC15] rounded-full flex items-center justify-center shadow-md -bottom-50 -right-30">
        <img
          src={Student3}
          alt="Graduate"
          className=" rounded-full object-cover w-full h-[221px] absolute  "
        />
        <img
          src={Ellipse2}
          alt="Ellipse"
          className="  absolute -right-5 -bottom-4  "
        />
      </div>

      <div className="absolute  w-[222px] h-[222px] bg-[#F87171] rounded-full flex items-center justify-center shadow-md left-7 top-28  ">
        <img
          src={Student2}
          alt="student"
          className="  absolute  -bottom-0 rounded-full h-[280px] w-full object-contain "
        />

        <img src={Dots2} alt="" className="absolute -top-9 -left-7 -z-20" />
      </div>
      <img
        src={Ellipse3}
        alt="Ellipse"
        className="  absolute left-6 -bottom-33 -z-10"
      />
    </div>
  );
}
