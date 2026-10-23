import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nas Tech | Gaming Consoles, Laptops, Game Installs, Repairs & Swaps',
  description: 'Nas Tech Ghana: Buy Xbox & PS5 consoles, gaming laptops, game discs, and parts. In-person game installation, console/laptop repairs, and trade-in swaps.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${montserrat.variable} font-sans min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden`}>
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
