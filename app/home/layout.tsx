


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body>
        {children}
        </body>
 </html>
  );
}