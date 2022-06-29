import React from 'react';

import {
  BigText,
  FullAbsoluteContainer,
  IconButton,
  Input,
  LinkerButton,
  Separator,
  SubHeading,
  Text,
} from '../../../components/Components';

export default function IncludeTestMongo({
  isTesting,
  setIsTesting,
  isProcessing,
  setIsProcessing,
  uri,
  setUri,
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
          Test MongoDB Connection
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

          <Text color="primary" mono>
            <span className="text-main-secondary">mongodb://</span>
            username
            <span className="text-main-secondary">:</span>
            password
            <span className="text-main-secondary">@</span>
            host
            <span className="text-main-secondary">:</span>
            port
            <span className="text-main-secondary">/</span>
            database
          </Text>

          <Input
            title="Enter uri"
            placeholder="Enter uri..."
            value={uri}
            change={(e) => setUri(e.target.value)}
            theme={theme}
            className="my-2"
          />

          <div className="w-full lg:w-1/2 flex justify-start">
            <LinkerButton
              title="Test"
              condition={uri && uri.trim().length > 0 ? true : false}
              click={() => (uri && uri.trim().length > 0 ? submitTest() : null)}
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
