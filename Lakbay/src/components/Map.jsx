import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    useEffect(() => {
     mapRef.current = L.map("map").setView([14.5995, 120.9842], 13); 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapRef.current);
    

    mapRef.current.on("click", (e) => {
        const { lat, lng } = e.latlng;
        
       if(markerRef.current){
        mapRef.current.removeLayer(markerRef.current);
       }

        markerRef.current = L.marker([lat, lng])
        .addTo(mapRef.current)
        .bindPopup(`Latitude: ${lat}<br>Longitude: ${lng}`)
        .openPopup()
       
    })
    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div id="map" className="w-[80%] h-screen" />
  );
}

export default Map;
