import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

interface MapThumbnailProps {
  lat: number;
  lon: number;
  width?: number;
  height?: number;
}

const MapThumbnail: React.FC<MapThumbnailProps> = ({ lat, lon, width = 150, height = 100 }) => {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width, height, borderRadius: '8px' }}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
      keyboard={false}
      touchZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
};

export default MapThumbnail;
