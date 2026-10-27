import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Crimson Clips — Your game. Your moment.",
  description:
    "Submit your best gaming moments for a chance to appear in a Crimson Clips YouTube compilation.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
