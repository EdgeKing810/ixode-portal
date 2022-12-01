import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { IProject } from '../../stores/useProjectStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

const submitUpdateProject = (
  API_URL: string,
  profile: IUserProfile,
  change: string,
  content: string,
  id: string,
  remove: boolean,
  currentProject: IProject,
  setCurrentProject: React.Dispatch<React.SetStateAction<IProject | null>>,
  setEditingProject: React.Dispatch<React.SetStateAction<string>>,
  name: string,
  description: string,
  apiPath: string,
  addProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void,
  updateProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void,
  removeProject: (id: string) => void,
  navigate: NavigateFunction,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    change: change,
    data: content,
  };

  axios
    .patch(
      `${API_URL}/project/update`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Project Updated!');

        setEditingProject('');
        if (remove) {
          addProject(
            data.data,
            name,
            description,
            apiPath,
            currentProject.members
          );
          removeProject(currentProject.id);
          navigate(`/project/${data.data}`);
        } else {
          updateProject(
            data.project_id,
            name,
            description,
            apiPath,
            currentProject.members
          );
          // @ts-ignore
          setCurrentProject((p) => {
            let updatedProject = { ...p };
            // @ts-ignore
            updatedProject[id] = data.data;
            return updatedProject;
          });
        }
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitUpdateProjectID = (
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  projectID: string,
  setEditingProject: React.Dispatch<React.SetStateAction<string>>,
  name: string,
  description: string,
  apiPath: string,
  addProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void,
  removeProject: (id: string) => void,
  navigate: NavigateFunction,
  alert: any
) => {
  submitUpdateProject(
    API_URL,
    profile,
    'ID',
    projectID,
    'id',
    true,
    currentProject,
    () => null,
    setEditingProject,
    name,
    description,
    apiPath,
    addProject,
    () => null,
    removeProject,
    navigate,
    alert
  );
};

export const submitUpdateProjectName = (
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  name: string,
  setEditingProject: React.Dispatch<React.SetStateAction<string>>,
  description: string,
  apiPath: string,
  updateProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void,
  setCurrentProject: React.Dispatch<React.SetStateAction<IProject | null>>,
  alert: null
) => {
  submitUpdateProject(
    API_URL,
    profile,
    'NAME',
    name,
    'name',
    false,
    currentProject,
    setCurrentProject,
    setEditingProject,
    name,
    description,
    apiPath,
    () => null,
    updateProject,
    () => null,
    () => null,
    alert
  );
};

export const submitUpdateProjectDescription = (
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  description: string,
  setEditingProject: React.Dispatch<React.SetStateAction<string>>,
  name: string,
  apiPath: string,
  updateProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void,
  setCurrentProject: React.Dispatch<React.SetStateAction<IProject | null>>,
  alert: any
) => {
  submitUpdateProject(
    API_URL,
    profile,
    'DESCRIPTION',
    description,
    'description',
    false,
    currentProject,
    setCurrentProject,
    setEditingProject,
    name,
    description,
    apiPath,
    () => null,
    updateProject,
    () => null,
    () => null,
    alert
  );
};

export const submitUpdateProjectAPIPath = (
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  apiPath: string,
  setEditingProject: React.Dispatch<React.SetStateAction<string>>,
  name: string,
  description: string,
  updateProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void,
  setCurrentProject: React.Dispatch<React.SetStateAction<IProject | null>>,
  alert: any
) => {
  submitUpdateProject(
    API_URL,
    profile,
    'APIPATH',
    apiPath,
    'api_path',
    false,
    currentProject,
    setCurrentProject,
    setEditingProject,
    name,
    description,
    apiPath,
    () => null,
    updateProject,
    () => null,
    () => null,
    alert
  );
};

export const submitAddMember = (
  API_URL: string,
  profile: IUserProfile,
  uid: string,
  currentProject: IProject,
  setAddMember: React.Dispatch<React.SetStateAction<boolean>>,
  addProjectMember: (id: string, uid: string) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
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
  currentProject: IProject,
  setRemoveMember: React.Dispatch<React.SetStateAction<boolean>>,
  removeProjectMember: (id: string, uid: string) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
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
  currentProject: IProject,
  setDeletingProject: React.Dispatch<React.SetStateAction<boolean>>,
  removeProject: (id: string) => void,
  navigate: NavigateFunction,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
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
        navigate('/projects');

        removeProject(data.project_id);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};
