import { create } from "zustand";

const useMap = create((set) => ({
    pointOfPlaces: null,
    informationOfThePlace: null,
    storePointOfPlaces: (places) => set(() => ({ pointOfPlaces: places })),
    storeInformationOfThePlace: (place) => set(() => ({ informationOfThePlace: place})),
    

}));


export default useMap;