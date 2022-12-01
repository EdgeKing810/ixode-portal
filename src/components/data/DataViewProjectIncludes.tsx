import React from 'react';

import IncludeShowMembers from '../../pages/includes/projects/IncludeShowMembers';
import { IProfile } from '../../stores/useProfileStore';

export default function DataViewProjectIncludes({
  allProfiles,
  name,
  showMembers,
  setShowMembers,
  members,
  memberLimit,
  memberCurrentPage,
  setMemberCurrentPage,
}: {
  allProfiles: Array<IProfile>;
  name: string;
  showMembers: boolean;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
  members: Array<string>;
  memberLimit: number;
  memberCurrentPage: number;
  setMemberCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="w-full">
      <IncludeShowMembers
        showMembers={showMembers}
        setShowMembers={setShowMembers}
        name={name}
        members={allProfiles.filter((ap) =>
          members.includes(ap.id.toLowerCase())
        )}
        limit={memberLimit}
        currentPage={memberCurrentPage}
        setCurrentPage={setMemberCurrentPage}
      />
    </div>
  );
}
