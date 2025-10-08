import BreadCrump from "../../Components/BreadCrump";
import PaypalImg from "../../assets/images/paypal.png";
import PercentIcon from "../../assets/icons/percent-03.svg";
import Input from "../../Components/Input";
import VisaImg from "../../assets/images/visa.png";
import PaymentInput from "../../Components/PaymentInput";
import { useCart } from "../../CustomHooks/useCart";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "../../lib/validation";
import { createPayment } from "../../api/paymentApi";
import toast from "react-hot-toast";
import Divider from "../../Components/Divider";
import OrderDetailsCard from "../../Components/OrderDetailsCard";
import CustomButton from "../../Components/CustomButton";
import { useEffect } from "react";
import { userAtom } from "../../Store/authAtom";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export default function CheckOutPage() {
  const { cart } = useCart();
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  const totalAmount = cart?.totalPrice * 0.15 + cart?.totalPrice;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      amount: totalAmount,
      userId: user?.id,
    },
  });

  useEffect(() => {
    if (totalAmount) {
      setValue("amount", totalAmount);
    }
    if (user) {
      console.log(user);
      setValue("userId", user.id);
    }
  }, [totalAmount, setValue, user, cart]);

  const onSubmit = async (data) => {
    const courseIds = cart.items.map((item) => item.courseId);

    const payload = {
      nameOnCard: data.nameOnCard,
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvc: data.cvc,
      country: data.country,
      state: data.state,
      amount: totalAmount,
      userId: user?.id,
      courseIds: courseIds,
    };
    console.log("Payload being sent:", payload);
    try {
      const res = await createPayment(payload);
      toast.success("Payment successful");
      console.log(res);

      navigate("/purchase-complete", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  return (
    <div className=" px-15 py-8 space-y-6">
      <div className="flex space-x-9 items-center ">
        <h1 className="text-size-32 font-semibold text-g-900">Checkout Page</h1>
        <div className="pt-2">
          <BreadCrump
            firstBread="Details"
            SecondBread="Shopping Cart"
            thirdBread="Checkout"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-10">
          {/* Left Section */}
          <div className="w-2/3">
            <div className="p-4 border border-graylight rounded-2xl space-y-4">
              {/* Country and State */}
              <div className="flex space-x-4">
                <Input
                  label="Country"
                  placeholder="Enter Country"
                  register={register}
                  name="country"
                  error={errors.country?.message}
                />
                <Input
                  label="State/Union Territory"
                  placeholder="Enter State"
                  register={register}
                  name="state"
                  error={errors.state?.message}
                />
              </div>

              {/* Payment Method */}
              <h3 className="text-lg font-semibold text-g-900 mb-2">
                Payment Method
              </h3>

              <div className="bg-grayBackground p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input type="radio" className="w-5 h-5" checked readOnly />
                    <h3 className="ml-2.5 text-lg font-semibold text-g-900">
                      Credit/Debit Card
                    </h3>
                  </div>
                  <img src={VisaImg} alt="visa-img" />
                </div>

                <div className="space-y-4">
                  <PaymentInput
                    label="Name on Card"
                    placeholder="Name on Card"
                    register={register}
                    name="nameOnCard"
                    error={errors.nameOnCard?.message}
                  />
                  <PaymentInput
                    label="Card Number"
                    placeholder="Card Number"
                    register={register}
                    name="cardNumber"
                    error={errors.cardNumber?.message}
                  />

                  <div className="flex space-x-4">
                    <PaymentInput
                      label="Expiry Date"
                      placeholder="MM/YY"
                      register={register}
                      name="expiryDate"
                      error={errors.expiryDate?.message}
                    />
                    <PaymentInput
                      label="CVC/CVV"
                      placeholder="CVC/CVV"
                      register={register}
                      name="cvc"
                      error={errors.cvc?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Paypal Option (Static) */}
              <div className="bg-grayBackground p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input type="radio" className="w-5 h-5" disabled />
                    <h3 className="ml-2.5 text-lg font-semibold text-g-900">
                      PayPal
                    </h3>
                  </div>
                  <img src={PaypalImg} alt="paypal-img" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-1/3">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-g-900 ">
                Order Details ({cart?.items?.length || 0})
              </h3>

              <div className="bg-grayBackground px-4 rounded-lg border border-graylight space-y-3">
                {cart?.items?.map((course) => (
                  <div key={course.courseId}>
                    <h3 className="text-lg font-medium text-g-900 text-nowrap overflow-hidden text-ellipsis my-3 ">
                      {course?.course?.name}
                    </h3>
                    <Divider />
                  </div>
                ))}
              </div>

              <div className="bg-grayBackground p-3 rounded-lg border border-graylight flex items-center">
                <img src={PercentIcon} alt="percent-icon" className="mr-2" />
                <p className="text-sm text-g-900">APPLY COUPON CODE</p>
              </div>

              <OrderDetailsCard
                price={cart?.totalPrice}
                discount={0}
                tax={cart?.totalPrice * 0.15}
              />

              <CustomButton
                type="submit"
                title="Proceed to Checkout"
                withIcon={false}
                fullWidth
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
