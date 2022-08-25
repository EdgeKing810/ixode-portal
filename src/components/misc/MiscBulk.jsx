import React from 'react';

import { LinkerButton } from '../Components';

export default function MiscBulk({
  setTestingMongoConnection,
  setTestingSmtp,
  isLoading,
  theme,
}) {
  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="w-full lg:w-1/2">
      <LinkerButton
        theme={theme}
        color={theme}
        className="p-3 w-full justify-center uppercase rounded-lg"
        click={() => setTestingMongoConnection(true)}
        title="Test Mongo Connection"
        icon="database-2"
        condition
      />

      <LinkerButton
        theme={theme}
        color={theme}
        className="p-3 w-full justify-center uppercase rounded-lg"
        click={() => setTestingSmtp(true)}
        title="Test SMTP Credentials"
        icon="mail-send"
        condition
      />
    </div>
  );
}
