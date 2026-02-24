import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const center = { lat: 52.9163, lng: -3.0265 }; // Approx. St Martins
const NINE_MILES_METERS = 14484;

// Single place names only (no ", UK" or postcodes)
const ALL_LOCATIONS = [
  "St Martin's",
  "Oswestry",
  "Overton",
  "Llangollen",
  "Weston Rhyn",
  "Ellesmere",
  "Morda",
  "Gobowen",
  "Chirk",
  "Whittington",
  "Selattyn",
  "Nesscliffe",
  "West Felton",
  "Froncysyllte",
  "Dudleston Heath",
   "Shrewsbury",
];

export default function MapServiceArea({
  containerClassName = "mx-auto max-w-5xl",
  gridClassName = "mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
  previewCount = 8,
  withJsonLd = true,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["maps"],
  });

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map || !isLoaded) return;

    const circle = new window.google.maps.Circle({
      strokeColor: "#16a34a", // aligns with green brand tone
      strokeOpacity: 0.95,
      strokeWeight: 2,
      fillColor: "#22c55e",
      fillOpacity: 0.14,
      map,
      center,
      radius: NINE_MILES_METERS,
      clickable: false,
    });

    return () => circle.setMap(null);
  }, [map, isLoaded]);

  return (
    <section aria-label="Service area map and locations">
      {/* Map */}
      <div className={containerClassName}>
        {loadError ? (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm">
            There was a problem loading the map. Please try again later.
          </div>
        ) : !isLoaded ? (
          <div className="h-96 w-full rounded-2xl border bg-gray-100 animate-pulse" />
        ) : (
          <GoogleMap
            onLoad={(m) => setMap(m)}
            mapContainerStyle={{ width: "100%", height: "384px", borderRadius: "16px" }}
            center={center}
            zoom={10}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
              clickableIcons: false,
            }}
          />
        )}
      </div>

      {/* Areas list (chips only) */}
      <div className={containerClassName}>
        <ServiceAreaList
          previewCount={previewCount}
          gridClassName={gridClassName}
            chipClassName="block w-full truncate rounded-2xl border border-gray-200 bg-white px-4 py-2 text-base text-slate-700 shadow-sm hover:bg-gray-50 hover:shadow transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-center"
        />
      </div>

      {withJsonLd && <JsonLdAreaServed />}
    </section>
  );
}

function ServiceAreaList({ previewCount = 8, gridClassName, chipClassName }) {
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(() => ALL_LOCATIONS.slice(0, previewCount), [previewCount]);
  const hidden = useMemo(() => ALL_LOCATIONS.slice(previewCount), [previewCount]);

  const list = expanded ? ALL_LOCATIONS : visible;

  return (
    <>
      <ul className={gridClassName} aria-label="Locations we serve">
        {list.map((name) => (
          <li key={name}>
            <LocationChip name={name} className={chipClassName} />
          </li>
        ))}
      </ul>

      {hidden.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-expanded={expanded}
            aria-controls="service-area-more"
          >
            {expanded ? "Show fewer" : `Show all ${ALL_LOCATIONS.length}`}
          </button>
        </div>
      )}

      <div id="service-area-more" className="sr-only" aria-hidden={!expanded}>
        {hidden.join(", ")}
      </div>
    </>
  );
}

function LocationChip({ name, className = "" }) {
  const href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title={name}
      aria-label={`Open ${name} on Google Maps in a new tab`}
    >
      {name}
    </a>
  );
}

/**
 * JSON-LD listing only the areas (no visible text, helps SEO).
 */
function JsonLdAreaServed() {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: ALL_LOCATIONS.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "Place", name },
      })),
    }),
    []
  );

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}