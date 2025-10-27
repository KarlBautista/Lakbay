import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useMap from "./LakbayZustand";

function Map() {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const pointOfPlacesMarker = useRef([]);
    const { pointOfPlaces } = useMap(); 
    useEffect(() => {
     mapRef.current = L.map("map").setView([14.5995, 120.9842], 13); 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapRef.current);
     

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    const displayPointOfPlaces = () => {
      if(pointOfPlacesMarker.current && pointOfPlacesMarker.current.length > 0){
        pointOfPlacesMarker.current.forEach((place) => {
          mapRef.current.removeLayer(place);
        })
      }
      pointOfPlaces.forEach((place) => {
      const marker = L.marker([
            place.geometry.coordinates[1],
            place.geometry.coordinates[0]
        ])
        .addTo(mapRef.current)
        .bindPopup(place.properties?.name || "Unkown Place");

        pointOfPlacesMarker.current.push(marker);
      })

    }
  if (pointOfPlaces && pointOfPlaces.length > 0) {
    displayPointOfPlaces();
  }

  console.log(pointOfPlacesMarker);
  }, [pointOfPlaces]);


  return (
    <div id="map" className="w-[80%] h-screen" />
  );
}

export default Map;
