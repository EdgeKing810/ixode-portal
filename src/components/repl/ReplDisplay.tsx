import React from 'react';
import { IUserProfile } from '../../stores/useUserProfileStore';

import { Heading, Input, SmallText } from '../Components';
import { IReplResult, submitReplCommand } from './repl.utils';

export default function ReplDisplay({
  API_URL,
  profile,
  command,
  setCommand,
  result,
  setResult,
  isLoading,
  setIsLoading,
  alert,
}: {
  API_URL: string;
  profile: IUserProfile;
  command: string;
  setCommand: React.Dispatch<React.SetStateAction<string>>;
  result: IReplResult | null;
  setResult: React.Dispatch<React.SetStateAction<IReplResult | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  alert: any;
}) {
  return (
    <div className="w-full">
      <div
        className={`w-full rounded-lg lg:px-4 lg:pt-4 lg:pb-2 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent bg-opacity-50 border-opacity-50 mb-2`}
      >
        <Heading
          color="primary"
          // nobreak
          className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
        >
          Repl Shell
        </Heading>

        <div className={`pt-1 w-full bg-accent mb-4 rounded-lg opacity-25`} />

        <div className="w-full flex lg:flex-row flex-col items-center">
          <Input
            title="Enter command..."
            placeholder="Enter command..."
            value={command}
            change={(e) => {
              setCommand(e.target.value);
            }}
            className=""
          />

          <button
            className={`btn ${
              command.length > 0
                ? 'btn-secondary btn-outline'
                : 'btn-ghost btn-disabled'
            } lg:ml-2 lg:mt-0 mt-2 lg:w-32 w-full lg:py-4`}
            title="Submit"
            onClick={() =>
              command.length > 0
                ? submitReplCommand(
                    API_URL,
                    command,
                    profile,
                    setResult,
                    setIsLoading,
                    alert
                  )
                : null
            }
          >
            Submit
            <i className={`ri-arrow-right-s-line`} />
          </button>
        </div>

        {/* {result && (
          <Text
            color="secondary"
            nobreak
            className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center bg-base-300 p-2 rounded-lg mt-2`}
          >
            {result.message} {`<${result.status}>`}
          </Text>
        )} */}
      </div>

      {result &&
        result.data.map((d, i) => (
          <div
            key={`res-${i}`}
            className={`bg-base-200 p-1 border-2 border-primary rounded-lg ${
              i < result.data.length - 1 && 'mb-2'
            }`}
          >
            {d.map((e, j) => (
              <div
                key={`res-${i}-${j}`}
                className={`bg-base-300 p-1 rounded-lg ${
                  j < d.length - 1 && 'mb-2'
                }`}
              >
                <SmallText nobreak className={`w-full overflow-hidden`}>
                  {e}
                </SmallText>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
