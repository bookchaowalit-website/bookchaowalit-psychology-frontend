import type { Metadata } from "next";
import { SITE_URL } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL(SITE_URL), title: "Psychology Explorer — Quiet Study Archive", description: "A calm educational index of psychology concepts, everyday examples, and reflection prompts." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
