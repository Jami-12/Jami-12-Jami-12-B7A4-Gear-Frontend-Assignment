import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GearUp - Sports & Outdoor Gear Rental",
  description: "Rent premium sports equipment from verified providers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}
      >
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t bg-white py-6 mt-12">
          <div className="container mx-auto px-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} GearUp Rental Platform. All rights
            reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
