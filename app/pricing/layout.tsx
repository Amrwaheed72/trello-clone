import HomeNavbar from '@/components/HomeNavbar';
import DashboardNavbar from '../dashboard/DashboardNavbar';

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
