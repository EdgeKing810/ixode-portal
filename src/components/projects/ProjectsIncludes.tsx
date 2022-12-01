import React from 'react';

import IncludeAddMembers from '../../pages/includes/projects/IncludeAddMembers';
import IncludeCreateProject from '../../pages/includes/projects/IncludeCreateProject';
import IncludeDeleteMembers from '../../pages/includes/projects/IncludeDeleteMembers';
import IncludeDeleteProject from '../../pages/includes/projects/IncludeDeleteProject';
import IncludeShowMembers from '../../pages/includes/projects/IncludeShowMembers';
import { IProfile } from '../../stores/useProfileStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

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
  alert,
}: {
  API_URL: string;
  profile: IUserProfile;
  allProfiles: Array<IProfile>;
  creatingProject: boolean;
  setCreatingProject: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  projectID: string;
  setProjectID: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  apiPath: string;
  setApiPath: React.Dispatch<React.SetStateAction<string>>;
  members: Array<string>;
  setMembers: React.Dispatch<React.SetStateAction<Array<string>>>;
  addProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void;
  showMembers: boolean;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
  memberLimit: number;
  memberCurrentPage: number;
  setMemberCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  addMember: boolean;
  setAddMember: React.Dispatch<React.SetStateAction<boolean>>;
  addProjectMember: (id: string, member: string) => void;
  removeMember: boolean;
  setRemoveMember: React.Dispatch<React.SetStateAction<boolean>>;
  removeProjectMember: (id: string, member: string) => void;
  deletingProject: boolean;
  setDeletingProject: React.Dispatch<React.SetStateAction<boolean>>;
  removeProject: (id: string) => void;
  alert: any;
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
      />
    </div>
  );
}
