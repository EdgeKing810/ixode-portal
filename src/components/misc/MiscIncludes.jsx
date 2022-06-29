import React from 'react';

import IncludeTestMongo from '../../pages/includes/misc/IncludeTestMongo';

import { submitTestMongo } from './misc.utils';

export default function ConfigsIncludes({
  API_URL,
  profile,
  testingMongoConnection,
  setTestingMongoConnection,
  isProcessing,
  setIsProcessing,
  uri,
  setUri,
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
        submitTest={() =>
          submitTestMongo(
            API_URL,
            profile,
            setIsProcessing,
            uri,
            updateConfig,
            setTestingMongoConnection,
            alert
          )
        }
        theme={theme}
      />
    </div>
  );
}
