import React from 'react';

export default function MiscBulk({
  setTestingMongoConnection,
  setTestingSmtp,
  isLoading,
}: {
  setTestingMongoConnection: React.Dispatch<React.SetStateAction<boolean>>;
  setTestingSmtp: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="w-full lg:w-1/2">
      <button
        className="btn btn-primary btn-outline gap-2 mt-2 w-full"
        title="Test Mongo Connection"
        onClick={() => setTestingMongoConnection(true)}
      >
        Test Mongo Connection
        <i className="ri-database-2-line" />
      </button>

      <button
        className="btn btn-primary btn-outline gap-2 mt-2 w-full"
        title="Test SMTP Credentials"
        onClick={() => setTestingSmtp(true)}
      >
        Test SMTP Credentials
        <i className="ri-mail-send-line" />
      </button>
    </div>
  );
}
