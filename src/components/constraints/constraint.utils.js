import axios from 'axios';

export const submitUpdateConstraint = (
  API_URL,
  profile,
  componentName,
  propertyName,
  updateType,
  value,
  setValue,
  setEditingConstraint,
  updateConstraintMin,
  updateConstraintMax,
  alert
) => {
  const data = {
    uid: profile.uid,
    component_name: componentName,
    property_name: propertyName,
    change: updateType,
    data: parseInt(value),
  };

  alert.info('Processing...');
  setValue('');
  setEditingConstraint(false);

  axios
    .patch(
      `${API_URL}/constraint/update`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Constraint Updated!');

        if (updateType === 'MIN') {
          updateConstraintMin(
            data.component_name,
            data.property_name,
            data.data
          );
        } else if (updateType === 'MAX') {
          updateConstraintMax(
            data.component_name,
            data.property_name,
            data.data
          );
        }
      } else {
        console.log(res.data);
      }
    });
};
