import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';


if(process.env.PROJECT_URL==null|| process.env.API_KEY==null){
    console.error("Environment variables aren't loading correctly");
}

export async function updateSession(request : NextRequest){
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        }
    });

    const supabase =  createServerClient(
        process.env.PROJECT_URL||'',
        process.env.API_KEY||'',
        {
            cookies:{
                get(name: string){
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options:CookieOptions){
                    request.cookies.set({
                        name,
                        value,
                        ...options
                    });

                    response = NextResponse.next({
                        request: {
                          headers: request.headers,
                        },
                    });

                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name:string, options:CookieOptions){
                    request.cookies.set({
                        name,
                        value:"",
                        ...options
                    });

                    response = NextResponse.next({
                        request: {
                          headers: request.headers,
                        },
                    });

                    response.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                }

            }
        }
    )
}