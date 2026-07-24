import type { Metadata } from 'next';
import LegalDoc, { Section, Para, Bullets } from '@/components/legal/LegalDoc';

export const metadata: Metadata = {
  title: 'Privacy Policy | Jade Kitchen Design',
  description:
    'How Jade Kitchen Design Sdn Bhd protects your personal information and our commitment to quality and punctuality in our business operations.',
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      lastUpdate="July 1, 2026"
      intro="At Jade Kitchen Design Sdn Bhd, we value the trust you place in us to craft your premium spaces. This policy outlines our commitment to protecting your personal information and ensuring transparency, quality, and punctuality in our business operations."
    >
      <Section title="1. Data Protection & Customer Privacy">
        <Para>
          We are committed to securing your personal information. Any data
          collected during your consultation, quotation, or design phase is
          treated with strict confidentiality.
        </Para>
        <Bullets
          items={[
            <>
              <strong>Data Security:</strong> Your contact details, address, and
              project requirements are stored securely and protected against
              unauthorized access.
            </>,
            <>
              <strong>No Third-Party Sharing:</strong> We do not sell, rent, or
              share your personal data with external businesses or third parties
              for marketing or advertising purposes.
            </>,
            <>
              <strong>Internal Use Only:</strong> Your information is solely used
              to process your orders, manage installations, and provide
              post-purchase warranty services.
            </>,
          ]}
        />
      </Section>

      <Section title="2. Product Integrity & Commitment">
        <Para>
          We believe in delivering exactly what we promise. Every product
          manufactured by Jade Kitchen undergoes strict quality checks.
        </Para>
        <Bullets
          items={[
            <>
              <strong>Exact Material Specifications:</strong> The materials,
              finishes, and hardware used in your project will strictly match the
              specifications agreed upon in your official quotation.
            </>,
            <>
              <strong>Quality by Design:</strong> We guarantee that there will be
              no unauthorized compromises or substitutions in the materials
              delivered to your site.
            </>,
          ]}
        />
      </Section>

      <Section title="3. Timeline & Punctuality Agreement">
        <Para>
          We respect your time and aim to deliver a seamless installation
          experience by adhering to committed timelines.
        </Para>
        <Bullets
          items={[
            <>
              <strong>Scheduled Timelines:</strong> We establish a clear project
              timeline upon final design approval and payment confirmation.
            </>,
            <>
              <strong>On-Time Delivery:</strong> Our manufacturing and
              installation teams work diligently to meet the agreed deadlines.
            </>,
            <>
              <strong>Proactive Communication &amp; Force Majeure:</strong> In
              rare events of unforeseen delays&mdash;such as natural disasters,
              severe weather conditions, supply chain disruptions, or site
              readiness issues&mdash;our team will communicate transparently and
              well in advance to coordinate and reschedule your installation.
            </>,
          ]}
        />
      </Section>
    </LegalDoc>
  );
}
