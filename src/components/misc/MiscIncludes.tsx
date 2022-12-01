import React from 'react';

import IncludeTestMongo from '../../pages/includes/misc/IncludeTestMongo';
import IncludeTestSMTP from '../../pages/includes/misc/IncludeTestSMTP';
import { IUserProfile } from '../../stores/useUserProfileStore';

import { submitTestMongo, submitTestSMTP } from './misc.utils';

export default function MiscIncludes({
  API_URL,
  profile,
  testingMongoConnection,
  setTestingMongoConnection,
  isProcessing,
  setIsProcessing,
  uri,
  setUri,
  name,
  setName,
  smtpUsername,
  setSmtpUsername,
  smtpPassword,
  setSmtpPassword,
  smtpHost,
  setSmtpHost,
  smtpPort,
  setSmtpPort,
  testingSmtp,
  setTestingSmtp,
  updateConfig,
  alert,
}: {
  API_URL: string;
  profile: IUserProfile;
  testingMongoConnection: boolean;
  setTestingMongoConnection: React.Dispatch<React.SetStateAction<boolean>>;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  uri: string;
  setUri: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  smtpUsername: string;
  setSmtpUsername: React.Dispatch<React.SetStateAction<string>>;
  smtpPassword: string;
  setSmtpPassword: React.Dispatch<React.SetStateAction<string>>;
  smtpHost: string;
  setSmtpHost: React.Dispatch<React.SetStateAction<string>>;
  smtpPort: string;
  setSmtpPort: React.Dispatch<React.SetStateAction<string>>;
  testingSmtp: boolean;
  setTestingSmtp: React.Dispatch<React.SetStateAction<boolean>>;
  updateConfig: (name: string, value: string) => void;
  alert: any;
}) {
  return (
    <div className="w-full">
      <IncludeTestMongo
        isTesting={testingMongoConnection}
        setIsTesting={setTestingMongoConnection}
        isProcessing={isProcessing}
        // setIsProcessing={setIsProcessing}
        uri={uri}
        setUri={setUri}
        name={name}
        setName={setName}
        submitTest={() =>
          submitTestMongo(
            API_URL,
            profile,
            setIsProcessing,
            uri,
            name,
            updateConfig,
            setTestingMongoConnection,
            alert
          )
        }
      />

      <IncludeTestSMTP
        isTesting={testingSmtp}
        setIsTesting={setTestingSmtp}
        isProcessing={isProcessing}
        // setIsProcessing={setIsProcessing}
        smtpUsername={smtpUsername}
        setSmtpUsername={setSmtpUsername}
        smtpPassword={smtpPassword}
        setSmtpPassword={setSmtpPassword}
        smtpHost={smtpHost}
        setSmtpHost={setSmtpHost}
        smtpPort={smtpPort}
        setSmtpPort={setSmtpPort}
        submitTest={() =>
          submitTestSMTP(
            API_URL,
            profile,
            setIsProcessing,
            smtpUsername,
            smtpPassword,
            smtpHost,
            smtpPort,
            updateConfig,
            setTestingSmtp,
            alert
          )
        }
      />
    </div>
  );
}
