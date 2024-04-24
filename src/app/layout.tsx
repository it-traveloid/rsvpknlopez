import type { Metadata } from "next";
import { Nanum_Pen_Script, Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const nanum = Nanum_Pen_Script({
  subsets: [],
  weight: "400",
  variable: "--nanum",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--poppins",
});

export const metadata: Metadata = {
  title: "RSVP - Kurt & Erika",
  description: "RSVP for Kurt and Erika's wedding",
  openGraph: {
    images:["https://www.kurtanderika.com/formHeader.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preload" href="/beach.gif" as="image" />
        <link rel="preload" href="/savethedate.jpg" as="image" />
        <link rel="preload" href="/formHeader.jpg" as="image" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property="og:image" content="https://www.kurtanderika.com/formHeader.jpg" />
      </Head>
      <body className={`${poppins.variable} ${nanum.variable}`}>
        {children}
      </body>
    </html>
  );
}
