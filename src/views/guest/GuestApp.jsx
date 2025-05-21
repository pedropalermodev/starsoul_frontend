import React from "react";
import { Route, Routes } from "react-router-dom";
import GuestLayout from "./layout/GuestLayout";


// Páginas
import Home from "./pages/Home";
import Contact from "./pages/Contact"
import AboutUs from "./pages/AboutUs"
import AboutMeditation from "./pages/AboutMeditation"
import FAQ from "./pages/FAQ"
import PrivacyPoliciesAndTermsOfUse from "./pages/PrivacyPoliciesAndTermsOfUse"

import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

function GuestApp() {
    return (
        <Routes>
            <Route path="/" element={<GuestLayout />} >
                <Route index element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about-meditation" element={<AboutMeditation />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy-policy-and-terms-of-use" element={<PrivacyPoliciesAndTermsOfUse />} />
            </Route>
        </Routes>
    )
}

export default GuestApp;