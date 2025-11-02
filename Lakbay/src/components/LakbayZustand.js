import { create } from "zustand";

const useMap = create((set) => ({
    userLocation: null,
    pointOfPlaces: null,
    informationOfThePlace: null,
    isLoading: false,
    shouldShowRoute: false,
    storePointOfPlaces: (places) => set(() => ({ pointOfPlaces: places })),
    storeInformationOfThePlace: (place) => set(() => ({ informationOfThePlace: place})),
    clearInformationOfThePlace: () => set(() => ({ informationOfThePlace: null })),
    setIsLoading: (loading) => set(() => ({ isLoading: loading })),
    storeUserLocation: (lat, lng) => set(() => ({userLocation: [lat, lng] })),
    storeShowRoute: (value) => set(() => ({ shouldShowRoute: value })),
}));


export default useMap;