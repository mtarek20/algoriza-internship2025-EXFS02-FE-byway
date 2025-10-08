import { Link } from "react-router-dom";
import HeroRightSection from "./HeroRightSection";
import CommunityCard from "../../CommunityCard";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen  flex items-center relative">
      <div className="container mx-auto flex">
        {/* Left Content */}
        <div className="w-1/2 flex flex-col">
          <h1 className="text-[40px] font-bold text-g-900">
            Unlock Your Potential <br /> with Byway
          </h1>
          <p className="text-[16px]  text-g-700 mt-4">
            Welcome to Byway, where learning knows no bounds. We believe that
            education is the key to personal and professional growth, and we're
            here to guide you on your journey to success.
          </p>

          <Link>
            <button className="py-2.5 px-6 rounded-lg bg-primary-500 text-white text-sm mt-6 font-medium">
              Start your journey
            </button>
          </Link>
        </div>

        {/* Right Content */}
        <div className="w-1/2 flex justify-end items-start relative h-full -top-5">
          <HeroRightSection />
          <div className="absolute -bottom-60 right-20">
            <CommunityCard />
          </div>
        </div>
      </div>
    </section>
  );
}
