import React, { useEffect } from "react";
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

const BASE_URL = "https://www.shropshinecleaning.com";

function HomePageMeta() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "ShropShine Cleaning \u2013 Shropshire Cleaners",
              "item": BASE_URL + "/",
            },
          ],
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How much does a standard clean cost?", "acceptedAnswer": { "@type": "Answer", "text": "Standard cleaning starts from \u00a317.50 per hour with a minimum booking of 2 hours (from \u00a335 total). Exact pricing depends on your property size and level of cleaning required." } },
            { "@type": "Question", "name": "How much does a deep clean cost?", "acceptedAnswer": { "@type": "Answer", "text": "Deep cleaning starts from \u00a370. A deep clean covers areas a standard routine misses \u2014 behind furniture, skirting boards, appliances, light fittings, streak-free windows and high-touch surfaces. Exact price depends on property size." } },
            { "@type": "Question", "name": "How much does an end of tenancy clean cost?", "acceptedAnswer": { "@type": "Answer", "text": "End of tenancy cleaning is priced on application as the cost depends on property size and condition. Contact ShropShine for a tailored quote via the website or on 07532 029849." } },
            { "@type": "Question", "name": "What is the minimum booking time?", "acceptedAnswer": { "@type": "Answer", "text": "The minimum booking is 2 hours. Standard cleaning is \u00a317.50 per hour, so the minimum charge is \u00a335." } },
            { "@type": "Question", "name": "Do you cover all of Shropshire?", "acceptedAnswer": { "@type": "Answer", "text": "We cover towns and villages within approximately 10 miles of St Martins, including Oswestry, Ellesmere, Shrewsbury, Gobowen, Chirk, Llangollen, Weston Rhyn, Whittington, Selattyn, Nesscliffe, West Felton, Froncysyllte, Dudleston Heath, Morda and Overton." } },
            { "@type": "Question", "name": "Are you insured?", "acceptedAnswer": { "@type": "Answer", "text": "Yes \u2014 ShropShine is fully insured through Simply Business. Cover applies to every residential and commercial booking, and an insurance certificate is available to share with your landlord or facilities manager." } },
            { "@type": "Question", "name": "Do you offer cleaning in Oswestry?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide domestic and commercial cleaning throughout Oswestry including standard, deep, end of tenancy and one-off cleans." } },
            { "@type": "Question", "name": "Do you offer cleaning in Ellesmere?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, ShropShine covers Ellesmere and surrounding villages for domestic, deep and end of tenancy cleaning services." } },
            { "@type": "Question", "name": "Do you offer cleaning in Shrewsbury?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we cover Shrewsbury for domestic and commercial cleaning including standard, deep and one-off cleans. Contact us to request a slot." } },
            { "@type": "Question", "name": "Do you clean in Gobowen?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Gobowen is within our service area. We provide standard, deep and one-off cleans for homes in Gobowen and surrounding villages." } },
            { "@type": "Question", "name": "Do you clean in Chirk?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide domestic and commercial cleaning in Chirk and the surrounding area." } },
            { "@type": "Question", "name": "Do you clean in Llangollen?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Llangollen is within our service area. We offer standard, deep and end of tenancy cleans for homes and businesses in Llangollen." } },
            { "@type": "Question", "name": "Can I book a one-off clean?", "acceptedAnswer": { "@type": "Answer", "text": "Yes \u2014 both regular and one-off cleans are available. Whether you need a single deep clean before an event, after moving or for a seasonal refresh, we can help." } },
            { "@type": "Question", "name": "Do you offer commercial cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, ShropShine provides commercial and office cleaning for businesses across Shropshire including Oswestry, Ellesmere and Shrewsbury." } },
            { "@type": "Question", "name": "How do I book a clean?", "acceptedAnswer": { "@type": "Answer", "text": "You can book by filling in the contact form on shropshinecleaning.com or by calling 07532 029849. We will confirm your slot by email." } },
            { "@type": "Question", "name": "How far from St Martins do you travel?", "acceptedAnswer": { "@type": "Answer", "text": "We serve properties within roughly 10 miles of St Martins, covering a wide area across Shropshire and the Welsh border including Oswestry, Ellesmere, Chirk, Llangollen and Shrewsbury." } },
            { "@type": "Question", "name": "Do you offer end of tenancy cleaning near Oswestry?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide end of tenancy cleaning in Oswestry and surrounding villages. Our cleans are tailored to meet landlord and letting agency requirements." } },
            { "@type": "Question", "name": "Are you a local Shropshire cleaning company?", "acceptedAnswer": { "@type": "Answer", "text": "Yes \u2014 ShropShine is a family-run cleaning business based in St Martins, Shropshire. We are proud to serve our local community across the surrounding towns and villages." } },
          ],
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "homepage-jsonld";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => document.getElementById("homepage-jsonld")?.remove();
  }, []);
  return null;
}

function HomePage() {
  return (
    <>
      <HomePageMeta />
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
