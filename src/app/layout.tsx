import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Behind the Lab — Choose your supervisor with insight",
  description: "Honest, constructive, anonymous student experiences to help graduate students make informed decisions about academic supervision.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><div className="container" style={{paddingTop:12}}><div className="notice" role="note"><strong>Community reviews are moderated:</strong>&nbsp; only approved profiles and published experiences are displayed. Fictional sample profiles are clearly labelled.</div></div><main>{children}</main><SiteFooter /></body></html>;
}
