"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Coordinate } from './field.types';

// Fix for default marker icons in Leaflet + Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  points: Coordinate[];
  onAddPoint: (point: Coordinate) => void;
  isDrawing: boolean;
  center: [number, number];
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

function DrawingLayer({ isDrawing, onAddPoint }: { isDrawing: boolean, onAddPoint: (p: Coordinate) => void }) {
  useMapEvents({
    click(e) {
      if (isDrawing) {
        onAddPoint({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
}

export default function MapView({ points, onAddPoint, isDrawing, center }: MapViewProps) {
  return (
    <MapContainer 
      center={center} 
      zoom={15} 
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      
      {points.length > 0 && (
        <>
          <Polygon 
            positions={points.map(p => [p.lat, p.lng])} 
            pathOptions={{ 
              color: '#4CAF50', 
              fillColor: '#4CAF50', 
              fillOpacity: 0.3,
              weight: 3,
              dashArray: isDrawing ? '5, 10' : ''
            }} 
          />
          {points.map((p, i) => (
            <Marker key={i} position={[p.lat, p.lng]} />
          ))}
        </>
      )}

      <MapController center={center} />
      <DrawingLayer isDrawing={isDrawing} onAddPoint={onAddPoint} />
    </MapContainer>
  );
}
