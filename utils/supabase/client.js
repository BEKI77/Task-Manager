import { createBrowserClient } from "@supabase/ssr";
import dotenv from "dotenv";

dotenv.config({ path: '/home/bek/PersonalP-j/calendar-app/.env.local' });


if(process.env.PROJECT_URL==null|| process.env.API_KEY==null){
    console.error("Environment variables aren't loading correctly");
}

export function createClient(){
    return createBrowserClient(process.env.PROJECT_URL, process.env.API_KEY)
}