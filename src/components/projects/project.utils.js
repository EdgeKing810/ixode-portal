import axios from 'axios';

export const submitCreateProject = (
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
) => {
  const data = {
    uid: profile.uid,
    project_id: projectID,
    target_uid: uid.toLowerCase(),
  };

  setAddMember(false);

  axios
    .post(
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
) => {
  const data = {
    uid: profile.uid,
    project_id: projectID,
    target_uid: uid.toLowerCase(),
  };

  setRemoveMember(false);

  axios
    .post(
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
) => {
  const data = {
    uid: profile.uid,
    project_id: projectID,
  };

  axios
    .post(
      `${API_URL}/project/delete`,
      { ...data },
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
