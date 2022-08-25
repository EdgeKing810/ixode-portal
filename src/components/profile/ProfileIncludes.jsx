import React from 'react';

import IncludeEditData from '../../pages/includes/profile/IncludeEditData';
import IncludeChangePassword from '../../pages/includes/profile/IncludeChangePassword';

export default function ProfileIncludes({
  editingUser,
  setEditingUser,
  editString,
  data,
  setData,
  nextCallback,
  editingPassword,
  setEditingPassword,
  password,
  setPassword,
  passwordCheck,
  setPasswordCheck,
  showPassword,
  setShowPassword,
  showPasswordCheck,
  setShowPasswordCheck,
}) {
  return (
    <div className="w-full">
      <IncludeEditData
        isEditing={editingUser}
        setIsEditing={setEditingUser}
        title={editString}
        data={data}
        setData={setData}
        submitUpdate={(d) => nextCallback(d)}
      />

      <IncludeChangePassword
        editingPassword={editingPassword}
        setEditingPassword={setEditingPassword}
        password={password}
        setPassword={setPassword}
        passwordCheck={passwordCheck}
        setPasswordCheck={setPasswordCheck}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showPasswordCheck={showPasswordCheck}
        setShowPasswordCheck={setShowPasswordCheck}
        submitUpdate={(d) => nextCallback(d)}
      />
    </div>
  );
}
