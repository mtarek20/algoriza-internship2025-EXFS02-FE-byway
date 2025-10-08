import { useAtom } from "jotai";

import { userAtom } from "../Store/authAtom";
import { cartAtom } from "../Store/cartAtom";
import { addToCart, getCart, removeFromCart } from "../api/shoppingCartApi";

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [user] = useAtom(userAtom);

  const loadCart = async () => {
    const data = await getCart(user.id);
    setCart(data || []);
    console.log(data);
  };

  const addCourseToCart = async (courseId) => {
    await addToCart(user.id, courseId);
    await loadCart();
  };

  const removeCourseFromCart = async (courseId) => {
    await removeFromCart(user.id, courseId);
    await loadCart();
  };

  return { cart, loadCart, addCourseToCart, removeCourseFromCart };
};
