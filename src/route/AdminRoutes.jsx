import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminRoute() {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
}