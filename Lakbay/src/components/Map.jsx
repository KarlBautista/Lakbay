import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useMap from "./LakbayZustand";

function Map() {
    const mapRef = useRef(null);
    const pointOfPlacesMarker = useRef([]);
    const { pointOfPlaces, storeInformationOfThePlace } = useMap(); 
    const philippineBounds = L.latLngBounds(
      [4.6, 116.7],
      [21.3, 126,6]
    )
    console.log(pointOfPlaces);
    useEffect(() => {
     mapRef.current = L.map("map").setView([14.5995, 120.9842], 13) //Sa manila muna to, wala pa yung location mo eh
     .setMaxBounds(philippineBounds)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 8,
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
        .bindTooltip(place.properties?.name || "Unknown Place", {
          permanent: true,
          direction: "top",
          offset: [0, -10],

        })
        .bindPopup(`${place.properties?.name}, ${place.properties?.address_line2}` || "Unkown Place")
        .on("click", () => handlePlaceInformation(place));

        pointOfPlacesMarker.current.push(marker);
      })

    }
  if (pointOfPlaces && pointOfPlaces.length > 0) {
    displayPointOfPlaces();
  }
  }, [pointOfPlaces]);

  const handlePlaceInformation = (place) => {
    storeInformationOfThePlace(place);
     mapRef.current.flyTo([place.geometry.coordinates[1], place.geometry.coordinates[0]], 16, {
      animate: true,
      duration: 1.5,
    })
  }

  return (
    <div id="map" className="w-[99%] h-[90%] rounded-2xl" />
  );
}

export default Map;
