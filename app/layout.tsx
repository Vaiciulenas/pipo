import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import Providers from "./providers";
import Navbar from "./components/Navbar";
import SiteFooter from "./components/sections/SiteFooter";
import Toolbar from "@mui/material/Toolbar";

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PIPO 3D printing",
  description: "PIPO 3D printing - computer accessories, car accessories and home decorations made with precision and attention to detail.",
  icons: {
    icon: "/assets/pipo.png",
    apple: "/assets/pipo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={pressStart.variable}>
        <AppRouterCacheProvider>
          <Providers>
            <Navbar />
            <Toolbar />
            {children}
            <SiteFooter />
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
