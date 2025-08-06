import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Simulate submission (replace with real request)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Request a Slot</h2>
        {submitted ? (
          <div className="text-green-600 text-center text-lg font-medium">
            Thank you! We’ll be in touch shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{error}</div>
            )}
            <input
              type="text"
              name="name"
              placeholder="Name"
              aria-label="Name"
              className="w-full border border-primary rounded p-3 focus:outline-none focus:ring focus:ring-primary"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              className="w-full border border-primary rounded p-3 focus:outline-none focus:ring focus:ring-primary"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              aria-label="Phone Number"
              className="w-full border border-primary rounded p-3 focus:outline-none focus:ring focus:ring-primary"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Message or preferred time"
              aria-label="Message"
              className="w-full border border-primary rounded p-3 focus:outline-none focus:ring focus:ring-primary"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-3 rounded hover:bg-opacity-90 w-full font-semibold transition"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
