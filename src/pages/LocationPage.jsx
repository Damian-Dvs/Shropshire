import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";

import { getLocationBySlug, BASE_URL } from "../data/locations";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

// Slug map: only areas that have dedicated pages get linked
const SLUG_MAP = {
  "Oswestry": "oswestry",
  "Ellesmere": "ellesmere",
  "Shrewsbury": "shrewsbury",
  "Gobowen": "gobowen",
  "St Martins": "st-martins",
  "St Martin's": "st-martins",
  "Chirk": "chirk",
  "Llangollen": "llangollen",
  "Whittington": "whittington",
  "Weston Rhyn": "weston-rhyn",
};

function buildLocationSchema(loc) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `${loc.canonical}#localbusiness`,
        "name": "ShropShine Cleaning",
        "description": loc.intro,
        "url": loc.canonical,
        "telephone": "+447532029849",
        "email": "bookings@shropshinecleaning.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "St Martins",
          "addressRegion": "Shropshire",
          "postalCode": "SY11",
          "addressCountry": "GB",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": loc.geo.lat,
          "longitude": loc.geo.lng,
        },
        "areaServed": { "@type": "City", "name": loc.name },
        "priceRange": "££",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00",
          },
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "4",
          "bestRating": "5",
        },
        "sameAs": [
          BASE_URL,
          "https://www.facebook.com/61579277243121",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `Cleaners in ${loc.name}`,
            "item": loc.canonical,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": loc.faqQuestion,
            "acceptedAnswer": { "@type": "Answer", "text": loc.faqAnswer },
          },
        ],
      },
      {
        "@type": "Service",
        "name": `Deep Clean ${loc.name}`,
        "description": `Professional deep cleaning service in ${loc.name}, ${loc.county}. Reaches behind furniture, skirting boards, light fittings and all high-touch areas. From £70.`,
        "provider": { "@id": `${loc.canonical}#localbusiness` },
        "areaServed": { "@type": "City", "name": loc.name },
        "offers": { "@type": "Offer", "price": "70", "priceCurrency": "GBP", "priceSpecification": { "@type": "PriceSpecification", "minPrice": "70", "priceCurrency": "GBP" } },
      },
      {
        "@type": "Service",
        "name": `End of Tenancy Cleaning ${loc.name}`,
        "description": `End of tenancy cleaning in ${loc.name}, ${loc.county}. Top-to-bottom clean compliant with landlord and letting agency requirements. Price on application.`,
        "provider": { "@id": `${loc.canonical}#localbusiness` },
        "areaServed": { "@type": "City", "name": loc.name },
      },
      {
        "@type": "Service",
        "name": `Standard Domestic Cleaning ${loc.name}`,
        "description": `Regular domestic cleaning in ${loc.name}, ${loc.county}. Weekly or fortnightly cleans from £17.50/hr (2-hour minimum).`,
        "provider": { "@id": `${loc.canonical}#localbusiness` },
        "areaServed": { "@type": "City", "name": loc.name },
        "offers": { "@type": "Offer", "price": "17.50", "priceCurrency": "GBP" },
      },
    ],
  };
}

function PageMeta({ loc }) {
  useEffect(() => {
    window.scrollTo(0, 0);

    const prevTitle = document.title;
    document.title = loc.pageTitle;

    const descEl = document.querySelector('meta[name="description"]');
    const prevDesc = descEl?.getAttribute("content") || "";
    if (descEl) descEl.setAttribute("content", loc.metaDescription);

    const canonEl = document.querySelector('link[rel="canonical"]');
    const prevCanon = canonEl?.getAttribute("href") || "";
    if (canonEl) canonEl.setAttribute("href", loc.canonical);

    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    const prevOgTitle = ogTitleEl?.getAttribute("content") || "";
    if (ogTitleEl) ogTitleEl.setAttribute("content", loc.pageTitle);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    const prevOgDesc = ogDescEl?.getAttribute("content") || "";
    if (ogDescEl) ogDescEl.setAttribute("content", loc.metaDescription);

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    const prevOgUrl = ogUrlEl?.getAttribute("content") || "";
    if (ogUrlEl) ogUrlEl.setAttribute("content", loc.canonical);

    // Inject page-specific JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "location-jsonld";
    script.textContent = JSON.stringify(buildLocationSchema(loc));
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (descEl) descEl.setAttribute("content", prevDesc);
      if (canonEl) canonEl.setAttribute("href", prevCanon);
      if (ogTitleEl) ogTitleEl.setAttribute("content", prevOgTitle);
      if (ogDescEl) ogDescEl.setAttribute("content", prevOgDesc);
      if (ogUrlEl) ogUrlEl.setAttribute("content", prevOgUrl);
      document.getElementById("location-jsonld")?.remove();
    };
  }, [loc]);

  return null;
}

