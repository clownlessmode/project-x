import type { Metadata, Viewport } from "next";
import { sfProDisplay } from "@shared/config/fonts";
import { PageAnimatePresence } from "@shared/ui/page-animate-presence";
import { PreventZoom } from "@shared/ui/prevent-zoom";
import "./style.css";

export const metadata: Metadata = {
  title: "Project X",
  description: "Project X",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${sfProDisplay.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden touch-manipulation">
        <PreventZoom />
        <PageAnimatePresence>{children}</PageAnimatePresence>
      </body>
    </html>
  );
}
