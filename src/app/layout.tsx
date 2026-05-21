import type { Metadata } from "next";
import { sfProDisplay } from "@shared/config/fonts";
import { PageAnimatePresence } from "@shared/ui/page-animate-presence";
import "./style.css";

export const metadata: Metadata = {
  title: "Project X",
  description: "Project X",
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
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <PageAnimatePresence>{children}</PageAnimatePresence>
      </body>
    </html>
  );
}
