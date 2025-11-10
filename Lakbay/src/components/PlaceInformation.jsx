import React from 'react'
import useMap from './LakbayZustand'
import useUserData from "./LakbayUsersData"
import useAuthStore from './LakbayAuthZustand'
import Swal from 'sweetalert2'
import Lakbay from "../assets/LakbayPH.png"

const PlaceInformation = () => {
  const { informationOfThePlace, storeShowRoute } = useMap();
  const { addToFavorites, addToSaved } = useUserData();
  const { authenticatedUser } = useAuthStore();
  const place = informationOfThePlace.properties;

  const handleAddToFavorites = async () => {
    if (!authenticatedUser) {
      return Swal.fire({
        icon: "info",
        imageUrl: Lakbay,
        imageHeight: "150px",
        imageWidth: "150px",
        title: "Sign-in first to Save Places",
        text: "Please Sign-in your account first to be able to save your favorite spots.",
      });
    }

    try {
      const response = await addToFavorites({
        userId: authenticatedUser.id,
        placeName: place.name || null,
        address: place.address_line2 || null,
        openingHours: place.opening_hours || null,
        phone: place.phone || null,
        website: place.website || null,
        lat: informationOfThePlace.geometry.coordinates[1],
        long: informationOfThePlace.geometry.coordinates[0],
        placeId: place.place_id
      });

      if (response?.success) {
        Swal.fire({
          icon: "success",
          imageUrl: Lakbay,
          imageHeight: "150px",
          imageWidth: "150px",
          title: "Added to your Favorites",
          text: "Browse more places",
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToSaved = async () => {
    if (!authenticatedUser) {
      return Swal.fire({
        icon: "info",
        imageUrl: Lakbay,
        imageHeight: "150px",
        imageWidth: "150px",
        title: "Sign-in first to Save Places",
        text: "Please Sign-in your account first to be able to save your favorite spots.",
      });
    }

    try {
      const response = await addToSaved({
        userId: authenticatedUser.id,
        placeName: place.name || null,
        address: place.address_line2 || null,
        openingHours: place.opening_hours || null,
        phone: place.phone || null,
        website: place.website || null,
        lat: informationOfThePlace.geometry.coordinates[1],
        long: informationOfThePlace.geometry.coordinates[0],
        placeId: place.place_id
      });

      if (response?.success) {
        Swal.fire({
          icon: "success",
          imageUrl: Lakbay,
          imageHeight: "150px",
          imageWidth: "150px",
          title: "Added to your Saved Places",
          text: "Browse more places",
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/95 rounded-lg border border-gray-100 w-full min-h-[10vh] max-h-[55vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 transition-all duration-200">

      
      {/* Header */}
      <div className="bg-red-500 p-6 text-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{place?.name || 'Unknown Place'}</h2>
            <p className="text-white/80 text-sm mt-1">Place Information</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700 mb-1">Address</p>
            <p className="text-gray-600 text-sm leading-relaxed">{place?.address_line2 || "Not available"}</p>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700 mb-1">Opening Hours</p>
            <p className="text-gray-600 text-sm">{place?.opening_hours || "Not available"}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700 mb-1">Phone</p>
            <p className="text-gray-600 text-sm">{place?.phone || "Not available"}</p>
          </div>
        </div>

        {/* Website */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700 mb-1">Website</p>
            <p className="text-gray-600 text-sm">{place?.website || "Not available"}</p>
          </div>
        </div>

        {/* Buttons (Inside Scrollable Div) */}
        <div className="pt-4 border-t border-gray-200 space-y-3">
          <button
            className="w-full bg-[#0A2A60] hover:bg-[#0A2A60]/90 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
            onClick={() => {
              storeShowRoute(false);
              setTimeout(() => storeShowRoute(true), 100);
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Show Route
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleAddToFavorites}
              className="flex-1 flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 text-xs shadow-sm hover:shadow-md"
            >
              Favorites
            </button>

            <button
              onClick={handleAddToSaved}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#FED141] text-white font-medium py-2.5 rounded-lg transition-all duration-200 text-xs shadow-sm hover:shadow-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceInformation;
