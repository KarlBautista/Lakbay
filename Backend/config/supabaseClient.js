const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NODE_SUPABASE_URL;
const supabaseApiKey = process.env.NODE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseApiKey);

module.exports = supabase;