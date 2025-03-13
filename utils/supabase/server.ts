import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import dotenv from "dotenv";


dotenv.config({ path: '/home/bek/PersonalP-j/calendar-app/.env.local' });

if(process.env.PROJECT_URL==null|| process.env.API_KEY==null){
    console.error("Environment variables aren't loading correctly");
}

export function createClient(){
    const cookieStore = cookies();
    return createServerClient( process.env.PROJECT_URL||'' , process.env.API_KEY||'', 
        {
            cookies: {
                get(name: string){
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions){
                    try{
                        cookieStore.set({name, value, ...options});
                    }catch(error: any){
                        console.error("Cookie set Error:", error);
                    }
                    
                },
                remove(name:string, options: CookieOptions){
                    try{
                        cookieStore.set({name, value:"", ...options})
                    }catch(error){
                        console.error("Cookie remove:", error)
                    }
                }
            }
        }
    )
}
