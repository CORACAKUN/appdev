'use client';

import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
  onSelect?: (address: string) => void;
};

function LocationMarker({ onSelect }: { onSelect?: (address: string) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onSelect?.(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
    },
  });

  return position ? (
    <Marker position={position} />
  ) : null;
}

export default function AddressPicker({ onSelect }: Props) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-white mb-2">
        📍 Select a Location
      </h2>

      <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl bg-white/5">
        <MapContainer
          center={[13.41, 122.56]}
          zoom={6}
          scrollWheelZoom={true}
          className="w-full h-72"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <LocationMarker onSelect={onSelect} />
        </MapContainer>
      </div>
    </div>
  );
}
