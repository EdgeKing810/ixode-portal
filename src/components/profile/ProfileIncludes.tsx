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
}: {
  editingUser: boolean;
  setEditingUser: React.Dispatch<React.SetStateAction<boolean>>;
  editString: string;
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  nextCallback: (d: null | string) => void;
  editingPassword: boolean;
  setEditingPassword: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordCheck: string;
  setPasswordCheck: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showPasswordCheck: boolean;
  setShowPasswordCheck: React.Dispatch<React.SetStateAction<boolean>>;
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
