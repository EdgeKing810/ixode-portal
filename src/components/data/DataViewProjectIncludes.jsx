import React from 'react';

import IncludeShowMembers from '../../pages/includes/projects/IncludeShowMembers';

export default function DataViewProjectIncludes({
  allProfiles,
  name,
  showMembers,
  setShowMembers,
  members,
  memberLimit,
  memberCurrentPage,
  setMemberCurrentPage,
  theme,
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
        theme={theme}
      />
    </div>
  );
}
