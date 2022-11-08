import axios from 'axios';

const submitUpdateProject = (
  API_URL,
  profile,
  change,
  content,
  id,
  remove,
  currentProject,
  setCurrentProject,
  setEditingProject,
  name,
  description,
  apiPath,
  addProject,
  updateProject,
  removeProject,
  navigate,
  alert
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

        setEditingProject(false);
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
          setCurrentProject((p) => {
            let updatedProject = { ...p };
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
  API_URL,
  profile,
  currentProject,
  projectID,
  setEditingProject,
  name,
  description,
  apiPath,
  addProject,
  removeProject,
  navigate,
  alert
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
  API_URL,
  profile,
  currentProject,
  name,
  setEditingProject,
  description,
  apiPath,
  updateProject,
  setCurrentProject,
  alert
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
  API_URL,
  profile,
  currentProject,
  description,
  setEditingProject,
  name,
  apiPath,
  updateProject,
  setCurrentProject,
  alert
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
  API_URL,
  profile,
  currentProject,
  apiPath,
  setEditingProject,
  name,
  description,
  updateProject,
  setCurrentProject,
  alert
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
  API_URL,
  profile,
  uid,
  currentProject,
  setAddMember,
  addProjectMember,
  alert
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
  API_URL,
  profile,
  uid,
  currentProject,
  setRemoveMember,
  removeProjectMember,
  alert
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
  API_URL,
  profile,
  currentProject,
  setDeletingProject,
  removeProject,
  navigate,
  alert
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
