import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const ibm = IBM_Plex_Sans_Thai({
  weight: ["100","200","300","400","500","600","700"],
  variable: "--font-ibm",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creasy | Build your own IT",
  description: "ศูนย์กลางเทคโนโลยี ไอทีลาดกระบัง | ชุมนุมคณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
  openGraph: {
    type: "website",
    title: "Creasy | ชมรมเทคโนโลยี IT KMITL",
    description: "ศูนย์กลางเทคโนโลยี ไอทีลาดกระบัง | ชุมนุมคณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
    url: "https://creasy.kmitl.ac.th",
    siteName: "Creasy",
    images: [
      "https://creasy.it22.dev/images/ci/opengraph.jpg",
    ],
    locale: "th_TH",
    countryName: "Thailand",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibm.variable} font-ibm antialiased`}
      >
        <Toaster toastOptions={{
          className :"font-ibm"
        }} position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
