import React from 'react';

import {
  FullAbsoluteContainer,
  Input,
  SubHeading,
} from '../../../components/Components';

export default function IncludeTestSMTP({
  isTesting,
  setIsTesting,
  isProcessing,
  smtpUsername,
  setSmtpUsername,
  smtpPassword,
  setSmtpPassword,
  smtpHost,
  setSmtpHost,
  smtpPort,
  setSmtpPort,
  submitTest,
}:{
  isTesting: boolean;
  setIsTesting: React.Dispatch<React.SetStateAction<boolean>>;
  isProcessing: boolean;
  smtpUsername: string;
  setSmtpUsername: React.Dispatch<React.SetStateAction<string>>;
  smtpPassword: string;
  setSmtpPassword: React.Dispatch<React.SetStateAction<string>>;
  smtpHost: string;
  setSmtpHost: React.Dispatch<React.SetStateAction<string>>;
  smtpPort: string;
  setSmtpPort: React.Dispatch<React.SetStateAction<string>>;
  submitTest: () => void;
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        isTesting ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsTesting(false)}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile>
          Test SMTP Credentials
        </SubHeading>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setIsTesting(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      {!isProcessing && (
        <div className="w-full lg:w-1/2">
          <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />

          <Input
            title="Enter username"
            placeholder="Enter username..."
            value={smtpUsername}
            change={(e) => setSmtpUsername(e.target.value)}
            className="my-2"
          />

          <Input
            title="Enter password"
            placeholder="Enter password..."
            value={smtpPassword}
            change={(e) => setSmtpPassword(e.target.value)}
            className="my-2"
          />

          <Input
            title="Enter host"
            placeholder="Enter host... e.g smtp.gmail.com"
            value={smtpHost}
            change={(e) => setSmtpHost(e.target.value)}
            className="my-2"
          />

          <Input
            title="Enter port"
            placeholder="Enter port... e.g 587"
            value={smtpPort}
            change={(e) => setSmtpPort(e.target.value)}
            className="my-2"
          />

          <div className="w-full lg:w-1/2 flex justify-start">
            <button
              title="Test"
              className={`btn w-full gap-2 ${
                smtpHost &&
                smtpHost.trim().length > 0 &&
                smtpUsername &&
                smtpUsername.length > 0
                  ? 'no-animation btn-primary btn-outline'
                  : 'btn-ghost btn-disabled'
              }`}
              onClick={() =>
                smtpHost &&
                smtpHost.trim().length > 0 &&
                smtpUsername &&
                smtpUsername.length > 0
                  ? submitTest()
                  : null
              }
            >
              Test
            </button>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="w-full lg:w-1/2 mt-2">
          <SubHeading color="info" className="blink" smallerOnMobile>
            Processing...
          </SubHeading>
        </div>
      )}
    </FullAbsoluteContainer>
  );
}
