import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

import { FolderInputIcon, HouseIcon, LogOutIcon, User } from "lucide-react";
import Divider from "../Divider";
import { useAtom } from "jotai";
import { tokenAtom } from "../../Store/authAtom";

export default function AdminSidebar() {
  const [, setToken] = useAtom(tokenAtom);
  const navigate = useNavigate();
  return (
    <div className="w-[20%] bg-white border-r border-base-line p-5">
      {/* Logo  */}
      <div className="flex items-center ">
        <img src={Logo} alt="logo-img" />
        <h3 className="text-size-16 font-medium text-g-700 ">Byway</h3>
      </div>

      {/* Links */}
      <div className="mt-6 ">
        <ul className="p-4">
          {/* Dashboard */}
          <li className=" ">
            <NavLink
              to={"/admin/dashboard"}
              className="space-x-2.5 flex items-center py-3 px-4"
            >
              <HouseIcon />
              <span className="text-sm font-normal">Dashboard</span>
            </NavLink>
          </li>

          {/* Instructors */}
          <li className=" ">
            <NavLink
              to={"/admin/instructors"}
              className="space-x-2.5 flex items-center py-3 px-4"
            >
              <User />
              <span className="text-sm font-normal">Instructors</span>
            </NavLink>
          </li>

          {/* Courses */}
          <li className="">
            <NavLink
              to={"/admin/courses"}
              className="space-x-2.5 flex items-center py-3 px-4  "
            >
              <FolderInputIcon />
              <span className="text-sm font-normal ">Courses</span>
            </NavLink>
          </li>

          <Divider />

          {/* Logout */}
          <li className="">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
                navigate("/");
              }}
              className="space-x-2.5 flex items-center py-3 px-4 mt-2 text-content-secondery cursor-pointer "
            >
              <LogOutIcon size={18} />
              <span className="text-sm font-normal ">logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Logout */}
    </div>
  );
}
