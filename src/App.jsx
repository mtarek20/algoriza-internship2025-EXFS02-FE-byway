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

function App() {
  const router = createBrowserRouter([
    {
      // User Routes
      path: "",
      element: <UserLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "courses", element: <CoursesPage /> },
        { path: "/courses/:id", element: <CourseDetails /> },

        {
          path: "shopping-cart",
          element: (
            <ProtectedRoute role="User">
              <ShoppingCartPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute role="User">
              <CheckOutPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "purchase-complete",
          element: (
            <ProtectedRoute role="User">
              <PurchaseCompletePage />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },

    // Admin Routes
    {
      path: "",
      element: <AdminLayout />,
      children: [
        {
          path: "admin/dashboard",
          element: (
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "admin/instructors",
          element: (
            <ProtectedRoute role="Admin">
              <Instructors />
            </ProtectedRoute>
          ),
        },
        {
          path: "admin/courses",
          element: (
            <ProtectedRoute role="Admin">
              <Courses />
            </ProtectedRoute>
          ),
        },
      ],
    },

    {
      path: "",
      element: <AuthLayout />,
      children: [
        { path: "signup", element: <SignUp /> },
        { path: "signin", element: <LogIn /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
