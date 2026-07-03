import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import OwnerDashboard from "../pages/owner/OwnerDashboard";

import MyListings from "../pages/owner/MyListings";
import ProtectedRoute from "./ProtectedRoute";
import CreateListing from "../pages/owner/CreateListing";
import EditListing from "../pages/owner/EditListing";
import Interests from "../pages/owner/Interests";
import Chats from "../pages/owner/Chats";
import Chat from "../pages/shared/Chat";

function TenantDashboard() {
  return <h1>Tenant Dashboard</h1>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/owner"
        element={
          <ProtectedRoute role="OWNER">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

        <Route
        path="/owner/listings"
        element={
        <ProtectedRoute role="OWNER">
            <MyListings />
        </ProtectedRoute>
        }
        />

        <Route
        path="/owner/create-listing"
        element={
            <ProtectedRoute role="OWNER">
            <CreateListing />
            </ProtectedRoute>
        }
        />

        <Route
        path="/owner/edit-listing/:id"
        element={
            <ProtectedRoute role="OWNER">
            <EditListing />
            </ProtectedRoute>
        }
        />
        <Route
        path="/owner/chats"
        element={
            <ProtectedRoute role="OWNER">
            <Chats />
            </ProtectedRoute>
        }
        />
    
      <Route
        path="/tenant"
        element={
          <ProtectedRoute role="TENANT">
            <TenantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/interests"
        element={
            <ProtectedRoute role="OWNER">
            <Interests />
            </ProtectedRoute>
        }
        />
        
        <Route
        path="/chat/:id"
        element={
            <ProtectedRoute>
            <Chat />
            </ProtectedRoute>
        }
        />

    </Routes>
  );
}

export default AppRoutes;