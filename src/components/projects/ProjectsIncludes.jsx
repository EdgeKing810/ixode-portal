import React from 'react';

import IncludeAddMembers from '../../pages/includes/projects/IncludeAddMembers';
import IncludeCreateProject from '../../pages/includes/projects/IncludeCreateProject';
import IncludeDeleteMembers from '../../pages/includes/projects/IncludeDeleteMembers';
import IncludeDeleteProject from '../../pages/includes/projects/IncludeDeleteProject';
import IncludeShowMembers from '../../pages/includes/projects/IncludeShowMembers';

import {
  submitAddMember,
  submitCreateProject,
  submitDeleteProject,
  submitRemoveMember,
} from './project.utils';

export default function ProjectsIncludes({
  API_URL,
  profile,
  allProfiles,
  creatingProject,
  setCreatingProject,
  name,
  setName,
  projectID,
  setProjectID,
  description,
  setDescription,
  apiPath,
  setApiPath,
  members,
  setMembers,
  addProject,
  showMembers,
  setShowMembers,
  memberLimit,
  memberCurrentPage,
  setMemberCurrentPage,
  addMember,
  setAddMember,
  addProjectMember,
  removeMember,
  setRemoveMember,
  removeProjectMember,
  deletingProject,
  setDeletingProject,
  removeProject,
  theme,
  alert,
}) {
  return (
    <div className="w-full">
      <IncludeCreateProject
        isCreating={creatingProject}
        setIsCreating={setCreatingProject}
        name={name}
        setName={setName}
        projectID={projectID}
        setProjectID={setProjectID}
        description={description}
        setDescription={setDescription}
        apiPath={apiPath}
        setAPIPath={setApiPath}
        submitCreateProject={() =>
          submitCreateProject(
            API_URL,
            profile,
            projectID,
            setProjectID,
            name,
            setName,
            description,
            setDescription,
            apiPath,
            setApiPath,
            members,
            setMembers,
            setCreatingProject,
            addProject,
            alert
          )
        }
        theme={theme}
      />

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

      <IncludeAddMembers
        showMembers={addMember}
        setShowMembers={setAddMember}
        name={name}
        members={allProfiles.filter(
          (ap) => !members.includes(ap.id.toLowerCase())
        )}
        limit={memberLimit}
        currentPage={memberCurrentPage}
        setCurrentPage={setMemberCurrentPage}
        submitAddMember={(uid) =>
          submitAddMember(
            API_URL,
            profile,
            uid,
            projectID,
            setProjectID,
            setName,
            setDescription,
            setApiPath,
            setMembers,
            setAddMember,
            addProjectMember,
            alert
          )
        }
        theme={theme}
      />

      <IncludeDeleteMembers
        showMembers={removeMember}
        setShowMembers={setRemoveMember}
        name={name}
        members={allProfiles.filter((ap) =>
          members.includes(ap.id.toLowerCase())
        )}
        limit={memberLimit}
        currentPage={memberCurrentPage}
        setCurrentPage={setMemberCurrentPage}
        submitRemoveMember={(uid) =>
          submitRemoveMember(
            API_URL,
            profile,
            uid,
            projectID,
            setProjectID,
            setName,
            setDescription,
            setApiPath,
            setMembers,
            setRemoveMember,
            removeProjectMember,
            alert
          )
        }
        theme={theme}
      />

      <IncludeDeleteProject
        isActive={deletingProject}
        setIsActive={setDeletingProject}
        submitDeleteProject={() =>
          submitDeleteProject(
            API_URL,
            profile,
            projectID,
            setProjectID,
            setName,
            setDescription,
            setApiPath,
            setMembers,
            setDeletingProject,
            removeProject,
            alert
          )
        }
        name={name}
        theme={theme}
      />
    </div>
  );
}
