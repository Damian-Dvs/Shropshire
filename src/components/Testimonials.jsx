const testimonials = [
    {
      name: "Emma R.",
      text: "Absolutely spotless every time. ShropShine is the best cleaning service I've ever used.",
    },
    {
      name: "Josh M.",
      text: "Reliable, friendly, and thorough. Highly recommended.",
    },
  ];
  
  export default function Testimonials() {
    return (
      <section id="testimonials" className="bg-soft py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-10">What Our Clients Say</h2>
          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow text-left">
                <p className="text-gray-700 italic">"{t.text}"</p>
                <p className="mt-4 font-semibold text-primary">– {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  