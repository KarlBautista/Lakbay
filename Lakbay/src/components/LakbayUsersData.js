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
                return { success: false, error: response.error };
            }
            if(response.data){
                console.log(`Added to favorites:`, response.data);
                // Refresh favorites after adding
                const updatedFavorites = await axios.post("http://localhost:3000/api/get-favorites", {
                    userId: favoritesValue.userId
                });
                if(updatedFavorites.data){
                    set({ favorites: updatedFavorites.data.data });
                }
                return { success: true };
            }
        } catch(err){
            console.error(`Error Adding to Favorites: ${err.message}`);
            return { success: false, error: err.message };
        }
    },
    deleteFromFavorites: async (favoritePlaceId, userId) => {
        try{
            const response = await axios.delete("http://localhost:3000/api/delete-from-favorites", {
                data: { favoritePlaceId }
            });
            if(response.error){
                console.error(`Delete from favorites error: ${response.error}`);
                return { success: false, error: response.error };
            }
            if(response.data){
                console.log("Deleted from favorites: ", response.data);
                // Refresh favorites after deleting
                const updatedFavorites = await axios.post("http://localhost:3000/api/get-favorites", {
                    userId: userId
                });
                if(updatedFavorites.data){
                    set({ favorites: updatedFavorites.data.data });
                }
                return { success: true };
            }
        } catch(err){
            console.error("Error Deleting from Favorites: ", err.message);
            return { success: false, error: err.message };
        }
    }
}))

export default useUserData;