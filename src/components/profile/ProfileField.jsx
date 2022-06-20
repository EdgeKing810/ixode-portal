import React from 'react';

import { IconButton, Text } from '../Components';

export default function ProfileField({
  field,
  setEditingUser,
  setEditString,
  setData,
  setNextCallback,
  theme,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-2 p-2 flex lg:flex-row flex-col lg:items-center ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } duration-400 border-2 border-main-primary bg-opacity-50 border-opacity-50 mb-2`}
      key={field.id}
    >
      <Text
        color="secondary"
        theme={theme}
        nobreak
        className="w-full lg:h-10 lg:flex lg:flex-col lg:justify-center uppercase"
      >
        {field.name}
      </Text>

      <Text
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full my-2 lg:my-0 overflow-hidden lg:h-10 lg:flex lg:flex-col lg:justify-center`}
      >
        {field.data}
      </Text>

      <div className="w-full lg:w-1/4 flex lg:justify-end">
        <IconButton
          title="Edit"
          condition
          noFill
          theme={theme}
          icon="pencil"
          className="p-2 rounded-full w-10 h-10"
          color="primary"
          click={() => {
            setEditingUser(true);
            setEditString(field.name);
            setData(field.data);
            setNextCallback(field.callback);
          }}
        />
      </div>
    </div>
  );
}
