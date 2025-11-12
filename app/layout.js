import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AppContextProvider } from "./context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: " متجر الأثاث الفاخر والديكور العصري",
  description: " هو وجهتك الأولى للأثاث الفاخر والديكور العصري بجودة عالية وأسعار تنافسية. اكتشف تشكيلتنا الراقية اليوم.",
  keywords: ["أثاث فاخر", "ديكور راقي", "غرف نوم", "أثاث عصري", "استدعاء", "Furniture", "Luxury Home Decor", "Modern Design"],
  openGraph: {
    title: " متجر الأثاث والديكور الفاخر",
    description: "تصفح تشكيلتنا الواسعة من الأثاث العصري والديكور الراقي.",
    url: "https://e-commerce-seven-blue-67.vercel.app",
    siteName: "DECOR",
    images: [
      {
        url: "https://images.unsplash.com/photo-1617806265182-7b3f847f0b75?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&h=630&q=90",
        width: 1200,
        height: 630,
        alt: "صورة منتجات استدعاء",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },
  icons: {
    icon: "/store.svg",
    apple: "/store.svg",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <AppContextProvider>
          
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
