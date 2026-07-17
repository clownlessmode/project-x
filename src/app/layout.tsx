import type { Metadata, Viewport } from "next";
import { sfProDisplay } from "@shared/config/fonts";
import { AuthProvider } from "@shared/providers/auth-provider";
import { TelegramMiniAppProvider } from "@shared/providers/telegram-mini-app-provider";
import { AuthGate } from "@shared/ui/auth-gate";
import { PageAnimatePresence } from "@shared/ui/page-animate-presence";
import { PreventZoom } from "@shared/ui/prevent-zoom";
import "./_styles/tailwind.css";
import "./_styles/light-theme.css";
import "./_styles/dark-theme.css";
import "./_styles/globals.css";

export const metadata: Metadata = {
  title: "Project X",
  description: "Project X",
  other: {
    "apay-tag": "MUFMWK4YVDDVSZOE3NCTS22BULA4AVCP",
  },
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
        <TelegramMiniAppProvider>
          <AuthProvider>
            <AuthGate>
              <PageAnimatePresence>{children}</PageAnimatePresence>
            </AuthGate>
          </AuthProvider>
        </TelegramMiniAppProvider>
      </body>
    </html>
  );
}
