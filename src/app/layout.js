import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getEntries } from "../lib/contentful";
import FloatHearts from "@/components/float-hearts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hearts Heartist",
  description: "Holistic Wellness | Performance & Training | Change & Development | Community",
};

export default async function RootLayout({ children }) {
  const hearts = await getEntries('section', { select: 'fields.title, fields.slug' });
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <div className="w-full">
          <main className="h-screen bg-blue-100 -z-1">
            <div id="sky" className="h-4/6">
              <p className="text-center font-serif text-3xl italic pt-8 text-yellow-500">Click on a heart to learn more about that section</p>
              <FloatHearts hearts={hearts} />
            </div>
            <div id="ground" className="h-2/6 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/grass3.png')" }}>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
