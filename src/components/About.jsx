export default function About() {
  return (
    <section id="about" className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">About ShropShine</h2>
        <p className="text-gray-700 leading-relaxed text-lg mb-8">
          ShropShine is a family-run cleaning company serving homes and businesses across Shropshire.
          We pride ourselves on <strong>reliability</strong>, <strong>attention to detail</strong>, and bringing a shine to every space we clean.
          Whether you need regular home cleans or one-off deep cleaning, we’re here to help — with a sparkle.
        </p>

        {/* Insurance Badge */}
        <div
          className="simplybusiness-insurance-badge"
          style={{
            width: "200px",
            minWidth: "200px",
            maxWidth: "200px",
            margin: "0 auto",
            padding: 0,
            float: "none",
            MozOsxFontSmoothing: "grayscale",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          <div
            style={{
              margin: 0,
              padding: "20px 0",
              background: "#fff",
              border: "1px solid #535353",
              borderRadius: "14px 14px 0 0",
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
                width="58"
                height="60"
                src="https://quote.simplybusiness.co.uk/assets/ci5/sb/badge_logo.png"
                style={{ display: "block", margin: "0 auto", border: 0, background: "none" }}
              />
            </picture>

            <p
              style={{
                margin: "16px 0 12px",
                padding: "0 15px",
                textAlign: "center",
                font: "14px/17px Arial, sans-serif",
                color: "#535353",
              }}
            >
              Business insurance provided through Simply Business.
            </p>
            <a
              href="https://quote.simplybusiness.co.uk/certificate/policy-overview/IMg17JpKAbrMB_bThUgx9Q/?ref_id=RAFXA_CHBI5164646XB1&amp;source=popBadge"
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
            href="https://www.simplybusiness.co.uk/?ref_id=RAFXA_CHBI5164646XB1&amp;source=popBadge"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              font: "14px/35px Arial, sans-serif",
              color: "#fff",
              background: "#535353",
              borderRadius: "0 0 14px 14px",
            }}
          >
            www.simplybusiness.co.uk
          </a>
        </div>
      </div>
    </section>
  );
}
