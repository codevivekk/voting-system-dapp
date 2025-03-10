
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider/Provider";
import Header from "./components/Header/Header";

import { headers } from "next/headers"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}) {
  const cookies = headers().get('cookie')
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
