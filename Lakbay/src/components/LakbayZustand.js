import { create } from "zustand";

const useMap = create((set) => ({
    pointOfPlaces: null,
 
    storePointOfPlaces: (places) => set(() => ({ pointOfPlaces: places })),
    

}));


export default useMap;