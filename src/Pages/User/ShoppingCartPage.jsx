import { useEffect } from "react";
import CartItemCard from "../../Components/CartItemCard";
import BreadCrump from "../../Components/BreadCrump";
import Divider from "../../Components/Divider";
import { useCart } from "../../CustomHooks/useCart";
import OrderDetailsCard from "../../Components/OrderDetailsCard";
import CustomButton from "../../Components/CustomButton";
import { useNavigate } from "react-router-dom";

export default function ShoppingCartPage() {
  const { cart, loadCart, removeCourseFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
    console.log(cart);
  }, []);

  const totalPrice = cart.totalPrice;

  const tax = totalPrice * 0.15;
  const discount = 0.0;
  return (
    <div className="px-15 py-8">
      {/*Cart Header */}
      <div className="flex space-x-9 items-center ">
        <h1 className="text-size-32 font-semibold text-g-900">Shopping Cart</h1>
        <div className="pt-2">
          <BreadCrump
            firstBread="Courses"
            SecondBread="Details"
            thirdBread="Shopping Cart"
          />
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex mt-7 space-x-17 mb-32">
        <div className="w-2/3 flex-col space-y-6">
          <div className="space-y-1.5">
            <p className="text-sm text-g-700">
              {cart?.items?.length} Courses in cart
            </p>
            <Divider />
          </div>
          {cart?.items?.length === 0 && (
            <p className="text-3xl text-center text-gray-400 font-semibold">
              Your Cart is Empty
            </p>
          )}
          {/* Cart Items */}
          <div className="space-y-4">
            {cart?.items?.map((item) => (
              <CartItemCard
                key={item.courseId}
                item={item}
                handleRemove={() => removeCourseFromCart(item.courseId)}
              />
            ))}
          </div>
        </div>

        <div className="w-1/3">
          <h3 className="text-xl font-semibold text-g-900 mb-2 ">
            Order Details
          </h3>

          <OrderDetailsCard price={totalPrice} discount={discount} tax={tax} />

          <div className="mt-4">
            <CustomButton
              title="Proceed to Checkout"
              withIcon={false}
              fullWidth={true}
              onClick={() => {
                if (cart?.items?.length > 0) {
                  navigate("/checkout");
                }
              }}
              disabled={cart?.items?.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
