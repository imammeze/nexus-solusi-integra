import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </>
  );
}
