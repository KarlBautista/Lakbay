import { create } from "zustand";
import axios from "axios"

const useUserData = create((set) => ({
    favorites: null,
    setFavorites: (favoritesValue) => set({ favorites: favoritesValue }),
    getFavorites: async (userId) => {
        try{
            const response = await axios.post("http://localhost:3000/api/get-favorites", {
                userId
            });
            if(response.error){
                return { success: false, error: error.message };
            }
            if(response.data){
                set({ favorites: response.data.data })
            }
        } catch(err){
            console.error(`Getting Users Favorites Error: ${err.message}`);
            return { success: false, error: err.message };
        }
    },
    addToFavorites: async (favoritesValue) => {
        try{
            const response = await axios.post("http://localhost:3000/api/add-to-favorites", {
                favoritesValue
            });
            if(response.error){
                console.error(`Add to Favorites Error: ${response.error}`);
                return;
            }
            if(response.data){
                console.log(`Added to favorites:`, response.data)
            }
        } catch(err){
            console.error(`Error Adding to Favorites: ${err.message}`);
        }
    }
}))

export default useUserData;