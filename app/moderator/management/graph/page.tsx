// app/moderator/home/page.tsx

'use client';

import ModeratorGraph from '@/components/moderatorComponents/ModeratorGraph';
import NavBarModerator from '../../NavBar';

export default function ModeratorHomePage() {
  return (
    <div className="p-28">
      <NavBarModerator/>
      <h1 className="text-2xl font-bold mb-4">Affinity Network - Moderator View</h1>
      <ModeratorGraph />
    </div>
  );
}
