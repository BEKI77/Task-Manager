import { createBrowserClient } from "@supabase/ssr";


if(process.env.PROJECT_URL==null|| process.env.API_KEY==null){
    console.error("Environment variables aren't loading correctly");
}

export function createClient(){
    return createBrowserClient(process.env.PROJECT_URL||'', process.env.API_KEY||'')
}