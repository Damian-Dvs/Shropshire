import { useEffect, useMemo, useRef, useState } from "react";

const testimonials = [
  {
    name: "Jane C.",
    rating: 5,
    text: "Thank you to the lovely, hardworking Hayley. Her professionalism and thoroughness left my Mum's house like a new pin. Delighted.",
  },
  {
    name: "Lucy E.",
    rating: 5,
    text: "Hayley is lovely, very thorough and was great with my dog pip too!",
  },
  {
    name: "Holly C.",
    rating: 5,
    text: "Hayley did a fantastic job, with great attention to detail. Would definitely recommend her services.",
  },
  {
    name: "Jen H.",
    rating: 5,
    text: "Hayley is brilliant, she's just cleaned my house! She's even helped me with putting up my curtains 🤩 I have a biweekly clean and already looking forward to her coming back. Thanks Hayley! 😍",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = useMemo(() => testimonials.length, []);
  const paused = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) {
        setActiveIndex((idx) => (idx + 1) % total);
      }
    }, 7000);
    return () => clearInterval(timer);
  }, [total]);

  const goTo = (idx) => {
    setActiveIndex(idx % total);
  };

  const handlePrev = () => {
    goTo((activeIndex - 1 + total) % total);
  };

  const handleNext = () => {
    goTo((activeIndex + 1) % total);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="bg-soft py-16 px-4"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onFocusCapture={() => { paused.current = true; }}
      onBlurCapture={() => { paused.current = false; }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 id="testimonials-heading" className="text-3xl font-bold text-primary">
          What Our Clients Say
        </h2>
        <p className="mt-3 text-gray-600">
          Hear from the homeowners and businesses who trust ShropShine to keep their spaces spotless.
        </p>

        <div className="relative mt-12">
          <figure
            className="rounded-3xl bg-white px-6 py-10 shadow-xl transition duration-500 sm:px-10"
            key={activeIndex}
          >
            <svg
              className="mx-auto h-10 w-10 text-primary/30"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7.17 6A5.17 5.17 0 002 11.17v.16A5.67 5.67 0 007.65 17H8a1 1 0 001-1v-3.54a1 1 0 00-1-1H6.63a.13.13 0 01-.13-.13v-.85A2.48 2.48 0 019 8a1 1 0 001-1V7a1 1 0 00-.83-1zM17.17 6A5.17 5.17 0 0012 11.17v.16A5.67 5.67 0 0017.65 17H18a1 1 0 001-1v-3.54a1 1 0 00-1-1h-1.37a.13.13 0 01-.13-.13v-.85A2.48 2.48 0 0120 8a1 1 0 001-1V7a1 1 0 00-.83-1z" />
            </svg>
            <div className="mt-6 flex justify-center gap-1" aria-label={`${activeTestimonial.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${i < activeTestimonial.rating ? "text-yellow-400" : "text-gray-200"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-4 text-lg leading-relaxed text-gray-700">
              "{activeTestimonial.text}"
            </blockquote>
            <figcaption className="mt-6 font-semibold text-primary">
              {activeTestimonial.name}
            </figcaption>
          </figure>

          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Show previous testimonial"
              className="rounded-full border border-primary/40 bg-white p-2 text-primary transition hover:bg-primary hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={`h-2.5 w-8 rounded-full transition ${
                    idx === activeIndex ? "bg-primary" : "bg-primary/20"
                  }`}
                  aria-label={`Show testimonial ${idx + 1}`}
                  aria-current={idx === activeIndex}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Show next testimonial"
              className="rounded-full border border-primary/40 bg-white p-2 text-primary transition hover:bg-primary hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
