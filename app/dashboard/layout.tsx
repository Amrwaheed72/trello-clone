import DashboardNavbar from './DashboardNavbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardNavbar />
      <main>{children}</main>
    </div>
  );
}
