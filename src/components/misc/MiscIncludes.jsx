import React from 'react';

import IncludeTestMongo from '../../pages/includes/misc/IncludeTestMongo';
import IncludeTestSMTP from '../../pages/includes/misc/IncludeTestSMTP';

import { submitTestMongo, submitTestSMTP } from './misc.utils';

export default function ConfigsIncludes({
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
  theme,
  alert,
}) {
  return (
    <div className="w-full">
      <IncludeTestMongo
        isTesting={testingMongoConnection}
        setIsTesting={setTestingMongoConnection}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
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
        theme={theme}
      />

      <IncludeTestSMTP
        isTesting={testingSmtp}
        setIsTesting={setTestingSmtp}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
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
        theme={theme}
      />
    </div>
  );
}
