import App from "@/App";
import dashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { IRole } from "@/types";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: About,
                path: "/about"
            }
        ]
    },
    {
        Component: withAuth(dashboardLayout, role.superAdmin as IRole),
        path: "/admin",
        children: [
            {index : true , element : <Navigate to="/admin/analytics"/>},
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: withAuth( dashboardLayout, role.user as IRole),
        path: "/user",
        children: [
            {index : true, element : <Navigate to="/user/bookings"/>},
            ...generateRoutes(userSidebarItems)
        ]

    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: Verify,
        path: "/verify"
    },
    {
        Component: Unauthorized,
        path: "/unAuthorized"
    }

])