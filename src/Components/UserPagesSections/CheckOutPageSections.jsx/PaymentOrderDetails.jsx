import PercentIcon from "../../../assets/icons/percent-03.svg";
import CustomButton from "../../CustomButton";
import Divider from "../../Divider";
import OrderDetailsCard from "../../OrderDetailsCard";

export default function PaymentOrderDetails({ cartCourses }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-g-900 ">Order Details (3)</h3>

      <div className="bg-grayBackground px-4 rounded-lg border border-graylight space-y-3">
        {cartCourses?.items?.map((course) => (
          <div key={course.courseId}>
            <h3 className="text-lg font-medium text-g-900 text-nowrap overflow-hidden text-ellipsis my-3 ">
              {course?.course?.name}
            </h3>
            <Divider />
          </div>
        ))}
      </div>

      <div className="bg-grayBackground p-3 rounded-lg border border-graylight flex items-center">
        <img src={PercentIcon} alt="percent-icon" className=" mr-2" />
        <p className="text-sm text-g-900">APPLY COUPON CODE</p>
      </div>

      <OrderDetailsCard
        price={cartCourses?.totalPrice}
        discount={0}
        tax={cartCourses?.totalPrice * 0.15}
      />

      {/* Checkout Button */}

      <CustomButton
        title="Proceed to Checkout"
        withIcon={false}
        fullWidth={true}
      />
    </div>
  );
}
