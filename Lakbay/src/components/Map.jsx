import { useEffect, useRef, useState } from "react";
import L, { popup } from "leaflet";
import "leaflet/dist/leaflet.css";
import useMap from "./LakbayZustand";
import gpsIcon from "../assets/gps.png"
import "leaflet-routing-machine"
import "leaflet-rotatedmarker"
import Swal from "sweetalert2"; 
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import Lakbay from "../assets/LakbayPH.png"
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});
function Map() {
    const mapRef = useRef(null);
    const pointOfPlacesMarker = useRef([]);
    const userLocationRef = useRef([]);
    const userMarkerRef = useRef(null);
    const routeControlRef = useRef(null);
    const watchIdRef = useRef(null);
    const lastLocationRequestRef = useRef(0);
    const isLocationRequestingRef = useRef(false);
    const restartTimeoutRef = useRef(null);
    const autoCenterRef = useRef(true);
    const { pointOfPlaces, storeInformationOfThePlace, storeUserLocation, shouldShowRoute, informationOfThePlace, 
      storeShowRoute, mapState, saveMapState, routeState, setRouteState, clearRouteState, setFavoriteToShow, favoriteToShow } = useMap(); 
    const philippineBounds = L.latLngBounds(
      [4.6, 116.7],
      [21.3, 126.6]
    )
    
    useEffect(() => {
        const initialCenter = mapState.initialized ? mapState.center : [12.8797, 121.7740];
        const initialZoom = mapState.initialized ? mapState.zoom : 6;
        
        mapRef.current = L.map("map", {
            center: initialCenter,
            zoom: initialZoom
        }).setMaxBounds(philippineBounds);

        mapRef.current.on('movestart', () => {
          autoCenterRef.current = false;
        })
        
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            minZoom: 7,
        }).addTo(mapRef.current);
   
        mapRef.current.on('moveend zoomend', () => {
            if (mapRef.current) {
                const center = mapRef.current.getCenter();
                const zoom = mapRef.current.getZoom();
                saveMapState([center.lat, center.lng], zoom);
            }
        });
      
        watchLocation();
      
        if (routeState.isActive && routeState.userLocation && routeState.destination) {
            setTimeout(() => {
                restoreRoute();
            }, 1000); 
        }
        
        const debouncedRestart = () => {
            if (restartTimeoutRef.current) {
                clearTimeout(restartTimeoutRef.current);
            }
            
            restartTimeoutRef.current = setTimeout(() => {
                if (mapRef.current) {
                    console.log("Debounced restart of location tracking");
                    watchLocation();
                }
            }, 2000);
        };
        
        const handleVisibilityChange = () => {
            if (!document.hidden && mapRef.current) {
                console.log("Page became visible");
                debouncedRestart();
            }
        };
        
        const handleWindowFocus = () => {
            if (mapRef.current && document.hasFocus()) {
                console.log("Window gained focus");
                debouncedRestart();
            }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleWindowFocus);
         
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleWindowFocus);
            
       
            if (restartTimeoutRef.current) {
                clearTimeout(restartTimeoutRef.current);
            }
            
        
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
            
     
            if (routeControlRef.current && mapRef.current) {
                mapRef.current.removeControl(routeControlRef.current);
                routeControlRef.current = null;
            }
            
       
            if (mapRef.current) {
                const center = mapRef.current.getCenter();
                const zoom = mapRef.current.getZoom();
                saveMapState([center.lat, center.lng], zoom);
                mapRef.current.remove();
            }
            
            // Reset refs
            userMarkerRef.current = null;
            userLocationRef.current = [];
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
      });

      Swal.fire({
        icon: "success",
        imageUrl: Lakbay,
        imageHeight: "150px",
        imageWidth: "150px",
        title: `${pointOfPlaces.length} Point of Places Found.`,
        text: "Enjoy browsing the locations information.",
        
        timer: "2000",
        showConfirmButton: false,
      

      })

    }
  if (pointOfPlaces && pointOfPlaces.length > 0) {
    displayPointOfPlaces();
    if(routeControlRef.current){
       mapRef.current.removeControl(routeControlRef.current);
    }
   
  }
  if(pointOfPlaces && pointOfPlaces.length === 0){
    Swal.fire({
      imageUrl: Lakbay,
      imageHeight: "150px",
      imageWidth: "150px",
      title: "No Point of Place Found",
      text: "Try searching for different places.",
      icon: "error",
      popup: "swal2-show",
      backdrop: "swal2-backdrop-show",

    })
  }

  }, [pointOfPlaces]);

  
  const handlePlaceInformation = async (place) => {
    setFavoriteToShow(null);
    storeInformationOfThePlace(place);
    storeShowRoute(false);

    clearRouteState();
     mapRef.current.flyTo([place.geometry.coordinates[1], place.geometry.coordinates[0]], 16, {
      animate: true,
      duration: 1.5,
    });
   
  }

  const watchLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    
    // Clear any existing watch
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    
    console.log("Starting location watch...");
    watchIdRef.current = navigator.geolocation.watchPosition(show, error, {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 15000 
    });
  }
  const getLocation = () => {

    
    if (isLocationRequestingRef.current) {
      console.log("Location request already in progress");
      return;
    }
    
    console.log("Getting current location...");
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    
    isLocationRequestingRef.current = true;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        isLocationRequestingRef.current = false;
        show(position);
      }, 
      (err) => {
        isLocationRequestingRef.current = false;
        error(err);
      }, 
      {
        enableHighAccuracy: true,
        maximumAge: 5000, 
        timeout: 15000 
      }
    );
  }

  const show = (position) => {
    console.log("Location found:", position);
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    storeUserLocation(lat, lng);
    userLocationRef.current = [lat, lng];
    
    if(mapRef.current){
      if(!userMarkerRef.current || !mapRef.current.hasLayer(userMarkerRef.current)){
        userMarkerRef.current = L.marker([lat, lng]).bindTooltip("You are here!", {
          permanent: true,
          direction: "top",
          offset: [0, -10]
        }).on("click", () => { 
          mapRef.current.flyTo([lat, lng], 16, {
            animate: true,
            duration: 1.5,
          });
        }).addTo(mapRef.current);
        
        if(autoCenterRef.current){
          mapRef.current.setView([lat, lng], 15);
        }
     
      } else {
        userMarkerRef.current.setLatLng([lat, lng]);
        if(autoCenterRef.current){
          mapRef.current.panTo([lat, lng]);
        }
      
      }
    }
  }

  const error = (error) => {
    if (error.code === error.TIMEOUT) {
      console.warn("Geolocation timeout - this is normal when switching tabs/windows");
      return;
    }
    
    console.error("Geolocation error:", error);
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
      default:
        console.error("An unknown error occurred.");
    }
  }


  useEffect(() => {
    if (!shouldShowRoute) return; 
    if (!informationOfThePlace) return;
    
  
    setFavoriteToShow(null);
    
    console.log("Showing route for search result:", informationOfThePlace.properties?.name);
    showRoute(informationOfThePlace?.geometry?.coordinates[1], informationOfThePlace?.geometry.coordinates[0]);
  
  }, [informationOfThePlace, shouldShowRoute]);


  useEffect(() => {
    if (!shouldShowRoute) return;
    if (!favoriteToShow) return;
    
    console.log("Showing route for favorite:", favoriteToShow.properties?.name);
    showRoute(favoriteToShow?.geometry?.coordinates[1], favoriteToShow?.geometry.coordinates[0]);
    
  }, [shouldShowRoute, favoriteToShow])


  const showRoute = (destinationLat, destionationlng) => {
    const [ userLat, userLng ] = userLocationRef.current;
    
    if(routeControlRef.current){
      mapRef.current.removeControl(routeControlRef.current);
    }


    routeControlRef.current = L.Routing.control({
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
    }).addTo(mapRef.current);
    


    setRouteState(
      true, 
      [userLat, userLng], 
      [destinationLat, destionationlng],
      [[userLat, userLng], [destinationLat, destionationlng]]
    );

    routeControlRef.current.getContainer().style.display = "none";

  }

  const restoreRoute = () => {
    if (!routeState.isActive || !routeState.waypoints || !mapRef.current) return;
    
    console.log("Restoring route...");
    

    if(routeControlRef.current){
      mapRef.current.removeControl(routeControlRef.current);
    }

    const [start, end] = routeState.waypoints;

    routeControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
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
    }).addTo(mapRef.current);
  }

  return (  
    <div className="relative w-full h-full">
      <div id="map" className="w-full h-[99%] z-0" />
      <button className="absolute bottom-10 md:bottom-20 md:right-15 right-5 z-10 p-5 rounded-full bg-white cursor-pointer
        hover:border" title="Get my location" onClick={() => { autoCenterRef.current = true; getLocation();}}>
        <img src={gpsIcon} alt="" className="w-7 h-7 md:w-15 md:h-15"/>
      </button>
    </div>
  );
}

export default Map;
