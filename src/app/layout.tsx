import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premier Dental Clinic | Patient Management",
  description: "Premium dental appointment management system for high-end clinics",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="navbar sticky-top shadow-sm bg-white">
          <div className="container-fluid px-4">
            <div className="navbar-brand d-flex align-items-center">
              <span className="text-primary me-2">
                <i className="fas fa-tooth fa-lg"></i>
              </span>
              <span className="fw-semibold">Premier Dental</span>
            </div>
            <div className="d-none d-md-flex align-items-center gap-4">
              <div className="text-muted small d-flex align-items-center">
                <i className="fas fa-phone-alt me-2 text-primary-light"></i>
                (123) 456-7890
              </div>
              <div className="text-muted small d-flex align-items-center">
                <i className="fas fa-envelope me-2 text-primary-light"></i>
                contact@premierdental.com
              </div>
            </div>
          </div>
        </header>
        
        <main className="py-4">
          {children}
        </main>
        
        <footer className="py-4 bg-gray-50 mt-auto border-top">
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
              </div>
            </div>
            <div className="pt-3">
              <div className="text-muted text-center large">© Premier Dental Clinic. All rights reserved to developer mustafa alhassny.</div>
            </div>
          </div>
        </footer>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}
