import axios from 'axios';
import { IUserProfile } from '../../stores/useUserProfileStore';

export const submitCreateProject = (
  API_URL: string,
  profile: IUserProfile,
  projectID: string,
  setProjectID: React.Dispatch<React.SetStateAction<string>>,
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  description: string,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  apiPath: string,
  setApiPath: React.Dispatch<React.SetStateAction<string>>,
  members: Array<string>,
  setMembers: React.Dispatch<React.SetStateAction<Array<string>>>,
  setCreatingProject: React.Dispatch<React.SetStateAction<boolean>>,
  addProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    project: {
      id: projectID,
      name: name,
      description: description,
      api_path: apiPath,
      members: [...members],
    },
  };

  axios
    .post(
      `${API_URL}/project/create`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Project Created!');

        setCreatingProject(false);

        setProjectID('');
        setName('');
        setDescription('');
        setApiPath('');
        setMembers([]);

        addProject(
          data.project.id,
          data.project.name,
          data.project.description,
          data.project.api_path,
          [
            profile.uid,
            ...data.project.members.filter((m) => m !== profile.uid),
          ]
        );
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitAddMember = (
  API_URL: string,
  profile: IUserProfile,
  uid: string,
  projectID: string,
  setProjectID: React.Dispatch<React.SetStateAction<string>>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  setApiPath: React.Dispatch<React.SetStateAction<string>>,
  setMembers: React.Dispatch<React.SetStateAction<Array<string>>>,
  setAddMember: React.Dispatch<React.SetStateAction<boolean>>,
  addProjectMember: (id: string, uid: string) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    project_id: projectID,
    target_uid: uid.toLowerCase(),
  };

  setAddMember(false);

  axios
    .patch(
      `${API_URL}/project/member/add`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Member Added!');

        setProjectID('');
        setName('');
        setDescription('');
        setApiPath('');
        setMembers([]);

        addProjectMember(data.project_id, data.target_uid);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitRemoveMember = (
  API_URL: string,
  profile: IUserProfile,
  uid: string,
  projectID: string,
  setProjectID: React.Dispatch<React.SetStateAction<string>>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  setApiPath: React.Dispatch<React.SetStateAction<string>>,
  setMembers: React.Dispatch<React.SetStateAction<Array<string>>>,
  setRemoveMember: React.Dispatch<React.SetStateAction<boolean>>,
  removeProjectMember: (id: string, uid: string) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    project_id: projectID,
    target_uid: uid.toLowerCase(),
  };

  setRemoveMember(false);

  axios
    .patch(
      `${API_URL}/project/member/remove`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Member Removed!');

        setProjectID('');
        setName('');
        setDescription('');
        setApiPath('');
        setMembers([]);

        removeProjectMember(data.project_id, data.target_uid);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitDeleteProject = (
  API_URL: string,
  profile: IUserProfile,
  projectID: string,
  setProjectID: React.Dispatch<React.SetStateAction<string>>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  setApiPath: React.Dispatch<React.SetStateAction<string>>,
  setMembers: React.Dispatch<React.SetStateAction<Array<string>>>,
  setDeletingProject: React.Dispatch<React.SetStateAction<boolean>>,
  removeProject: (id: string) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    project_id: projectID,
  };

  axios
    .delete(
      `${API_URL}/project/delete?uid=${data.uid}&project_id=${data.project_id}`,
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Project Deleted!');

        setDeletingProject(false);

        setProjectID('');
        setName('');
        setDescription('');
        setApiPath('');
        setMembers([]);

        removeProject(data.project_id);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};
