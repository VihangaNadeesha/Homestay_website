import { notFound } from "next/navigation";
export default async function Guide({params}:{params:Promise<{slug:string}>}){await params;notFound();}
