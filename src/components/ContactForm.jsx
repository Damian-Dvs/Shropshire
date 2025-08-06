import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://getform.io/f/bkknmmmb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => setSubmitted(false), 4000); // Hide after 4s
    } catch (err) {
      setError("There was a problem submitting the form.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="bg-soft py-6 px-0">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Request a Slot
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        {submitted && (
          <p className="text-green-600 text-center mb-4">
            🎉 Your request has been sent!
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border border-primary rounded p-3 focus:outline-none focus:ring focus:ring-primary"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full border border-primary rounded p-3 focus:outline-none focus:ring focus:ring-primary"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full border border-primary rounded p-3 focus:outline-none focus:ring focus:ring-primary"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Message or preferred time"
            className="w-full border border-primary rounded p-3 focus:outline-none focus:ring focus:ring-primary"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-3 rounded hover:bg-opacity-90 w-full font-semibold"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}
