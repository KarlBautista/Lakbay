const supabase = require("../config/supabaseClient")

const getFavorites = async (req, res) => {
    const { userId } = req.body;
    try{
        const { data: favoritesData, error: favoritesError } = await supabase.from("favorites")
        .select("*").eq("user_id", userId);

        if(favoritesError){
            console.error(`Error getting favorites data from supabase: ${favoritesError.message}`);
            res.status(500).json({ error: err.message })
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



module.exports = { getFavorites, addToFavorites } 