import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata():Promise<Metadata>{
  const requestHeaders=await headers(); const host=requestHeaders.get("host"); const protocol=requestHeaders.get("x-forwarded-proto")??"https"; const imageUrl=host?`${protocol}://${host}/og.png`:undefined;
  const title="K-12 AI Educator Resource"; const description="Practical, vendor-neutral AI guidance and prompt tools for K-12 educators.";
  return {title,description,applicationName:"K-12 AI Educator Resource",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"},openGraph:{title,description,type:"website",images:imageUrl?[{url:imageUrl,width:1733,height:909,alt:"K-12 AI Educator Resource — Practical AI guidance for every educator"}]:[]},twitter:{card:"summary_large_image",title,description,images:imageUrl?[imageUrl]:[]}};
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
