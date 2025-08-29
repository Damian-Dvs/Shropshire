const services = [
  { 
    title: "Standard Clean", 
    price: "from £35", 
    icon: "🧼", 
    comment: "Minimum booking: 2 hours (£17.50/hr)", 
    description:
      "Our standard clean is all about keeping your home fresh, tidy, and comfortable on a regular basis. It covers the everyday cleaning jobs that make the biggest difference, so you can relax and enjoy your space without the stress.",
    features: [
      "Dusting and wiping down surfaces",
      "Vacuuming and mopping floors",
      "Cleaning kitchens and bathrooms",
      "Emptying bins",
      "A general tidy-up to leave rooms neat and fresh",
    ],
    footer:
      "It’s a great option for weekly, fortnightly, or monthly cleaning to keep everything looking its best.",
  },
  { 
    title: "Deep Clean", 
    price: "from £65", 
    icon: "🪣", 
    comment: "Like hitting the reset button for your home", 
    description:
      "Our deep clean goes further than a regular clean, reaching those spots that don’t usually get much attention and leaving everything sparkling.",
    features: [
      "Cleaning behind and under furniture and appliances",
      "Wiping down skirting boards, doors, and frames",
      "Shining up light fittings, switches, and handles",
      "Full scrub and sanitise of bathrooms and kitchens",
      "Cleaning inside cupboards, ovens, and fridges (if requested)",
      "Polishing inside windows so they’re streak-free",
      "Disinfecting high-touch areas for extra peace of mind",
    ],
    footer:
      "Perfect if you’re moving in or out, preparing for guests, or just want your home to feel brand new again.",
  },
  { 
    title: "End of Tenancy", 
    price: "£POA", 
    icon: "🏠", 
    comment: "Compliant with landlord/agency requirements", 
    description:
      "A thorough top-to-bottom clean to make sure your property is ready for inspection and deposit return.",
    features: [
      "Deep cleaning of all rooms, fixtures, and fittings",
      "Full kitchen and bathroom clean",
      "Appliance cleaning (inside & outside)",
      "Carpets vacuumed and floors mopped",
      "Windows cleaned inside",
    ],
    footer:
      "Designed to meet landlord and letting agent standards for a stress-free handover.",
  },
  { 
    title: "House Moves", 
    price: "£POA", 
    icon: "🚚", 
    comment: "Move-in / Move-out support", 
    description:
      "Our move clean helps you leave your old home spotless or prepare your new one so it’s fresh and welcoming.",
    features: [
      "Deep cleaning of kitchens and bathrooms",
      "Floors vacuumed and mopped throughout",
      "Dusting and wiping all surfaces",
      "Cleaning cupboards and storage areas",
      "Optional appliance cleaning",
    ],
    footer:
      "Ideal for a smooth move without the hassle of cleaning on top of everything else.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 px-4 bg-soft">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {services.map((s, i) => (
            <article
              key={i}
              className="bg-white shadow-lg p-6 rounded-2xl text-center border border-soft/70 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-5xl mb-3 leading-none">{s.icon}</div>

              <h3 className="text-2xl font-semibold">{s.title}</h3>

              <div className="mt-2 mb-1 inline-flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {s.price}
                </span>
              </div>

              <p className="text-gray-600 text-sm italic mb-5">{s.comment}</p>

              {/* intro paragraph with comfortable line-length */}
              <p className="mx-auto max-w-[60ch] text-base leading-relaxed mb-4">
                {s.description}
              </p>

              {/* centered bullet section: ul is centered and sized; bullets align neatly */}
              <div className="mx-auto">
                <ul className="mx-auto inline-block text-left list-disc list-inside text-[0.95rem] leading-relaxed space-y-1.5 marker:text-primary">
                  {s.features?.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* footer note with lighter tone and centered */}
              <p className="mx-auto max-w-[60ch] text-gray-700 text-sm mt-5">
                {s.footer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}