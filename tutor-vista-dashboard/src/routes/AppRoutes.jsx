// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import TutorRequestsPage from "../pages/TutorRequestsPage";
import TutorsPage from "../pages/TutorsPage";
import MessagesPage from "../pages/MessagesPage";
import FAQsPage from "../pages/FAQsPage";
import UsersPage from "../pages/UsersPage";
import ProfilePage from "../pages/ProfilePage";
import AppliedJobPage from "../pages/AppliedJobPage"; // import করুন

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/tutor-requests"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <TutorRequestsPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/tutors"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <TutorsPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <MessagesPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/faqs"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <FAQsPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <UsersPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/applied-jobs"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <AppliedJobPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
