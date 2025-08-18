import SingleDivisionDetails from "@/components/modules/admin/division/SingleDivisionDetails";
import AddDivision from "@/pages/Admin/AddDivision";
import AddTour from "@/pages/Admin/AddTour";
import AddTourTypes from "@/pages/Admin/AddTourTypes";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"))


export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "analytics",
        url: "/admin/analytics",
        component: Analytics
      },
    ],
  },
  {
    title: "Tour-management",
    items: [

      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourTypes
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour
      },
      {
        title: "",
        url: "/admin/division/:divisionSlug",
        component: SingleDivisionDetails
      },
    ],
  },
]