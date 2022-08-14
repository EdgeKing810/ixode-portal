import React from 'react';

import {
  FullAbsoluteContainer,
  IconButton,
  Input,
  LinkerButton,
  Separator,
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
  theme,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        isTesting ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsTesting(false)}
      theme={theme}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile>
          Test SMTP Credentials
        </SubHeading>

        <IconButton
          click={() => setIsTesting(false)}
          condition
          icon="close"
          noFill
          className="ml-3 px-2 rounded-lg bg-transparent"
        />
      </div>

      {!isProcessing && (
        <div className="w-full lg:w-1/2">
          <Separator smaller />

          <Input
            title="Enter username"
            placeholder="Enter username..."
            value={smtpUsername}
            change={(e) => setSmtpUsername(e.target.value)}
            theme={theme}
            className="my-2"
          />

          <Input
            title="Enter password"
            placeholder="Enter password..."
            value={smtpPassword}
            change={(e) => setSmtpPassword(e.target.value)}
            theme={theme}
            className="my-2"
          />

<Input
            title="Enter host"
            placeholder="Enter host... e.g smtp.gmail.com"
            value={smtpHost}
            change={(e) => setSmtpHost(e.target.value)}
            theme={theme}
            className="my-2"
          />

<Input
            title="Enter port"
            placeholder="Enter port... e.g 587"
            value={smtpPort}
            change={(e) => setSmtpPort(e.target.value)}
            theme={theme}
            className="my-2"
          />

          <div className="w-full lg:w-1/2 flex justify-start">
            <LinkerButton
              title="Test"
              condition={
                smtpHost && smtpHost.trim().length > 0 && smtpUsername && smtpUsername.length > 0
                  ? true
                  : false
              }
              click={() =>
                smtpHost && smtpHost.trim().length > 0 && smtpUsername && smtpUsername.length > 0
                  ? submitTest()
                  : null
              }
              className="uppercase p-2 rounded-lg lg:w-1/2 w-full"
              theme={theme}
            />
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
