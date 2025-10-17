import HomeNavbar from '@/components/HomeNavbar';

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HomeNavbar />
      <main>{children}</main>
    </div>
  );
}
