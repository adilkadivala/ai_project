import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./Hero";
import Footer from "./Footer";
import Workflow from "./Workflow";
import Pricing from "./Pricing";

const LandingPage = () => {
  return (
    <div className="px-7">
      <Navbar />
      <HeroSection />
      <Workflow />
      <Pricing />
      <Footer />
    </div>
  );
};

export default LandingPage;
