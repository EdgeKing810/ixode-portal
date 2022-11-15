import React from 'react';

import IncludeEditConstraint from '../../pages/includes/constraints/IncludeEditConstraint';

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
