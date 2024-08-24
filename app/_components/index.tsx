import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./Hero";
import Footer from "./Footer";
import Workflow from "./Workflow";
import Feature from "./Feature";

const LandingPage = () => {
  return (
    <div className="px-7">
      <Navbar />
      <HeroSection />
      <Workflow />
      <Feature />
      <Footer />
    </div>
  );
};

export default LandingPage;
