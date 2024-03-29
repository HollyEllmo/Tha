import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Providers from "@/components/Providers";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import "simplebar-react/dist/simplebar.min.css";
import { getUserSubscriptionPlan } from "@/lib/stripe";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <SessionProvider session={session}>
      <html lang="en" className="light">
        <Providers>
          <body
            className={cn(
              "min-h-screen font-sans antialiased grainy",
              inter.className
            )}
          >
            <Toaster />
            <Sonner />
            <Navbar subscriptionPlan={subscriptionPlan} />
            {children}
          </body>
        </Providers>
      </html>
    </SessionProvider>
  );
}
