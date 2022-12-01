import axios from 'axios';
import { IUserProfile } from '../../stores/useUserProfileStore';

export const submitUpdateConstraint = (
  API_URL: string,
  profile: IUserProfile,
  componentName: string,
  propertyName: string,
  updateType: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setEditingConstraint: React.Dispatch<React.SetStateAction<boolean>>,
  updateConstraintMin: (
    componentName: string,
    propertyName: string,
    value: number
  ) => void,
  updateConstraintMax: (
    componentName: string,
    propertyName: string,
    value: number
  ) => void,
  alert: any
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
