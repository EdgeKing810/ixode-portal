import React from 'react';

import IncludeEditConstraint from '../../pages/includes/constraints/IncludeEditConstraint';
import { IUserProfile } from '../../stores/useUserProfileStore';

import { submitUpdateConstraint } from './constraint.utils';

export default function ConstraintsIncludes({
  API_URL,
  profile,
  value,
  setValue,
  editingConstraint,
  setEditingConstraint,
  updateProperty,
  componentName,
  propertyName,
  updateConstraintMin,
  updateConstraintMax,
  alert,
}: {
  API_URL: string;
  profile: IUserProfile;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  editingConstraint: boolean;
  setEditingConstraint: React.Dispatch<React.SetStateAction<boolean>>;
  updateProperty: string;
  componentName: string;
  propertyName: string;
  updateConstraintMin: (
    componentName: string,
    propertyName: string,
    value: number
  ) => void;
  updateConstraintMax: (
    componentName: string,
    propertyName: string,
    value: number
  ) => void;
  alert: any;
}) {
  return (
    <div className="w-full">
      <IncludeEditConstraint
        isEditing={editingConstraint}
        setIsEditing={setEditingConstraint}
        value={value}
        setValue={setValue}
        valueType={updateProperty}
        keyname={`${componentName}/${propertyName}`}
        submitValue={() =>
          submitUpdateConstraint(
            API_URL,
            profile,
            componentName,
            propertyName,
            updateProperty,
            value,
            setValue,
            setEditingConstraint,
            updateConstraintMin,
            updateConstraintMax,
            alert
          )
        }
      />
    </div>
  );
}
