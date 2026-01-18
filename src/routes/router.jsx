import { createBrowserRouter } from "react-router";
import Home from "../Pages/Public/Home";
import Pricing from "../Pages/Public/Pricing";
import TermsOfService from "../Pages/Public/TermsOfService";
import PublicLayout from "../Layout/PublicLayout";
import Footer from "../Pages/Public/Footer";
import JobsPage from "../Pages/Public/JobsPage";


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
]);

export default router;