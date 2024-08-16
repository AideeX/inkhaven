
import { Providers } from "@/app/providers/providers";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body>
        <Providers>
        {children}
        </Providers>
</body> </html>
  );
}