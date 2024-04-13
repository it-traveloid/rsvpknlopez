import type { Metadata } from "next";
import { Nanum_Pen_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const nanum = Nanum_Pen_Script({
  subsets: [],
  weight: "400",
  variable: "--nanum",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--playfair",
});

export const metadata: Metadata = {
  title: "RSVP - Kurt & Erika",
  description: "RSVP for Kurt and Erika's wedding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${nanum.variable}`}>
        {children}
      </body>
    </html>
  );
}
