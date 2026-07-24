import type { Metadata } from 'next';
import LegalDoc, {
  Section,
  SubHeading,
  Para,
  Bullets,
} from '@/components/legal/LegalDoc';

export const metadata: Metadata = {
  title: 'Warranty Policy | Jade Kitchen Design',
  description:
    'The Limited Warranty covering Jade Kitchen Design Sdn Bhd manufacturing products purchased directly from us.',
};

export default function WarrantyPage() {
  return (
    <LegalDoc
      title="Warranty Policy"
      lastUpdate="July 1, 2026"
      intro="This Limited Warranty applies exclusively to Jade's own manufacturing products purchased directly from Jade Kitchen Design Sdn Bhd."
    >
      <Section title="Disclaimer & Commitment">
        <Para>
          Jade Kitchen Sdn Bhd pledges to operate with a total commitment to
          quality. Our mission is Quality by Design, and our ultimate goal is to
          provide our customers with premium products that meet all design
          specifications.
        </Para>
        <Para>
          Thank you for your interest in the products and services of Jade
          Kitchen Design Sdn Bhd. This Limited Warranty applies exclusively to
          our own Jade&rsquo;s Manufacturing Products purchased directly from
          Jade Kitchen Design Sdn Bhd Company.
        </Para>
      </Section>

      <Section title="1. Warranty Effective Date">
        <Bullets
          items={[
            <>
              <strong>Effective Date:</strong> The warranty period begins from
              the Last Date of Installation.
            </>,
            <>
              <strong>Duration:</strong> This Limited Warranty covers a period of
              One (1) Year from the effective date.
            </>,
          ]}
        />
      </Section>

      <Section title="2. What This Warranty Covers">
        <Para>
          This warranty strictly covers Manufacturing Defects and hardware
          operational failures under normal use:
        </Para>

        <SubHeading>A. Manufacturing Defects</SubHeading>
        <Bullets
          items={[
            <>
              <strong>Edging:</strong> Peeling off of any edge bands.
            </>,
            <>
              <strong>Materials/Boards:</strong> Any inherent defects on the core
              materials or boards.
            </>,
            <>
              <strong>Structural Issues:</strong> Board bending or warping over
              time.
            </>,
            <>
              <strong>Cabinet Skirting:</strong> Any defects arising from the
              skirting of the cabinet.
            </>,
          ]}
        />

        <SubHeading>B. Hardware & Mechanisms</SubHeading>
        <Bullets
          items={[
            <>
              <strong>Hinges &amp; Drawer Runners:</strong> Any functional
              problems with hinges or drawer runners will be eligible for a
              Product Replacement. (Note: Hinges alignment issues caused after
              installation due to regular wear and tear / user handling are
              excluded and considered a user issue.)
            </>,
          ]}
        />
      </Section>

      <Section title="3. Third-Party Accessories & Appliances">
        <Para>
          For items not manufactured directly by Jade Kitchen, the warranty terms
          are defined as follows:
        </Para>
        <Bullets
          items={[
            <>
              <strong>Accessories:</strong> Covered depending on the specific
              terms and accessories provided in your official quotation.
            </>,
            <>
              <strong>Appliances:</strong> Electrical appliances (such as Hoods
              and Hobs) are covered directly by the warranty of their respective
              and respected brands.
            </>,
            <>
              <strong>Sinks &amp; Taps:</strong> Certain brands carry their own
              respected warranty periods and limitations.
            </>,
          ]}
        />
      </Section>
    </LegalDoc>
  );
}
