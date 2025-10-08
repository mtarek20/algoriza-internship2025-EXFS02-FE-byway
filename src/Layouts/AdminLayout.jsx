import AdminSidebar from "../Components/AdminComponents/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen font-ibx ">
      <AdminSidebar />
      <div className="w-[80%] px-10 py-8 bg-[#FCFCFC]">
        <Outlet />
      </div>
    </div>
  );
}
