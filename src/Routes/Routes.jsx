import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../Pages/Home/HomePage";
import ErrorPage from "../SharedComponent/ErrorPage";
import Courses from "../Pages/Courses/Courses";
import Mentors from "../Pages/Mentors/Mentors";
import AboutUs from "../Pages/About Us/AboutUs";
import Login from "../Components/AuthComponents/Login";
import SignUp from "../Components/AuthComponents/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import UserHomepage from "../Pages/UserDashboard/UserHomepage";
import SelectedCourse from "../Pages/UserDashboard/SelectedCourse";
import PaymentPage from "../Pages/UserDashboard/PaymentPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: '/courses',
                element: <Courses></Courses>
            },
            {
                path: '/mentors',
                element: <Mentors></Mentors>
            },
            {
                path: '/about',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/Login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard/userHome',
                element: <PrivateRoute><UserHomepage></UserHomepage></PrivateRoute>
            },
            {
                path: '/dashboard/cartItem',
                element: <PrivateRoute><SelectedCourse></SelectedCourse></PrivateRoute>
            },
            {
                path: '/dashboard/payment',
                element: <PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>
            }
        ]

    }
]);

export default router;