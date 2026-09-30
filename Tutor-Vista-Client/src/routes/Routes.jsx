import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import AboutUsPage from "../pages/AboutUsPage";
import RequestTutorPage from "../pages/RequestTutorPage";
import ApplyTutor from "../pages/ApplyTutor";
import Contact from "../pages/Contact";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsAndConditions from "../pages/TermsAndConditions";
import TutorPage from "../pages/TutorPage";
import TuitionRequestPage from "../pages/TuitionRequestPage"; // Add this import
import CEOMessagesPage from "../pages/CEOMessagesPage";
import NotFoundPage from "../pages/NotFoundPage";
import TutorLoginPage from "../pages/TutorLoginPage";
import TutorPortalPage from "../pages/TutorPortalPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/request-tutor",
        element: <RequestTutorPage />,
      },
      {
        path: "/apply-tutor",
        element: <ApplyTutor />,
      },
      {
        path: "/tutor-login",
        element: <TutorLoginPage />,
      },
      {
        path: "/tutor-portal",
        element: <TutorPortalPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/tutors",
        element: <TutorPage />,
      },
      {
        path: "/tuition-jobs",
        element: <TuitionRequestPage />,
      },
      {
        path: "/founder-message",
        element: <CEOMessagesPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
