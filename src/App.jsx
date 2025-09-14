import React from "react";
import { Analytics } from '@vercel/analytics/react'
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import FacebookSection from "./components/FacebookSection";


function App() {
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
      <Analytics />
    </>
  );
}

export default App;
