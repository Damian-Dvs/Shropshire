import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const center = { lat: 52.9163, lng: -3.0265 }; // St Martins
const NINE_MILES_METERS = 14484; // 9 miles

export default function MapServiceArea() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;

    const circle = new window.google.maps.Circle({
      map,
      center,
      radius: NINE_MILES_METERS,
      strokeColor: "#003049",
      fillColor: "#003049",
      strokeOpacity: 0.9,
      fillOpacity: 0.2,
      strokeWeight: 2,
      clickable: false,
      zIndex: 2,
    });

    return () => circle.setMap(null);
  }, [map]);

  if (loadError) return <div>❌ Map failed to load.</div>;
  if (!isLoaded) return <div>Loading map…</div>;

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg">
      <GoogleMap
        onLoad={(m) => setMap(m)}
        mapContainerStyle={{ width: "100%", height: "384px", borderRadius: "12px" }}
        center={center}
        zoom={10} 
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
        }}
      />
    </div>
  );
}