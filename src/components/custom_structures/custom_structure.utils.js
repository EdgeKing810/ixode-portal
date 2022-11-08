import axios from 'axios';

export const submitCreateCustomStructure = (
  API_URL,
  profile,
  currentProject,
  collectionID,
  customStructureID,
  setCustomStructureID,
  customStructureName,
  setCustomStructureName,
  customStructureDescription,
  setCustomStructureDescription,
  setEditCustomStructureID,
  setCreatingCustomStructure,
  setCurrentCollection,
  alert
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    collection_id: collectionID,
    custom_structure: {
      id: customStructureID,
      name: customStructureName,
      description: customStructureDescription,
      structures: [],
    },
  };

  axios
    .post(
      `${API_URL}/custom_structure/add`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Custom Structure Created!');

        setCreatingCustomStructure(false);

        setCurrentCollection((prev) => {
          let updatedCollection = { ...prev };
          updatedCollection.custom_structures = [
            ...updatedCollection.custom_structures,
            data.custom_structure,
          ];
          return updatedCollection;
        });

        setCustomStructureID('');
        setEditCustomStructureID('');
        setCustomStructureName('');
        setCustomStructureDescription('');
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitUpdateCustomStructure = (
  API_URL,
  profile,
  currentProject,
  collectionID,
  customStructureID,
  setCustomStructureID,
  customStructureName,
  setCustomStructureName,
  customStructureDescription,
  setCustomStructureDescription,
  editCustomStructureID,
  setEditCustomStructureID,
  setEditingCustomStructure,
  customStructureStructures,
  setCurrentCollection,
  alert,
  dontReset,
  navigate
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    collection_id: collectionID,
    custom_structure_id: customStructureID,
    custom_structure: {
      id: editCustomStructureID,
      name: customStructureName,
      description: customStructureDescription,
      structures: [...customStructureStructures],
    },
  };

  axios
    .patch(
      `${API_URL}/custom_structure/update`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Custom Structure Updated!');

        setEditingCustomStructure(false);

        setCurrentCollection((prev) => {
          let updatedCollection = { ...prev };
          updatedCollection.custom_structures = [
            ...updatedCollection.custom_structures.filter(
              (s) => s.id !== data.custom_structure_id
            ),
            data.custom_structure,
          ];
          return updatedCollection;
        });

        if (!dontReset) {
          setCustomStructureID('');
          setEditCustomStructureID('');
          setCustomStructureName('');
          setCustomStructureDescription('');
        } else {
          setCustomStructureID(editCustomStructureID);
          navigate(
            `/project/${currentProject.id}/collection/${collectionID}/custom/${editCustomStructureID}`
          );
        }
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitDeleteCustomStructure = (
  API_URL,
  profile,
  currentProject,
  collectionID,
  customStructureID,
  setCustomStructureID,
  setCustomStructureName,
  setCustomStructureDescription,
  setEditCustomStructureID,
  setDeletingCustomStructure,
  setCurrentCollection,
  alert,
  dontReset,
  navigate
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    collection_id: collectionID,
    custom_structure_id: customStructureID,
  };

  axios
    .delete(
      `${API_URL}/custom_structure/delete?uid=${data.uid}&project_id=${data.project_id}&collection_id=${data.collection_id}&custom_structure_id=${data.custom_structure_id}`,
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Custom Structure Deleted!');

        setDeletingCustomStructure(false);

        setCurrentCollection((prev) => {
          let updatedCollection = { ...prev };
          updatedCollection.custom_structures =
            updatedCollection.custom_structures.filter(
              (s) => s.id !== data.custom_structure_id
            );
          return updatedCollection;
        });

        if (!dontReset) {
          setCustomStructureID('');
          setEditCustomStructureID('');
          setCustomStructureName('');
          setCustomStructureDescription('');
        } else {
          if (navigate) {
            navigate(
              `/project/${currentProject.id}/collection/${collectionID}`
            );
          }
        }
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};
