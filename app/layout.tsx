import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/auth-context";
import AuthGuard from "@/components/auth/AuthGuard";

export const metadata: Metadata = {
  title: "Bazaar AI | Predict Pakistan's Markets",
  description: "AI-Powered Market Demand Prediction for major Pakistani cities and products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-blue-500/30 selection:text-blue-200">
        <AuthProvider>
          <AuthGuard>
            <div className="no-print">
              <Navbar />
            </div>
            <main className="min-h-screen">
              {children}
            </main>
            <div className="no-print">
              <Footer />
            </div>
          </AuthGuard>
        </AuthProvider>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0d1526',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px'
            }
          }}
        />
      </body>
    </html>
  );
}
