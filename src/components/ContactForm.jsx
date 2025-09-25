import { useState, useRef } from "react";

const GETFORM_ENDPOINT = "/api/contact";

export default function ContactForm() {
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white/95 px-4 py-3 text-base text-gray-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
  const labelClass = "block text-left text-sm font-semibold text-primary";
  const today = new Date().toISOString().split("T")[0];
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
        if (typeof el.showPicker === "function") {
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
      const payload = { ...formData };

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
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-primary/15 bg-white/90 p-8 shadow-2xl sm:p-10">
          <h2
            id="contact-heading"
            className="text-center text-3xl font-bold text-primary"
          >
            Request a Slot
          </h2>
          <p className="mt-3 text-center text-gray-600">
            Tell us a little about the clean you need and we’ll reply within one working
            day.
          </p>

          {submitted ? (
            <div
              className="mt-6 rounded-2xl bg-soft/70 p-6 text-center text-lg font-medium text-dark"
              role="status"
              aria-live="polite"
            >
              Thank you! We’ll be in touch shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
              {error && (
                <div
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
                </div>
              )}

            {/* Honeypot */}
            <input
              type="text"
              name="_gotcha"
              value={formData._gotcha}
              onChange={handleChange}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-1">
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full name"
                  autoComplete="name"
                  className={inputClass}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputClass}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className={labelClass}>
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="07xxx xxxxxx"
                  autoComplete="tel"
                  className={inputClass}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="location" className={labelClass}>
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g. Oswestry"
                  autoComplete="address-level2"
                  className={inputClass}
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid gap-3 md:gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="serviceDate" className={labelClass}>
                  Preferred Date
                </label>
                <input
                  type="text"
                  id="serviceDate"
                  name="serviceDate"
                  aria-label="Preferred Date"
                  className={inputClass}
                  min={today}
                  value={formData.serviceDate}
                  onChange={handleChange}
                  onFocus={() => activatePicker(dateRef, "date")}
                  onClick={() => activatePicker(dateRef, "date")}
                  onTouchStart={() => activatePicker(dateRef, "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  inputMode="none"
                  placeholder="Preferred Date"
                  ref={dateRef}
                  required
                />
              </div>
              <div>
                <label htmlFor="serviceTime" className={labelClass}>
                  Preferred Time
                </label>
                <input
                  type="text"
                  id="serviceTime"
                  name="serviceTime"
                  aria-label="Preferred Time"
                  className={inputClass}
                  value={formData.serviceTime}
                  onChange={handleChange}
                  onFocus={() => activatePicker(timeRef, "time")}
                  onClick={() => activatePicker(timeRef, "time")}
                  onTouchStart={() => activatePicker(timeRef, "time")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  inputMode="none"
                  placeholder="Preferred Time"
                  ref={timeRef}
                  required
                />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              We’ll confirm the closest available slot.
            </p>

            <div className="space-y-1">
              <label htmlFor="message" className={labelClass}>
                Tell us about the clean
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="What needs attention, access notes, preferred frequency…"
                aria-describedby="contact-heading"
                className={`${inputClass} min-h-[150px] resize-y`}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* How did you hear about us? */}
            <div>
              <label htmlFor="hearAbout" className={labelClass}>
                How did you hear about us?
              </label>
              <div className="relative">
                <select
                  id="hearAbout"
                  name="hearAbout"
                  className={`${inputClass} h-12 appearance-none pr-10`}
                  value={formData.hearAbout}
                  onChange={handleChange}
                >
                  <option value="">Please select</option>
                  <option value="Google">Google</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Flyer/Poster">Flyer/Poster</option>
                  <option value="Recommendation">Recommendation</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-primary/70">
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
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              aria-busy={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
            <p className="text-center text-xs text-gray-500">
              Your information is used only to respond to your enquiry.
            </p>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}
