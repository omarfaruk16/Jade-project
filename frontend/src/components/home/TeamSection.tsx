import { getTeamMembers } from '@/lib/data';
import TeamSectionClient from './TeamSectionClient';

export default async function TeamSection() {
  const team = await getTeamMembers();
  return <TeamSectionClient team={Array.isArray(team) ? team : []} />;
}
