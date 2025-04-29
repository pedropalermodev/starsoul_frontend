import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "./layout/UserLayout";


// Páginas
import Home from "./pages/Home";
import Profile from "./pages/Profile";


function UserApp() {
    return (
        <Routes>
            <Route path="/" element={<UserLayout />} >
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}

export default UserApp;