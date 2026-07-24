// Shared CEO/Founder profile badge used across all pages
export const CEO_NAME = 'Dr. Shiful Islam';
export const CEO_ROLE = 'Founder & CEO';
export const CEO_IMAGE = '/images/jade_ceo.avif';

interface CeoBadgeProps {
  className?: string;
}

export default function CeoBadge({ className }: CeoBadgeProps) {
  return (
    <div className={`jade-founder-badge ${className || ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CEO_IMAGE} alt={CEO_NAME} className="jade-founder-avatar" />
      <div>
        <span className="jade-founder-name">{CEO_NAME}</span>
        <span className="jade-founder-role">{CEO_ROLE}</span>
      </div>
    </div>
  );
}
