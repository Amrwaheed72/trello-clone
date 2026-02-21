import { Cairo } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import ClientLayoutWrapper from './ClientLayoutWrapper';
const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: {
    template: '%s - Planify',
    default: 'Welcome - Planify',
  },
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={` ${cairo.variable} antialiased`}>
        <ClientLayoutWrapper>
          <Toaster position="top-right" closeButton={true} richColors />
          <main>{children}</main>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
