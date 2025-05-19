import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import SaveUserToDb from "@/components/User/SaveUserToDb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mess Management System",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "An online mess management system for students of IIIT Bhubaneswar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased relative h-screen flex flex-col`}
        >
          <BackgroundWrapper />
          <Header />
          <SaveUserToDb />
          <main className="flex-1 overflow-y-auto">{children}</main>
           <BottomNav />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
