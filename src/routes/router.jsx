import { createBrowserRouter } from "react-router";
import Home from "../Pages/Public/Home";
import Pricing from "../Pages/Public/Pricing";
import TermsOfService from "../Pages/Public/TermsOfService";
import PublicLayout from "../Layout/PublicLayout";
import JobsPage from "../Pages/Public/JobsPage";
import ToolLayout from "../Layout/ToolLayout";
import Accounts from "../Pages/Tool/Accounts";
import CalendarDashboard from "../Pages/Tool/CalendarDashboard";
import CreatePost from "../Pages/Tool/CreatePost";
import OverView from "../Pages/Tool/OverVIew";
import AnalyticsDashboard from "../Pages/Tool/AnalyticsDashboard";
import NotificationPage from "../Pages/Tool/NotificationPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "pricing", element: <Pricing /> },
      { path: "terms", element: <TermsOfService /> },
      { path: "Jobs", element: <JobsPage></JobsPage>},
    ],
  },
  {
    path: "/tool",
    element: <ToolLayout />,
    children: [
      { index: true, element: <OverView/> },
      { path: "calendar", element: <CalendarDashboard /> },
      { path: "accounts", element: <Accounts /> },
      { path: "post", element: <CreatePost /> },
      { path: "analytics", element: <AnalyticsDashboard/> },
      { path: "inbox", element: <NotificationPage/> },
      // { path: "settings", element: <Settings /> },
    ],
  },
]);

export default router;