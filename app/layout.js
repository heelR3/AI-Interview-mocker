import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({subsets: ["latin"] });

export const metadata = {
  title: 'AI Interview Mocker',
  description: 'Simulate and practice tech interviews with AI',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      <Toaster/>
      {children} </body>
    </html>
    </ClerkProvider>
  );
}
