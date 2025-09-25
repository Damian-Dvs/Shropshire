import { useState } from "react";

const services = [
  {
    title: "Standard Clean",
    price: "from £35",
    icon: "🧼",
    comment: "Minimum booking: 2 hours (£17.50/hr)",
    description:
      "Perfect for weekly or fortnightly cleans that keep your home fresh, tidy and comfortable without the stress.",
    features: [
      "Dusting and wiping down surfaces",
      "Vacuuming and mopping floors",
      "Cleaning kitchens and bathrooms",
      "Emptying bins",
      "Tidying each room for a neat finish",
    ],
    footer:
      "Ideal for a steady routine that keeps things looking their best in between deeper cleans.",
  },
  {
    title: "Deep Clean",
    price: "from £70",
    icon: "🪣",
    comment: "Like hitting the reset button for your home",
    description:
      "A more intensive clean that reaches the areas your regular routine doesn’t always cover, leaving everything sparkling.",
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
      "Top-to-bottom clean to help make deposits stress-free and impress landlords and letting agents.",
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
      "Leave your old place spotless or arrive to a home that’s fresh, welcoming and ready for boxes.",
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
        <span>What’s included</span>
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

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="services" className="bg-soft py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-primary">Our Services</h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-gray-600">
          Choose the clean that fits your space. Tap or click “What’s included” on any
          card to see the detailed checklist.
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
      </div>
    </section>
  );
}
