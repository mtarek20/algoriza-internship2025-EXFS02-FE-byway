import CustomerReviewCard from "../../CustomerReviewCard";
import SectionHeader from "../../SectionHeader";

export default function AboutUsSection() {
  return (
    <section className="bg-grayBackground pt-20 pb-16 px-15 space-y-6">
      <SectionHeader
        title="What Our Customer Say About Us"
        className="w-[308px]"
      />

      {/* About Us Card */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <CustomerReviewCard key={index} />
        ))}
      </div>
    </section>
  );
}
