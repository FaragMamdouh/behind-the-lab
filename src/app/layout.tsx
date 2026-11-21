import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Behind the Lab — Choose your supervisor with insight",
  description: "Honest, constructive, anonymous student experiences to help graduate students make informed decisions about academic supervision.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><div className="container" style={{paddingTop:12}}><div className="notice" role="note"><strong>Static demo:</strong>&nbsp; all sample profiles and reviews are fictional. No accounts, live submissions, reporting, or moderation are active on this site.</div></div><main>{children}</main><SiteFooter /></body></html>;
}
