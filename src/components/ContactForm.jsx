import { useState } from "react";

const GETFORM_ENDPOINT = "https://getform.io/f/bkknmmmb";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _gotcha: "", // honeypot for bots
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation (same as before)
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Build multipart/form-data for Getform
      const body = new FormData();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("phone", formData.phone);
      body.append("message", formData.message);
      // Honeypot (bots will fill this, humans won't)
      body.append("_gotcha", formData._gotcha);

      const response = await fetch(GETFORM_ENDPOINT, {
        method: "POST",
        body,
        // Do NOT set Content-Type; the browser will set the correct boundary
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        // Optional: clear the form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          _gotcha: "",
        });
      } else {
        // Try to read any error message from Getform
        let msg = "Something went wrong. Please try again.";
        try {
          const data = await response.json();
          if (data?.error) msg = data.error;
        } catch {}
        setError(msg);
      }
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
          <div
            className="text-green-600 text-center text-lg font-medium"
            role="status"
            aria-live="polite"
          >
            Thank you! We’ll be in touch shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <div
                className="bg-red-100 text-red-700 p-3 rounded text-sm"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </div>
            )}

            {/* Honeypot field (hidden) */}
            <input
              type="text"
              name="_gotcha"
              value={formData._gotcha}
              onChange={handleChange}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

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
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-3 rounded hover:bg-opacity-90 w-full font-semibold transition disabled:opacity-70"
              aria-busy={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}