import CustomButton from "../../CustomButton";
import RatingBreakdown from "../../RatingBreakPoint";
import UserReviewCard from "../../UserReviewCard";

export default function CourseDetailsReviewsSection() {
  return (
    <div className="px-15 py-6 space-y-6">
      <h3 className="text-xl font-semibold text-g-900 ">Learner Reviews</h3>
      <div className="flex">
        <div className="w-1/4">
          <RatingBreakdown />
        </div>
        <div className="w-3/4  space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <UserReviewCard key={index} />
          ))}
          <CustomButton
            title="View more Reviews"
            withIcon={false}
            isBorderd={true}
          />
        </div>
      </div>
    </div>
  );
}
