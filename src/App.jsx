import React from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import FacebookSection from "./components/FacebookSection";
import LocationPage from "./pages/LocationPage";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <ContactForm />
      <FacebookSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<LocationPage />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
