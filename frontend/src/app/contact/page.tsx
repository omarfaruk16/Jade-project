import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactPageClient from './ContactPageClient';

export const metadata = {
  title: 'Contact Us | Jade Kitchen Design',
  description: 'Get in touch with Jade Kitchen Design. Multiple locations and contact information available.'
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactPageClient />
      <Footer />
    </>
  );
}
