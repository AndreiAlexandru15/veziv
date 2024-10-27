
import "./globals.css";
import Navbar from "./UIComponents/Navbar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Additional <head> content can be added here if needed */}
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
