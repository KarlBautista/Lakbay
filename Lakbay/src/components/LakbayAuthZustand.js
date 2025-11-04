import { create } from "zustand";
import { supabase }  from "../config/supabaseClient";

const useAuthStore = create((set) => ({
    user: null,
    authenticatedUser: null,
    setAuthenticatedUser: (user) => set({ authenticatedUser: user }),
    signUp: async (registerData) => {
        const {  firstName, lastName, email, password } = registerData;
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password
        });
        if(signUpError){
            throw new Error(`Error signing up user: ${signUpError}`);
        }
        set({ user: signUpData.user });
        
        const { data: insertUserData, error: insertUserError } = await supabase.from("users")
        .insert({ 
            id: signUpData.user.id,
            first_name: firstName,
            last_name: lastName,
            email: signUpData.user.email
        });
        if(insertUserError){
            throw new Error(`Error inserting user data: ${insertUserError}`);
        }
        return signUpData.user;
    },

    signIn: async (signInData) => {
        const { email, password } = signInData;
        const { data, error } = await supabase.auth.signInWithPassword({
            email, 
            password
        });
        if(error){
            console.error(`Sign-in error: ${error.message}`);
            return { data: null, error }
        }
      
        set({ authenticatedUser: data.user });
        return { data, error: null };
    },

    signOut: async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
            console.error("Error signing out:", error.message);
            return { success: false, error };
            }

            set({ authenticatedUser: null });
            return { success: true };
        } catch (err) {
            console.error("Unexpected sign-out error:", err);
            return { success: false, error: err };
        }
    },

    getUser: async () => {
        try{
            const { data, error } = await supabase.auth.getUser();
            if(data?.user){
                set({ authenticatedUser: data.user });
            } else {
                set({ authenticatedUser: null });
            }
        } catch (err){
            console.error(err)
        }
    },

    authListener: () => {
        try{
            const { data: { subscription } } = supabase.auth.onAuthStateChange( async (_event, session) => {
              const user = session?.user;
              if(user){
                const { data: existingUser, error: existingError } = await supabase.from("users")
                .select("id").eq("id", user.id).single();

               if(!existingUser){
                const { email, user_metadata } = user;
                const { error: insertError }  = await supabase.from("users").insert({
                    id: user.id,
                    email,
                    first_name: user_metadata?.full_name?.split(" ")[0] || null,
                    last_name: user_metadata?.full_name.split(" ")[1] || null,
                });
                if(insertError){
                    throw new Error(`Error inserting: ${insertError.message}`);
                }
               }
                set({ authenticatedUser: user });   
              } else {
                set({ authenticatedUser: null });
              }
            });
            return () => subscription.unsubscribe();
        } catch(err){
            console.error(err);
        }
    },

    signInWithGoogle: async () => {
        try{
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}`,
                  
                }
            });
            if(error){
                console.error(`Google Auth Error: ${error}`);
                return { data: null, error }
            }
            return { data, error: null };
        } catch(err){
            console.error(err)
        }
    },

    signInWithGithub: async () => {
        try{
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                    redirectTo: `${window.location.origin}`,
               
                }
            });
            if(error){
                console.error(`Github Auth Error: ${error.message}`);
                return { data: null, error };
            }
            return { data, error: null };
        } catch(err){
            console.error(err)
        }
    }


}))

export default useAuthStore;