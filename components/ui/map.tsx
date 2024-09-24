"use client";

import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.75rem",
};

const center = {
  lat: 51.5074,
  lng: -0.1278,
};

export function MapComponent() {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Контент карты */}
      </GoogleMap>
    </LoadScript>
  );
}
