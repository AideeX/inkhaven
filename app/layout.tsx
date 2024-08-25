import type { Metadata } from "next";
import { montserrat } from "@/app/ui/styles/fonts";
import '@/app/ui/styles/globals.css';
import { AuthProvider } from "./lib/firebase/auth/authcontext";
import { Providers } from "@/app/providers/providers";




export const metadata: Metadata = {
  title: "InkHaven",
  description: "Ink your imagination and discover your next great read.",
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased bg-light-primary `}>
        <AuthProvider>
          <Providers>
          {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
