import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from "./App.tsx";
import LoginCard from "@/components/login-card.tsx";
import RegisterCard from "@/components/register-card.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import ProtectedRoute from "./components/protected-route.tsx";
import { UserRole } from "./types/user-role.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<LoginCard />} />
        <Route path="register" element={<RegisterCard />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute requiredRoles={[UserRole.ADMIN]}>
              <div>Admin Dashboard</div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    <Toaster position="top-right" richColors />
  </StrictMode>
);
