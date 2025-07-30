import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { WixClientContextProvider } from "./Context/wixContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e-Shop Dev E-Commerce Next.js Application",
  description:
    "A complete e-commerce application with Next.js, Tailwind and Wix Headless",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Forțăm refresh la favicon prin query param */}
        <link rel="icon" href="/favicon.ico?v=3" />
      </head>
      <body className={inter.className}>
        <WixClientContextProvider>
          <Navbar />
          {children}
          <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
