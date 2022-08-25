import React from 'react';

import { Text } from '../Components';

export default function ProfileField({
  field,
  setEditingUser,
  setEditString,
  setData,
  setNextCallback,
}) {
  return (
    <div
      className={`w-full rounded-lg p-2 flex lg:flex-row flex-col lg:items-center bg-base-200 duration-300 border-4 border-primary bg-opacity-50 border-opacity-50 mb-2`}
      key={field.id}
    >
      <Text
        color="secondary"
        nobreak
        className="w-full lg:h-10 lg:flex lg:flex-col lg:justify-center uppercase"
      >
        {field.name}
      </Text>

      <Text
        nobreak
        className={`w-full my-2 lg:my-0 overflow-hidden lg:h-10 lg:flex lg:flex-col lg:justify-center`}
      >
        {field.data}
      </Text>

      <div className="w-full lg:w-1/4 flex lg:justify-end">
        <button
          className="btn btn-warning btn-outline btn-sm btn-circle"
          title="Edit"
          onClick={() => {
            setEditingUser(true);
            setEditString(field.name);
            setData(field.data);
            setNextCallback(field.callback);
          }}
        >
          <i className={`ri-pencil-line`} />
        </button>
      </div>
    </div>
  );
}
