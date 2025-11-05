import { useEffect, useRef, useState } from "react";
import L, { popup } from "leaflet";
import "leaflet/dist/leaflet.css";
import useMap from "./LakbayZustand";
import gpsIcon from "../assets/gps.png"
import "leaflet-routing-machine"
import "leaflet-rotatedmarker"
import Swal from "sweetalert2"; 
import Lakbay from "../assets/LakbayPH.png"
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
    const { pointOfPlaces, storeInformationOfThePlace, storeUserLocation, shouldShowRoute, informationOfThePlace, 
      storeShowRoute, mapState, saveMapState, routeState, setRouteState, clearRouteState, setFavoriteToShow, favoriteToShow } = useMap(); 
    const philippineBounds = L.latLngBounds(
      [4.6, 116.7],
      [21.3, 126.6]
    )
    
    useEffect(() => {
        // Initialize map with saved state or defaults
        const initialCenter = mapState.initialized ? mapState.center : [12.8797, 121.7740];
        const initialZoom = mapState.initialized ? mapState.zoom : 6;
        
        mapRef.current = L.map("map", {
            center: initialCenter,
            zoom: initialZoom
        }).setMaxBounds(philippineBounds);
        
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            minZoom: 8,
        }).addTo(mapRef.current);
   
        // Save map state on move and zoom events
        mapRef.current.on('moveend zoomend', () => {
            if (mapRef.current) {
                const center = mapRef.current.getCenter();
                const zoom = mapRef.current.getZoom();
                saveMapState([center.lat, center.lng], zoom);
            }
        });
        
        // Start location tracking after map is ready
        // Only use watchLocation initially - it will call show() when location is found
        watchLocation();
        
        // Restore route if one was active before navigation
        if (routeState.isActive && routeState.userLocation && routeState.destination) {
            setTimeout(() => {
                restoreRoute();
            }, 1000); // Wait a bit for map to be fully ready
        }
        
        // Debounced restart function to prevent multiple rapid calls
        const debouncedRestart = () => {
            if (restartTimeoutRef.current) {
                clearTimeout(restartTimeoutRef.current);
            }
            
            restartTimeoutRef.current = setTimeout(() => {
                if (mapRef.current) {
                    console.log("Debounced restart of location tracking");
                    watchLocation();
                }
            }, 2000); // Wait 2 seconds before restarting
        };
        
        // Handle page visibility changes - restart geolocation when page becomes visible
        const handleVisibilityChange = () => {
            if (!document.hidden && mapRef.current) {
                console.log("Page became visible");
                debouncedRestart();
            }
        };
        
        // Handle window focus - restart geolocation when window gains focus
        const handleWindowFocus = () => {
            if (mapRef.current && document.hasFocus()) {
                console.log("Window gained focus");
                debouncedRestart();
            }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleWindowFocus);
         
        return () => {
            // Remove event listeners
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleWindowFocus);
            
            // Clean up timeouts
            if (restartTimeoutRef.current) {
                clearTimeout(restartTimeoutRef.current);
            }
            
            // Clean up geolocation watcher
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
            
            // Clean up route control
            if (routeControlRef.current && mapRef.current) {
                mapRef.current.removeControl(routeControlRef.current);
                routeControlRef.current = null;
            }
            
            // Save final state before cleanup
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
    console.log("walang nahanap")
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
    const now = Date.now();
    if (now - lastLocationRequestRef.current < 3000) {
      console.log("Location request throttled, too soon since last request");
      return;
    }
    
    // Prevent multiple simultaneous requests
    if (isLocationRequestingRef.current) {
      console.log("Location request already in progress");
      return;
    }
    
    console.log("Getting current location...");
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    
    lastLocationRequestRef.current = now;
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
        maximumAge: 5000, // Allow cached location up to 5 seconds old
        timeout: 15000 // Increase timeout
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
      // Check if marker exists and is still on the map
      if(!userMarkerRef.current || !mapRef.current.hasLayer(userMarkerRef.current)){
        // Create new marker
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
        
        // Set view to user location only when creating new marker
        mapRef.current.setView([lat, lng], 15);
      } else {
        // Update existing marker position
        userMarkerRef.current.setLatLng([lat, lng]);
        mapRef.current.panTo([lat, lng]);
      }
    }
  }

  const error = (error) => {
    // Don't log timeout errors if they happen repeatedly (browser throttling)
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

  // Handle route showing for search results (informationOfThePlace)
  useEffect(() => {
    if (!shouldShowRoute) return; 
    if (!informationOfThePlace) return;
    
    // Clear favoriteToShow when showing route for search result
    setFavoriteToShow(null);
    
    console.log("Showing route for search result:", informationOfThePlace.properties?.name);
    showRoute(informationOfThePlace?.geometry?.coordinates[1], informationOfThePlace?.geometry.coordinates[0]);
  
  }, [informationOfThePlace, shouldShowRoute]);

  // Handle route showing for favorites (favoriteToShow)
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

    // Create new route control
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
    

    // Store route state for persistence
    setRouteState(
      true, 
      [userLat, userLng], 
      [destinationLat, destionationlng],
      [[userLat, userLng], [destinationLat, destionationlng]]
    );
  }

  const restoreRoute = () => {
    if (!routeState.isActive || !routeState.waypoints || !mapRef.current) return;
    
    console.log("Restoring route...");
    
    // Remove existing route if any
    if(routeControlRef.current){
      mapRef.current.removeControl(routeControlRef.current);
    }

    const [start, end] = routeState.waypoints;
    
    // Recreate the route control
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
      <button className="absolute bottom-20 right-15 z-10 p-5 rounded-full bg-white cursor-pointer
        hover:border" title="Get my location" onClick={() => getLocation()}>
        <img src={gpsIcon} alt="" className="w-15 h-15"/>
      </button>
    </div>
  );
}

export default Map;
