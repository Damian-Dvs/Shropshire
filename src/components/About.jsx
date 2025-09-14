import MapServiceArea from "./MapServiceArea";

export default function About() {
  return (
    <section id="about" className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main header */}
        <h2 className="text-3xl font-bold text-primary mb-6">About ShropShine</h2>

        {/* Main intro */}
        <p className="text-gray-700 leading-relaxed text-lg mb-8">
          ShropShine is a family-run cleaning company serving homes and businesses across
          Shropshire. We pride ourselves on <strong>reliability</strong>,{" "}
          <strong>attention to detail</strong>, and bringing a shine to every space we
          clean. Whether you need regular home cleans or one-off deep cleaning, we’re here
          to help — with a sparkle.
        </p>

        {/* Areas + Map */}
        <div className="mt-12 text-left">
          <h3 className="text-3xl font-bold text-primary text-center mb-6">
            Areas we serve
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg text-center mb-6">
            We provide domestic and commercial cleaning locally, covering towns and
            villages within roughly a 9-mile radius of St Martins.
          </p>

          <MapServiceArea />
        </div>

        {/* Insurance section */}
        <div className="mt-12 text-center">
          <h3 className="text-3xl font-bold text-primary mb-4">Fully insured</h3>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            For your peace of mind, ShropShine is <strong>fully insured</strong> through
            Simply Business.
          </p>

          {/* Insurance Badge */}
          <div className="flex justify-center">
            <div
              className="simplybusiness-insurance-badge rounded-2xl shadow-md border border-gray-200"
              style={{
                width: "220px",
                minWidth: "220px",
                maxWidth: "220px",
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <div
                style={{
                  margin: 0,
                  padding: "16px 0",
                  background: "#fff",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <picture>
                  <source
                    srcSet="https://quote.simplybusiness.co.uk/assets/ci5/sb/badge_logo.webp"
                    type="image/webp"
                  />
                  <source
                    srcSet="https://quote.simplybusiness.co.uk/assets/ci5/sb/badge_logo.png"
                    type="image/png"
                  />
                  <img
                    alt="Simply Business"
                    height="60"
                    width="58"
                    loading="lazy"
                    src="https://quote.simplybusiness.co.uk/assets/ci5/sb/badge_logo.png"
                    style={{
                      display: "block",
                      margin: "0 auto",
                      border: 0,
                      background: "none",
                    }}
                  />
                </picture>
                <p
                  style={{
                    margin: "12px 0 8px",
                    padding: "0 14px",
                    textAlign: "center",
                    font: "14px/17px Arial, sans-serif",
                    color: "#535353",
                  }}
                >
                  Business insurance provided through Simply Business.
                </p>
                <a
                  href="https://quote.simplybusiness.co.uk/certificate/policy-overview/IMg17JpKAbrMB_bThUgx9Q/?ref_id=RAFXA_CHBI5164646XB1&source=popBadge"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    textDecoration: "underline",
                    font: "14px/17px Arial, sans-serif",
                    color: "#00827F",
                  }}
                >
                  View our insurance details
                </a>
              </div>
              <a
                href="https://www.simplybusiness.co.uk/?ref_id=RAFXA_CHBI5164646XB1&source=popBadge"
                target="_blank"
                rel="nofollow noopener noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  font: "13px/32px Arial, sans-serif",
                  color: "#fff",
                  background: "#535353",
                }}
              >
                www.simplybusiness.co.uk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}