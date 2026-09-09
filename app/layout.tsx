import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAINku AI Office",
  description: "Virtual office dashboard for MAINku.com",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
