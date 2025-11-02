import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useMap from "./LakbayZustand";
import gpsIcon from "../assets/gps.png"
import "leaflet-routing-machine"
import "leaflet-rotatedmarker"
function Map() {
    const mapRef = useRef(null);
    const pointOfPlacesMarker = useRef([]);
    const userLocationRef = useRef([]);
    const userMarkerRef = useRef(null);
    const routeControlRef = useRef(null);
    const { pointOfPlaces, storeInformationOfThePlace, storeUserLocation, shouldShowRoute, informationOfThePlace, storeShowRoute } = useMap(); 
    const philippineBounds = L.latLngBounds(
      [4.6, 116.7],
      [21.3, 126.6]
    )
    useEffect(() => {
    getLocation();
     mapRef.current = L.map("map").setMaxBounds(philippineBounds)
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
      if(pointOfPlacesMarker.current){
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
          timeout: 15000,
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

  
  const handlePlaceInformation = async (place) => {
    storeInformationOfThePlace(place);
    storeShowRoute(false);
     mapRef.current.flyTo([place.geometry.coordinates[1], place.geometry.coordinates[0]], 16, {
      animate: true,
      duration: 1.5,
    });
   
  }


  const getLocation = () => {
    navigator.geolocation.watchPosition(show, error, {
      enableHighAccuracy: true,
      maximumAge: 0,
    });
 
  }

  const show = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    storeUserLocation(lat, lng);
    userLocationRef.current = [lat, lng];
    if(mapRef.current){
       mapRef.current.setView([lat, lng], 15);
      if(!userMarkerRef.current){
      userMarkerRef.current = L.marker([lat, lng]).bindTooltip("You are here!", {
        permanent: true,
        direction: "top",
        offset: [0, -10]
       }).on("click", () => { 
        mapRef.current.flyTo([lat, lng], 16, {
        animate: true,
        duration: 1.5,
       
       })
    })
       .addTo(mapRef.current);
    } else{
       userMarkerRef.current.setLatLng([lat, lng]);
       mapRef.current.panTo([lat, lng]);
    }
  }
  }

  const error = (error) => {
    console.log(error);
  }

  useEffect(() => {
    if (!shouldShowRoute) return; 
    if (!informationOfThePlace) return;

    if(shouldShowRoute && informationOfThePlace){
      showRoute(informationOfThePlace?.geometry?.coordinates[1], informationOfThePlace?.geometry?.coordinates[0]);
    }
  }, [informationOfThePlace, shouldShowRoute])

  const showRoute = (destinationLat, destionationlng) => {
    console.log
    const [ userLat, userLng ] =  userLocationRef.current;
    
    if(!userLat || !userLng){
      alert("user location not available yet!");
      return;
    }

    if(routeControlRef.current){
      mapRef.current.removeControl(routeControlRef.current);
    }

   routeControlRef.current =  L.Routing.control({
      waypoints: [
        L.latLng(userLat, userLng),
        L.latLng(destinationLat, destionationlng),
      ],
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [
          {
            color: "#D64545",
            weight: 6,
            opacity: 0.8
          }
        ]
      }
    }
  )
    .addTo(mapRef.current);

  }

  return (
    <div className="relative w-full h-full">
      <div id="map" className="w-full h-[99%] z-0" />
      <button className="absolute bottom-20 right-15 z-10 p-5 rounded-full bg-white cursor-pointer
        hover:border" title="Get my location" onClick={() => getLocation()}>
        <img src={gpsIcon} alt="" className="w-15 h-15"/>
      </button>
    </div>
     
   
   
  
  );
}

export default Map;
