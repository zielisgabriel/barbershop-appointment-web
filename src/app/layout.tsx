import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const monserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/barbershop-icon.png" />
      </head>

      <body
        className={`${monserrat.className} antialiased`}
      >
        {children}

        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000
          }}
        />
      </body>
    </html>
  );
}
