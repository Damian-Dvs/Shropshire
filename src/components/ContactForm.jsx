import { useState, useRef } from "react";

const GETFORM_ENDPOINT = "/api/contact";

export default function ContactForm() {
  const inputClass = "w-full h-12 bg-white border border-primary rounded p-3 focus:outline-none focus:ring focus:ring-primary appearance-none text-left text-base";
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",         
    serviceDate: "",
    serviceTime: "",
    message: "",
    hearAbout: "",       
    _gotcha: "", // honeypot for bots
  });

  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const activatePicker = (ref, type) => {
    const el = ref?.current;
    if (!el) return;
    if (el.type !== type) el.type = type;
    requestAnimationFrame(() => {
      try {
        if (typeof el.showPicker === 'function') {
          el.showPicker();
        } else {
          el.focus();
        }
      } catch (_) {
        el.focus();
      }
    });
  };

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

    // Simple client-side validation (now includes new fields)
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.location ||            
      !formData.serviceDate ||
      !formData.serviceTime ||
      !formData.message
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Build JSON payload for our own API
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        serviceDate: formData.serviceDate,
        serviceTime: formData.serviceTime,
        message: formData.message,
        hearAbout: formData.hearAbout,   // NEW (optional)
        _gotcha: formData._gotcha,
      };

      const response = await fetch(GETFORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (_) {}

      if (response.ok && (!data || data.ok !== false)) {
        setSubmitted(true);
        // Optional: clear the form
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "",                  
          serviceDate: "",
          serviceTime: "",
          message: "",
          hearAbout: "",                
          _gotcha: "",
        });
      } else {
        let msg = "Something went wrong. Please try again.";
        if (data?.error) msg = data.error;
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
            className="text-black text-center text-lg font-medium"
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
              className={inputClass}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              className={inputClass}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              aria-label="Phone Number"
              className={inputClass}
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location (e.g., Oswestry)"
              aria-label="Location"
              className={inputClass}
              value={formData.location}
              onChange={handleChange}
              required
            />

            <div className="grid gap-3 md:gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="serviceDate" className="block text-sm text-primary font-medium mb-1">Preferred Date</label>
                <input
                  type="text"
                  id="serviceDate"
                  name="serviceDate"
                  aria-label="Preferred Date"
                  className={inputClass}
                  min={today}
                  value={formData.serviceDate}
                  onChange={handleChange}
                  onFocus={() => activatePicker(dateRef, 'date')}
                  onClick={() => activatePicker(dateRef, 'date')}
                  onTouchStart={() => activatePicker(dateRef, 'date')}
                  onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                  inputMode="none"
                  placeholder="Preferred Date"
                  ref={dateRef}
                  required
                />
              </div>
              <div>
                <label htmlFor="serviceTime" className="block text-sm text-primary font-medium mb-1">Preferred Time</label>
                <input
                  type="text"
                  id="serviceTime"
                  name="serviceTime"
                  aria-label="Preferred Time"
                  className={inputClass}
                  value={formData.serviceTime}
                  onChange={handleChange}
                  onFocus={() => activatePicker(timeRef, 'time')}
                  onClick={() => activatePicker(timeRef, 'time')}
                  onTouchStart={() => activatePicker(timeRef, 'time')}
                  onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                  inputMode="none"
                  placeholder="Preferred Time"
                  ref={timeRef}
                  required
                />
              </div>
            </div>
            <p className="text-sm text-gray-600">We’ll confirm the closest available slot.</p>

            <textarea
              name="message"
              rows="4"
              placeholder="Message"
              aria-label="Message"
              className={inputClass}
              value={formData.message}
              onChange={handleChange}
              required
            />

            {/* NEW: How did you hear about us? (last field) */}
            <div>
              <label htmlFor="hearAbout" className="block text-sm text-primary font-medium mb-1">
                How did you hear about us?
              </label>
              <select
                id="hearAbout"
                name="hearAbout"
                aria-label="How did you hear about us?"
                className={`${inputClass} h-auto py-3`}
                value={formData.hearAbout}
                onChange={handleChange}
              >
                <option value="">Please select</option>
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
                <option value="Flyer/Poster">Flyer/Poster</option>
                <option value="Recommendation">Recommendation</option>
              </select>
            </div>

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
