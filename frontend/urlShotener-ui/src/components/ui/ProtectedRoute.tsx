import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { toaster } from "./toaster";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      toaster.create({
        description: "Session Expired",
        type: "error",
      });
      navigate("/login");
      return;
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
