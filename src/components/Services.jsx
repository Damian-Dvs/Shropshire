import { useState } from "react";

const services = [
  {
    title: "Standard Clean",
    price: "from £35",
    icon: "🧼",
    comment: "Minimum booking: 2 hours (£17.50/hr)",
    description:
      "Keep your home consistently clean without lifting a finger. Perfect for weekly or fortnightly visits that maintain a fresh, comfortable space.",
    features: [
      "Dusting and wiping down surfaces",
      "Vacuuming and mopping floors",
      "Cleaning kitchens and bathrooms",
      "Emptying bins",
      "Tidying each room for a neat finish",
    ],
    footer:
      "A reliable routine that keeps your home looking its best, week in, week out.",
  },
  {
    title: "Deep Clean",
    price: "from £70",
    icon: "🪣",
    comment: "Like hitting the reset button for your home",
    description:
      "A thorough clean that tackles everything your regular routine misses — from behind appliances to light fittings to inside windows.",
    features: [
      "Behind and under furniture and appliances",
      "Skirting boards, doors and frames",
      "Light fittings, switches and handles",
      "Full kitchen and bathroom refresh",
      "Cupboards and fridges (optional add-ons)",
      "Inside windows polished streak-free",
      "High-touch areas disinfected",
    ],
    footer:
      "Great when you want your home to feel brand new — after renovations, before guests or just because.",
  },
  {
    title: "End of Tenancy",
    price: "£POA",
    icon: "🏠",
    comment: "Compliant with landlord/agency requirements",
    description:
      "Cleaned to landlord and letting agent standards, giving you the best chance of a smooth handover and your full deposit back.",
    features: [
      "Deep clean of every room, fixture and fitting",
      "Full kitchen and bathroom detail",
      "Inside and outside of appliances",
      "Floors vacuumed and mopped throughout",
      "Interior windows cleaned",
    ],
    footer:
      "Tailored checklist to match agency standards for a smooth handover.",
  },
  {
    title: "House Moves",
    price: "£POA",
    icon: "🚚",
    comment: "Move-in / Move-out support",
    description:
      "Moving is stressful enough — let us handle the cleaning. We'll leave your old place spotless and have your new home ready to move straight into.",
    features: [
      "Kitchen and bathroom scrubs",
      "Floors vacuumed and mopped",
      "Dusting and wiping all surfaces",
      "Cupboards and storage cleaned",
      "Optional appliance cleaning",
    ],
    footer:
      "Flexible scheduling around your move so you can focus on the logistics, not the cleaning.",
  },
];

function ServiceAccordion({ features, id, isOpen, toggle }) {
  return (
    <div className="mt-6 text-left">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        className="flex w-full items-center justify-between rounded-xl bg-soft px-4 py-3 text-left text-sm font-semibold text-primary transition hover:bg-primary/10"
      >
        <span>What's included</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        id={`${id}-content`}
        role="region"
        aria-hidden={!isOpen}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <ul className="space-y-2 rounded-2xl bg-white/90 px-4 pb-4 pt-2 text-sm leading-relaxed text-gray-700">
          {features.map((feature, idx) => (
            <li className="flex items-start gap-2" key={idx}>
              <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services({ locationName }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="services" className="bg-soft py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-primary">
          {locationName ? `Cleaning Services in ${locationName}` : "Our Services"}
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-gray-600">
          {locationName
            ? `ShropShine Cleaning offers the following services in ${locationName}. Tap or click "What's included" on any card to see the detailed checklist.`
            : `Every service is carried out with the same care and attention. Tap any card to see exactly what's included.`}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {services.map((s, index) => {

            const isOpen = openIndex === index;
            const sectionId = `service-${index}`;

            return (
              <article
                key={sectionId}
                aria-labelledby={`${sectionId}-title`}
                className="rounded-3xl border border-soft/70 bg-white p-6 text-center shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-5xl leading-none" role="img" aria-label={s.title}>
                  {s.icon}
                </div>
                <h3 id={`${sectionId}-title`} className="mt-4 text-2xl font-semibold text-dark">
                  {s.title}
                </h3>
                <div className="mt-2 inline-flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {s.price}
                  </span>
                </div>
                <p className="mt-2 text-sm italic text-gray-500">{s.comment}</p>
                <p className="mt-4 text-base leading-relaxed text-gray-700">{s.description}</p>
                <p className="mt-4 text-sm text-gray-600">{s.footer}</p>

                <ServiceAccordion
                  features={s.features}
                  id={sectionId}
                  isOpen={isOpen}
                  toggle={() => setOpenIndex(isOpen ? null : index)}
                />
              </article>
            );
          })}
        </div>

        {/* CTA strip */}
        <div className="mt-12 rounded-3xl bg-primary/5 border border-primary/15 p-8 text-center">
          <p className="text-lg font-semibold text-dark">
            Not sure which service you need?
          </p>
          <p className="mt-2 text-gray-600">
            Give us a call or drop us a message — we're happy to help you find the right option.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow transition hover:bg-primary/90 hover:scale-105"
            >
              Request a Slot
            </a>
            <a
              href="tel:07532029849"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary/5 hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14v2.92z"/>
              </svg>
              07532 029849
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
