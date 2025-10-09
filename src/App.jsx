import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LogIn from "./Pages/Common/LogIn";
import SignUp from "./Pages/Common/SignUp";
import NotFoundPage from "./Pages/Common/NotFoundPage";
import HomePage from "./Pages/User/HomePage";
import AuthLayout from "./Layouts/AuthLayout";
import CoursesPage from "./Pages/User/CoursesPage";
import CourseDetails from "./Pages/User/CourseDetails";
import ShoppingCartPage from "./Pages/User/ShoppingCartPage";
import CheckOutPage from "./Pages/User/CheckOutPage";
import PurchaseCompletePage from "./Pages/User/PurchaseCompletePage";
import UserLayout from "./Layouts/UserLayout";
import AdminLayout from "./Layouts/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Instructors from "./Pages/Admin/Instructors";
import Courses from "./Pages/Admin/Courses";
import ProtectedRoute from "./Pages/PortectedRoute";
import { Toaster } from "react-hot-toast";
import Unauthorized from "./Pages/Common/UnAuthoized";
import StayLogged from "./Services/StayLoged";

function App() {
  const router = createBrowserRouter([
    // User Layout Routes
    {
      path: "/",
      element: (
        <StayLogged>
          <UserLayout />
        </StayLogged>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "courses",
          element: <CoursesPage />,
        },
        { path: "/courses/:id", element: <CourseDetails /> },
        {
          path: "shopping-cart",
          element: (
            <ProtectedRoute allowedRoles={["User"]}>
              <ShoppingCartPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute allowedRoles={["User"]}>
              <CheckOutPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "purchase-complete",
          element: (
            <ProtectedRoute allowedRoles={["User"]}>
              <PurchaseCompletePage />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },

    // Admin Layout Routes
    {
      path: "/admin",
      element: (
        <StayLogged>
          <AdminLayout />
        </StayLogged>
      ),
      children: [
        {
          path: "dashboard",
          element: (
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "instructors",
          element: (
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Instructors />
            </ProtectedRoute>
          ),
        },
        {
          path: "courses",
          element: (
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Courses />
            </ProtectedRoute>
          ),
        },
      ],
    },

    // Auth Route
    {
      path: "",
      element: <AuthLayout />,
      children: [
        { path: "signup", element: <SignUp /> },
        { path: "signin", element: <LogIn /> },
      ],
    },

    { path: "unauthorized", element: <Unauthorized /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
