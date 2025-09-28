import { useSession } from "@clerk/nextjs";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createContext, useEffect } from "react";

interface SupabaseContext{
  supabase:SupabaseClient | null
  isLoaded:boolean
}
const Context = createContext<SupabaseContext>({
  supabase:null,
  isLoaded:false
})

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {session}=useSession()
  useEffect(()=>{
    if(!session) return 
    const client=createClient()
  },[session])
    return <Context.Provider value={{supabase:}}></Context.Provider>
};
