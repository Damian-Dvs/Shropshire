const testimonials = [
  {
    name: "Lucy E.",
    text: "Hayley is lovely, very thorough and was great with my dog pip too!",
  },
  {
    name: "Holly C.",
    text: "Hayley Did a fantastic job, with great attention to detail. Would definately recommend her services",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-soft py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary mb-10">
          What Our Clients Say
        </h2>
        <div className="space-y-8">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="bg-white p-6 rounded-lg shadow text-left"
            >
              <p className="text-gray-700 italic">“{t.text}”</p>
              <cite className="mt-4 block font-semibold text-primary not-italic">
                – {t.name}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}