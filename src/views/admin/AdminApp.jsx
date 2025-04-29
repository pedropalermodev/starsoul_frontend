import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";


// Páginas
import Dashboard from "./pages/Dashboard";
import AccessManagement from "./pages/AccessManagement"
import ContentManagement from "./pages/ContentManagement"


function AdminApp() {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />} >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="access-management" element={<AccessManagement />} />
                <Route path="content-management" element={<ContentManagement />} />
            </Route>
        </Routes>
    )
}

export default AdminApp;