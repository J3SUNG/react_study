import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Modal } from "@/components/modal/Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chat GPT",
  description:
    "Experience conversational AI with a reimagined Chat GPT clone, leveraging natural language processing for seamless interactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Modal />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
