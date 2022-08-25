import React from 'react';

import {
  FullAbsoluteContainer,
  Input,
  SubHeading,
  Text,
} from '../../../components/Components';

export default function IncludeTestMongo({
  isTesting,
  setIsTesting,
  isProcessing,
  uri,
  setUri,
  name,
  setName,
  submitTest,
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
          Test MongoDB Connection
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
            className="my-2"
          />

          <Input
            title="Enter DB Name"
            placeholder="Enter DB Name... e.g kinesis_db"
            value={name}
            change={(e) => setName(e.target.value)}
            className="my-2"
          />

          <div className="w-full lg:w-1/2 flex justify-start">
            <button
              title="Test"
              className={`btn w-full gap-2 ${
                uri && uri.trim().length > 0 && name && name.length > 0
                  ? 'no-animation btn-primary btn-outline'
                  : 'btn-ghost btn-disabled'
              }`}
              onClick={() =>
                uri && uri.trim().length > 0 && name && name.length > 0
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
