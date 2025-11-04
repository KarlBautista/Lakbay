import { create } from "zustand";

const useMap = create((set) => ({
    userLocation: null,
    pointOfPlaces: null,
    informationOfThePlace: null,
    isLoading: false,
    shouldShowRoute: false,
    map: null,
    routeState: {
        isActive: false,
        userLocation: null,
        destination: null,
        waypoints: null
    },
    setRouteState: (isActive, userLoc = null, dest = null, waypoints = null) => set(() => ({ 
        routeState: {
            isActive,
            userLocation: userLoc,
            destination: dest,
            waypoints: waypoints
        }
    })),
    clearRouteState: () => set(() => ({
        routeState: {
            isActive: false,
            userLocation: null,
            destination: null,
            waypoints: null
        }
    })),
    mapState: {
        center: [12.8797, 121.7740], // Default Philippines center
        zoom: 6,
        initialized: false
    },
    setMap: (mapValue) => set(() => ({ map: mapValue })),
    storePointOfPlaces: (places) => set(() => ({ pointOfPlaces: places })),
    storeInformationOfThePlace: (place) => set(() => ({ informationOfThePlace: place})),
    clearInformationOfThePlace: () => set(() => ({ informationOfThePlace: null })),
    setIsLoading: (loading) => set(() => ({ isLoading: loading })),
    storeUserLocation: (lat, lng) => set(() => ({userLocation: [lat, lng] })),
    storeShowRoute: (value) => set(() => ({ shouldShowRoute: value })),
    saveMapState: (center, zoom) => set((state) => ({
        mapState: {
            ...state.mapState,
            center,
            zoom,
            initialized: true
        }
    })),
    restoreMapState: () => set((state) => ({ mapState: { ...state.mapState } })),
}));


export default useMap;