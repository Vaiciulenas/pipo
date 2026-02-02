import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PIPO",
  description: "Pixel-perfect 3D printing from idea to reality.",
  icons: {
    icon: "/assets/circle-pipo.png",
    apple: "/assets/circle-pipo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pressStart.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
