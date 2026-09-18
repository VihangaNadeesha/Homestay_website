export type Room = { slug: string; name: string; daily: number; monthly: number; capacity?: string; details: string[]; description: string; image: string };
export const fallbackRooms: Room[] = [
 { slug:"bigger-double-room", name:"Bigger Double Room", daily:3500, monthly:100000, capacity:"For two people", description:"A private space on the upper floor for two people.", image:"/assets/homestay/Bigger%20Room%20AC.jpeg", details:["Air-conditioned","Private entrance","Kitchen and bathroom","Hot-water shower","Private balcony","Refrigerator","Essential kitchen appliances","Fresh linens changed and laundered by the owners","Electricity and water included","Personal laundry on request: Rs. 200–500/kg"] },
 { slug:"small-room", name:"Small Room", daily:1800, monthly:45000, description:"A simpler upper-floor room for a practical stay close to the coast.", image:"/assets/homestay/Small%20AC%20Room.jpeg", details:["Air-conditioned","Refrigerator available","Essential kitchen appliances available"] },
 { slug:"entire-first-floor", name:"Entire First Floor", daily:5000, monthly:140000, description:"The whole upper-floor accommodation for guests who want the space together.", image:"/assets/homestay/Kitchen%20Area%20And%20Private%20Access%20to%20the%20Floor.jpeg", details:[] }
];
export async function getPublicSettings() {
  return {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/",
    instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/",
    email: "",
  };
}
export function whatsappUrl(number: string, room?: string) { const message = room ? `Hello, I would like to inquire about the ${room}.` : "Hello, I would like to inquire about staying at the homestay."; return number ? `https://wa.me/${number.replace(/\D/g,"")}?text=${encodeURIComponent(message)}` : "/contact"; }
export const money=(value:number)=>`Rs. ${new Intl.NumberFormat("en-LK").format(value)}`;