function LocationHero({ loc }) {
  return (
    <section
      className="relative flex items-center justify-center text-center text-white min-h-[90vh] bg-hero bg-cover bg-center"
      aria-label={`Domestic cleaners in ${loc.name}`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-45 z-0" />
      <div className="relative z-10 px-4 py-20 sm:py-28 md:py-36 lg:py-44 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-md">
          {loc.h1}
          <span className="block text-xl sm:text-2xl font-normal mt-2">
            ShropShine Cleaning — {loc.county}
          </span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 drop-shadow max-w-2xl mx-auto">
          Family-run, fully insured domestic cleaning in {loc.name} and surrounding areas.
          Standard cleans from £17.50/hr — deep cleans from £70.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-white text-primary font-semibold px-6 py-3 rounded shadow hover:bg-soft hover:scale-105 transform transition-all duration-200"
          >
            Request a Slot
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center border border-white/70 px-6 py-3 rounded font-semibold text-white hover:bg-white/10 hover:scale-105 transform transition-all duration-200"
          >
            View Services
          </a>
        </div>
      </div>
    </section>
  );
}

function LocationIntro({ loc }) {
  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="text-primary hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-700" aria-current="page">
              Cleaners in {loc.name}
            </li>
          </ol>
        </nav>

        {/* Unique intro paragraph */}
        <p className="text-gray-700 leading-relaxed text-lg mb-8">{loc.intro}</p>

        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
          <div className="rounded-2xl border border-primary/15 bg-soft p-5">
            <div className="font-semibold text-primary mb-1">Fully Insured</div>
            <div className="text-gray-600">Covered through Simply Business</div>
          </div>
          <div className="rounded-2xl border border-primary/15 bg-soft p-5">
            <div className="font-semibold text-primary mb-1">Family Run</div>
            <div className="text-gray-600">Personal, reliable service</div>
          </div>
          <div className="rounded-2xl border border-primary/15 bg-soft p-5">
            <div className="font-semibold text-primary mb-1">From £17.50/hr</div>
            <div className="text-gray-600">2-hour minimum booking</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationNearby({ loc }) {
  if (!loc.nearbyAreas || loc.nearbyAreas.length === 0) return null;

  return (
    <section className="bg-soft py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xl font-bold text-primary mb-4">
          We Also Cover Nearby Areas
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {loc.nearbyAreas.map((area) => {
            const areaSlug = SLUG_MAP[area];
            return areaSlug ? (
              <Link
                key={area}
                to={`/cleaners-${areaSlug}`}
                className="rounded-full border border-primary/30 bg-white px-4 py-2 text-sm text-primary hover:bg-primary hover:text-white transition"
              >
                Cleaners in {area}
              </Link>
            ) : (
              <span
                key={area}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600"
              >
                {area}
              </span>
            );
          })}
        </div>
        <p className="mt-6 text-gray-600 text-sm">
          Not sure if we cover your area?{" "}
          <a href="#contact" className="text-primary hover:underline font-medium">
            Get in touch
          </a>{" "}
          and we&apos;ll let you know.
        </p>
      </div>
    </section>
  );
}

const GENERIC_FAQS = [
  {
    q: "How much does a standard clean cost?",
    a: "Standard cleaning starts from £17.50 per hour with a minimum booking of 2 hours (from £35 total).",
  },
  {
    q: "Are you insured?",
    a: "Yes — ShropShine is fully insured through Simply Business. Cover applies to every residential and commercial booking.",
  },
  {
    q: "How do I book a clean?",
    a: "Fill in the contact form on our website or call us on 07532 029849. We will confirm your slot within one working day.",
  },
];

function LocationFAQ({ loc }) {
  const faqs = [
    { q: loc.faqQuestion, a: loc.faqAnswer },
    ...GENERIC_FAQS,
  ];
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Frequently Asked Questions — {loc.name} Cleaning
        </h2>
        <dl className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
          {faqs.map((faq, i) => (
            <div key={i}>
              <dt>
                <button
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 text-gray-800 font-medium hover:bg-soft transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <h3 className="text-base font-medium">{faq.q}</h3>
                  <span className="shrink-0 text-primary text-xl leading-none">
                    {openIndex === i ? "−" : "+"}
                  </span>
                </button>
              </dt>
              {openIndex === i && (
                <dd className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function LocationPage() {
  const { slug } = useParams();

  // Route is /:slug so slug = "cleaners-oswestry"; strip the prefix
  const townSlug = slug?.startsWith("cleaners-") ? slug.slice(9) : null;
  const loc = townSlug ? getLocationBySlug(townSlug) : null;

  if (!loc) return <Navigate to="/" replace />;

  return (
    <>
      <PageMeta loc={loc} />
      <Navbar />
      <LocationHero loc={loc} />
      <LocationIntro loc={loc} />
      <Services locationName={loc.name} />
      <Testimonials />
      <LocationNearby loc={loc} />
      <LocationFAQ loc={loc} />
      <ContactForm />
      <Footer />
    </>
  );
}
