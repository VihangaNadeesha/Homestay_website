import "server-only";
import { createClient } from "@supabase/supabase-js"; import { cookies } from "next/headers";
export async function supabaseServer(){const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;if(!url||!key)return null;const token=(await cookies()).get("homestay-admin-token")?.value;return createClient(url,key,{auth:{autoRefreshToken:false,persistSession:false},global:{headers:token?{Authorization:`Bearer ${token}`}:{}}});}
export async function isAdmin(){const client=await supabaseServer();if(!client)return false;const {data:{user}}=await client.auth.getUser();if(!user)return false;const {data}=await client.from("profiles").select("role").eq("id",user.id).maybeSingle();return data?.role==="admin";}
