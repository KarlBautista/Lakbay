import { create } from "zustand";
import axios from "axios"

const useUserData = create((set) => ({
    favorites: null,
    saved: null,
    setFavorites: (favoritesValue) => set({ favorites: favoritesValue }),
    setSaved: (savedValue) => set({ saved: savedValue }),
    addToSaved: async (savedValue) => {
        try{
            const response = await axios.post("http://localhost:3000/api/add-to-saved", {
                savedValue
            })
            if(response.error){
                console.error(`Error Add to Favorites: ${response.error}`);
                return { success: false, error: error };
            }
            if(response.data){
                console.log(`Added to saved:`, response.data);
                // Refresh saved after adding
                const updatedSaved = await axios.post("http://localhost:3000/api/get-saved", {
                    userId: savedValue.userId
                });
                if(updatedSaved.data){
                    // API returns payload under `data.data` (see getSaved implementation)
                    set({ saved: updatedSaved.data.data || [] });
                }
                return { success: true };
            }
        } catch(err){
            console.error(`Error Add to Favorites: ${err.message}`);
            return { success: false, error: err.message };
        }
    },
    getSaved: async (userId) => {
        try {
            const response = await axios.post("http://localhost:3000/api/get-saved", {
                userId
            });
            if(response.error){
                console.error(`Error get saved: ${response.error}`);
                return { success: false, error: response.error };
            }
       
            if(response.data){
                set({ saved: response.data.data || [] });
            }
        } catch (err){
            console.error(`Errr get saved: ${err.message}`);
            return { success: false, error: err.message };
        }
    },
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
    deleteFromSaved: async (savedPlaceId, userId) => {
        try{
            const response = await axios.delete("http://localhost:3000/api/delete-from-saved", {
                data: { savedPlaceId }
            });
            if(response.error){
                console.error(`Delete from saved error: ${response.error}`);
                return { success: false, error: response.error };
            }
            if(response.data){
                const updatedSaved = await axios.post("http://localhost:3000/api/get-saved", {
                    userId: userId
                });
                if(updatedSaved.data){
                    set({ saved: updatedSaved.data.data });
                }
                return { success: true };
            }
        } catch (err){
            console.error(`Error delete from saved: ${err.message}`);
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