import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "./layout/UserLayout";

// Páginas
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ContentPage from "./pages/ContentPage";


function UserApp() {
    return (
        <Routes>
            <Route path="/" element={<UserLayout />} >

                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="content/:id" element={<ContentPage />} />
            </Route>
        </Routes>
    )
}

export default UserApp;