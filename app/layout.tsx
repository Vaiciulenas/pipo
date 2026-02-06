import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "./components/Navbar";
import Toolbar from "@mui/material/Toolbar";

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PIPO",
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
        <Providers>
          <Navbar />
          <Toolbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
