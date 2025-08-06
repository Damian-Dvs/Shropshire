const services = [
  { title: "Standard Clean", price: "from £35", icon: "🧼" },
  { title: "Deep Clean", price: "from £65", icon: "🪣" },
  { title: "End of Tenancy", price: "£POA", icon: "🏠" },
  { title: "House Moves", price: "£POA", icon: "🚚" },
];

export default function Services() {
  return (
    <section id="services" className="py-16 px-4 bg-soft">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white shadow-lg p-6 rounded-lg text-center border border-soft hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="text-4xl mb-2">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{s.title}</h3>
              <p className="text-primary font-bold">{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
