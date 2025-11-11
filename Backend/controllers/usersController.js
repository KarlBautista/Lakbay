const supabase = require("../config/supabaseClient")

const getFavorites = async (req, res) => {
    const { userId } = req.body;
    console.log(req.body)
    try{
        const { data: favoritesData, error: favoritesError } = await supabase.from("favorites")
        .select("*").eq("user_id", userId);

        if(favoritesError){
            console.error(`Error getting favorites data from supabase: ${favoritesError.message}`);
            res.status(500).json({ error: favoritesError.message })
        }
        if(favoritesData){
            res.status(200).json({ data: favoritesData });
        }
    } catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
} 

const addToFavorites = async (req, res) => {
    const { userId, placeName, address, phone, openingHours, website,
            lat, long, placeId } = req.body.favoritesValue;

            console.log(placeName);
    try{
        const { data: addToFavoritesData, error: addToFavoritesError } = await supabase.from("favorites")
        .insert({
            user_id: userId,
            place_name: placeName,
            address,
            opening_hours: openingHours,
            phone,
            website,
            lat,
            long,
            place_id: placeId
        }).select();

        if(addToFavoritesError){
            console.error(`Error adding to favorties: ${addToFavorites}`);
            res.status(500).json({ error: addToFavoritesError.message });
        }
        if(addToFavoritesData){
            console.log(addToFavoritesData)
            res.status(200).json({ data: addToFavoritesData });
        }
    } catch (err){
        console.error("Error adding to favorites:", err.message)
        res.status(500).json({ error: err.message });
    }
}

const deleteFromFavorites = async (req, res) => {
    const favoritePlaceId = req.body.favoritePlaceId;
    try{
        const { data: deleteFromFavoritesData, error: deleteFromFavoritesError } = await supabase.from("favorites")
        .delete().eq("id", favoritePlaceId).select();
        
        if(deleteFromFavoritesError){
            console.error("Error Deleting Favorite Place: ", deleteFromFavoritesError.message);
            return res.status(500).json({ error: deleteFromFavoritesError.message });
        }
        if(deleteFromFavoritesData){
            return res.status(200).json({ data: deleteFromFavorites.data });
        }
    } catch(err){
        console.error(`Something went wrong in deleting from favorties ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
}
const deleteFromSaved = async (req, res) => {
    const savedPlaceId = req.body.savedPlaceId;
    try{
        const { data: deleteFromSavedData, error: deleteFromSavedError } = await supabase.from("saved")
        .delete().eq("id", savedPlaceId).select();

        if(deleteFromSavedError){
            console.error("Error Deleting Saved Place: ", deleteFromSavedError.message );
            return res.status(500).json({ error: deleteFromSavedError.message });
        }
            if(deleteFromSavedData){
                return res.status(200).json({ data: deleteFromSavedData });
            }
    } catch(err){
        console.error(`Something went wrong in deleting from saved ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
}

const addToSaved = async (req, res) => {
    const { userId, placeName, address, phone, openingHours, website,
            lat, long, placeId } = req.body.savedValue;
    console.log("naganaa");
    try {
        const { data: addToSavedData, error: addToSavedError } = await supabase.from("saved")
        .insert({
            user_id: userId,
            place_name: placeName,
            address,
            phone,
            opening_hours: openingHours,
            website,
            lat,
            long,
            place_id: placeId
        }).select();

        if(addToSavedError){
            console.error(`Error to add to saved: ${addToSavedError.message}`);
            res.status(500).json({ success: false, error: addToSavedError.message });
        }
        if(addToSavedData){
            console.log(addToSavedData)
            res.status(200).json({ success: true, data: addToSavedData.data });
        }
    } catch(err){
        console.error(`Error to add to saved: ${err.message}`);
        res.status(500).json({ success: false, error: err.message });
    }
}

const getSaved = async (req, res) => {
    const { userId } = req.body;
    console.log(req.body)
    try{
        const { data: savedData, error: savedError } = await supabase.from("saved")
        .select("*").eq("user_id", userId);

        if(savedError){
            console.error(`Error getting saved data from supabase: ${favoritesError.message}`);
            res.status(500).json({ error: favoritesError.message })
        }
        if(savedData){
            console.log(savedData)
            res.status(200).json({ data: savedData });
        }
    } catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}



module.exports = { getFavorites, addToFavorites, deleteFromFavorites, addToSaved, getSaved, deleteFromSaved } 