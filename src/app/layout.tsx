import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <head>
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: `
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.register("/service-worker.js", {
                scope: '/offline-downloads'
          })
          .then((registration) => {
            console.log("Service worker is registered");
          })
          
          //See if the page currently has a service worker
          if(navigator.serviceWorker.controller){
            console.log("We have a service worker installed");
          }
          
          //Register a handler to detect when a new or updated service worker is installed and activated  
          navigator.serviceWorker.oncontrollerchange = (ev) => {
            console.log("New service worker activated");
          }
        }
        else {
          console.log("Service worker are not supported");
        }
          

         
        `
      }}></script>
      </head>
      <body className={inter.className}>{children}</body>
      
    </html>
  );
}
