import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import CustomSearchBar from "./CustomSearchBar";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../Store/authAtom";
import { LogOut, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "../CustomHooks/useCart";

const Navbar = () => {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const { cart, loadCart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  useEffect(() => {
    if (user && token) {
      loadCart();
    }
  }, []);

  return (
    <nav className=" py-5 px-15 border-b border-graylight bg-white ">
      <div className="flex justify-between">
        <div className="flex items-center w-[80%]">
          {/* Logo */}
          <Link to="/" replace>
            <div className="flex items-center space-x-0.5 mr-24">
              <img src={Logo} alt="Logo" />
              <span className="text-lg font-medium text-gray-700">ByWay</span>
            </div>
          </Link>

          {/* SearchBar */}
          <CustomSearchBar />

          <Link
            to="/courses"
            className="text-gray-700 hover:text-gray-900 text-sm font-medium ml-6 mr-20"
          >
            Courses
          </Link>
        </div>

        {user && token ? (
          <div className="flex items-center  space-x-6 ">
            <button className="relative cursor-pointer">
              <Link to="/shopping-cart">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 ">
                  {cart?.items?.length || 0}
                </span>
              </Link>
            </button>

            <button onClick={handleLogout} className="cursor-pointer">
              <LogOut className="w-5 h-5 text-gray-400" />
            </button>

            <div className="w-10 h-10 rounded-full bg-g-700 text-white font-medium flex items-center justify-center">
              {user.username ? user.username.charAt(0).toUpperCase() : "U"}
            </div>
          </div>
        ) : (
          <div className=" flex items-center justify-end space-x-2">
            <Link to="/signin">
              <button className="py-2.5 px-4 border border-g-700 rounded-lg text-sm text-g-700 cursor-pointer">
                Log In
              </button>
            </Link>

            <Link to="/signup">
              <button className="py-2.5 px-4  rounded-lg text-sm text-white bg-g-700 cursor-pointer">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        {/* Buttons */}
      </div>
    </nav>
  );
};

export default Navbar;
