import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "MakeX Live Competition App",
  description: "Competition scheduling, judge flow, coach tracking, and public live board",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
