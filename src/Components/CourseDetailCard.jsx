import { useAtom } from "jotai";
import CourseImg from "../assets/images/course-detail-img.png";
import Socials from "../assets/images/course-detail-socials.png";
import CustomButton from "./CustomButton";
import { currentCourseAtom } from "../Store/courseAtom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../CustomHooks/useCart";
import toast from "react-hot-toast";
import { tokenAtom } from "../Store/authAtom";

export default function CourseDetailCard() {
  const [course] = useAtom(currentCourseAtom);
  const { cart, loadCart, addCourseToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [token] = useAtom(tokenAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      loadCart();
    }
  }, []);

  useEffect(() => {
    setIsInCart(
      Array.isArray(cart.items) &&
        cart.items.some((item) => item.courseId === course.id)
    );
  }, [cart.items, course.id]);

  const handleAdd = async () => {
    if (!token) {
      toast.error("Please sign in first to add courses to your cart!");
      return;
    }
    await addCourseToCart(course.id);
  };

  const handleBuyNow = () => {
    if (!token) {
      toast.error("Please sign in first to purchase a course!");
      return;
    }
    navigate("/shopping-cart");
  };

  return (
    <div className="bg-white border border-graylight rounded-2xl shadow-card py-6 px-5.5 absolute top-4">
      <div className="flex flex-col ">
        <img
          src={`http://localhost:5046${course.imageUrl}`}
          alt="course-img"
          className="w-full rounded-lg h-50 object-cover"
        />
        <p className="text-2xl font-semibold text-g-900 mt-8">${course.cost}</p>

        {/* Buttons */}
        <div className="flex flex-col space-y-4 mt-6 ">
          <CustomButton
            disabled={isInCart}
            onClick={handleAdd}
            title={isInCart ? "Added to Cart" : "Add to Cart"}
            withIcon={false}
            fullWidth={true}
          />

          <CustomButton
            title="Buy Now"
            withIcon={false}
            isBorderd={true}
            fullWidth={true}
            onClick={handleBuyNow}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-graylight w-100 mt-7 -mx-5"></div>

        {/* Share on socials */}
        <div className="mt-6">
          <p className="text-lg font-medium text-g-900">Share</p>
          <img src={Socials} alt="socials" className=" mt-2" />
        </div>
      </div>
    </div>
  );
}
