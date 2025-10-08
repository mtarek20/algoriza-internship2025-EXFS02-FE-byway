import AboutUsSection from "../../Components/UserPagesSections/HomePageSections/AboutUsSection";
import BecameInstructorSection from "../../Components/UserPagesSections/HomePageSections/BecameInstructorSection";
import StatsCounterSection from "../../Components/UserPagesSections/HomePageSections/CounterSection";
import HeroSection from "../../Components/UserPagesSections/HomePageSections/HeroSection";
import TopCategories from "../../Components/UserPagesSections/HomePageSections/TopCategories";
import TopCoursesSection from "../../Components/UserPagesSections/HomePageSections/TopCoursesSection";
import TopInstructorSection from "../../Components/UserPagesSections/HomePageSections/TopInstructorSection";

export default function HomePage() {
  return (
    <div className="space-y-15 ">
      <HeroSection />
      <StatsCounterSection />
      <TopCategories />
      <TopCoursesSection />
      <TopInstructorSection />
      <AboutUsSection />
      <BecameInstructorSection />
    </div>
  );
}
