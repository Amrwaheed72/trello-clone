import BoardNavbar from './BoardNavbar';

export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <BoardNavbar />
      <main>{children}</main>
    </div>
  );
}
