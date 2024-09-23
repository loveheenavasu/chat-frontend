import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { ChatbotLinkProvider } from "@/context/ChatbotLinkProvider";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatBot",
  description: "Generated by create next app",
};

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ""}>
            <ChatbotLinkProvider>
              {children}
              <ToastContainer />
            </ChatbotLinkProvider>
          </GoogleOAuthProvider>
        </ChakraProvider>

        {/* <Script>
          {`window.embeddedChatbotConfig = {
  chatbotId: "b834035e-fc28-4a84-bd49-e48565a21847",
  domain: "chat-frontend-three-xi.vercel.app"
}
            `}
        </Script>

        <Script
          src="https://chat-frontend-three-xi.vercel.app/embed.js"
          defer
        ></Script> */}
      </body>
    </html>
  );
}
