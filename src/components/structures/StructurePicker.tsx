import React from 'react';

import {
  BigText,
  Checkbox,
  Input,
  InputTextArea,
  SubHeading,
  Text,
} from '../Components';

import { fetchData } from '../../utils/data';
import { handleImage } from '../../utils/handleImage';

export default function StructurePicker({
  API_URL,
  PUBLIC_URL,
  customStructureName,
  setIsCreating,
  collectionName,
  name,
  setName,
  description,
  setDescription,
  structureID,
  setStructureID,
  type,
  setType,
  defaultVal,
  setDefaultVal,
  min,
  setMin,
  max,
  setMax,
  encrypted,
  setEncrypted,
  unique,
  setUnique,
  regex,
  setRegex,
  array,
  setArray,
  required,
  setRequired,
  submitStructure,
  isEditing,
  addMedia,
  alert,
}: {
  API_URL: string;
  PUBLIC_URL: string;
  customStructureName: string;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  collectionName: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  structureID: string;
  setStructureID: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  defaultVal: string | number | boolean | Date;
  setDefaultVal: React.Dispatch<
    React.SetStateAction<string | number | boolean | Date>
  >;
  min: number;
  setMin: React.Dispatch<React.SetStateAction<number>>;
  max: number;
  setMax: React.Dispatch<React.SetStateAction<number>>;
  encrypted: boolean;
  setEncrypted: React.Dispatch<React.SetStateAction<boolean>>;
  unique: boolean;
  setUnique: React.Dispatch<React.SetStateAction<boolean>>;
  regex: string;
  setRegex: React.Dispatch<React.SetStateAction<string>>;
  array: boolean;
  setArray: React.Dispatch<React.SetStateAction<boolean>>;
  required: boolean;
  setRequired: React.Dispatch<React.SetStateAction<boolean>>;
  submitStructure: () => void;
  isEditing: boolean;
  addMedia: (id: string, name: string) => void;
  alert: any;
}) {
  let types = fetchData().structures.types;

  const typeSelector = () => (
    <div className="w-full grid lg:grid-cols-4 grid-cols-3 gap-2">
      {types.map((t) => (
        <button
          onClick={() => {
            setType(t.name);
            setDefaultVal('');
          }}
          className={`btn gap-2 no-animation ${
            type === t.name ? 'btn-secondary' : 'btn-primary'
          } btn-outline`}
        >
          {t.name}
        </button>
      ))}
    </div>
  );

  return (
    <div className="w-full lg:p-8 flex flex-col h-full">
      <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 overflow-y-scroll">
        <div className="flex w-full justify-between items-center">
          {!isEditing ? (
            <SubHeading color="primary" smallerOnMobile>
              Create a Structure in{' '}
              <span className="text-base-content">{collectionName}</span>
              {customStructureName && (
                <span>
                  {' > '}
                  <span className="text-secondary">{customStructureName}</span>
                </span>
              )}
            </SubHeading>
          ) : (
            <SubHeading color="primary" smallerOnMobile>
              Edit <span className="text-base-content">{name}</span> Structure
              in <span className="text-base-content">{collectionName}</span>
            </SubHeading>
          )}

          <button
            className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
            onClick={() => setIsCreating(false)}
          >
            <i className={`ri-close-line`} />
          </button>
        </div>

        <Input
          title="Enter Name"
          placeholder="Enter Name... (e.g username)"
          value={name}
          change={(e) => {
            setName(e.target.value);
            setStructureID(e.target.value.trim().toLowerCase());
          }}
          className="mt-2"
        />

        <InputTextArea
          title="Enter Description"
          placeholder="Enter Description... (optional)"
          value={description}
          change={(e) => setDescription(e.target.value)}
          className="my-2"
        />

        <Input
          title="Enter ID"
          placeholder="Enter ID... (e.g username)"
          value={structureID}
          change={(e) => setStructureID(e.target.value.trim().toLowerCase())}
          className="mt-2"
        />

        <div className="w-full mt-1">
          <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />
        </div>

        <BigText color="primary" className="mb-2 uppercase text-left w-full">
          Choose Type
        </BigText>

        {typeSelector()}

        <div className="w-full flex mt-4">
          <div className="w-full flex">
            <Text
              color="primary"
              className="uppercase w-1/2 text-left flex items-center justify-center"
            >
              Min
            </Text>

            <Input
              type="number"
              title="Enter Min Value"
              placeholder=""
              value={min.toString()}
              change={(e) => {
                if (e.target.value === '' || parseInt(e.target.value) >= 0) {
                  setMin(e.target.value);
                }
              }}
            />
          </div>

          <div className="w-full flex">
            <Text
              color="primary"
              className="uppercase w-1/2 text-left flex items-center justify-center"
            >
              Max
            </Text>

            <Input
              type="number"
              title="Enter Max Value"
              placeholder=""
              value={max.toString()}
              change={(e) => {
                if (e.target.value === '' || parseInt(e.target.value) >= 0) {
                  setMax(e.target.value);
                }
              }}
            />
          </div>
        </div>

        <div className="w-full mt-1">
          <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />
        </div>

        {
          // @ts-ignore
          types.find((t) => t.name === type).type !== 'hidden' && (
            <>
              <BigText
                color="primary"
                className="mt-2 uppercase text-left w-full"
              >
                Specify Default Value (Optional)
              </BigText>

              {!['checkbox', 'custom-media'].includes(
                // @ts-ignore
                types.find((t) => t.name === type).type
              ) ? (
                <Input
                  type={
                    // @ts-ignore
                    types.find((t) => t.name === type).type
                  }
                  title="Enter Default Value"
                  placeholder="Enter Default Value..."
                  value={defaultVal.toString()}
                  change={(e) => {
                    setDefaultVal(e.target.value);
                  }}
                  className="mt-2 mb-2"
                  min={min}
                  max={max}
                />
              ) : // @ts-ignore
              types.find((t) => t.name === type).type === 'checkbox' ? (
                <div className="w-full flex justify-start mb-2">
                  <Checkbox
                    value={
                      defaultVal === 'true' ||
                      (typeof defaultVal === 'boolean' && defaultVal)
                    }
                    color="primary"
                    change={setDefaultVal}
                  />

                  <Text color="text-base-content" mono>
                    {defaultVal.toString()}
                  </Text>
                </div>
              ) : // @ts-ignore
              types.find((t) => t.name === type).type === 'custom-media' ? (
                <div className="w-full flex justify-start mb-2">
                  <button
                    className="btn btn-primary btn-outline gap-2 mt-2 lg:mt-0 w-full lg:w-1/3"
                    title="Upload"
                    onClick={() =>
                      handleImage(
                        alert,
                        API_URL,
                        PUBLIC_URL,
                        (i) => {
                          if (i) {
                            // @ts-ignore
                            setDefaultVal(`${PUBLIC_URL}/${i[0]}`);
                            // @ts-ignore
                            addMedia(i[1], i[0]);
                          }
                        },
                        true,
                        false
                      )
                    }
                  >
                    Upload
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </>
          )
        }

        <div className="w-full">
          <div
            className={`w-full flex justify-start ${
              // @ts-ignore
              types.find((t) => t.name === type).format.length > 50 &&
              'flex-col'
            } lg:flex-row`}
          >
            <Text
              color="primary"
              className="uppercase text-left pr-1 lg:mb-0 mb-1 lg:w-20"
              mono
              smallerOnMobile
              notFull
            >
              Format:
            </Text>

            <Text mono smallerOnMobile>
              {
                // @ts-ignore
                types.find((t) => t.name === type).format
              }
            </Text>
          </div>
          <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />
        </div>

        <BigText color="primary" className="mt-2 uppercase text-left w-full">
          Specify Regex Pattern (Optional)
        </BigText>

        <Input
          title="Enter Regex Pattern"
          placeholder="Enter Regex Pattern..."
          value={regex}
          change={(e) => setRegex(e.target.value)}
          className="mt-2"
          min={min}
          max={max}
        />

        <div className="w-full flex justify-start mt-2">
          <Text color="primary" className="uppercase w-1/2 lg:w-1/3 text-left">
            Is Required?
          </Text>

          <Checkbox value={required} color="primary" change={setRequired} />

          <Text mono>{required === true ? 'true' : 'false'}</Text>
        </div>

        <div className="w-full flex justify-start mt-1">
          <Text color="primary" className="uppercase w-1/2 lg:w-1/3 text-left">
            Should Encrypt?
          </Text>

          <Checkbox value={encrypted} color="primary" change={setEncrypted} />

          <Text mono>{encrypted === true ? 'true' : 'false'}</Text>
        </div>

        <div className="w-full flex justify-start mt-1">
          <Text color="primary" className="uppercase w-1/2 lg:w-1/3 text-left">
            Should be Unique?
          </Text>

          <Checkbox value={unique} color="primary" change={setUnique} />

          <Text mono>{unique === true ? 'true' : 'false'}</Text>
        </div>

        <div className="w-full flex justify-start mt-1">
          <Text color="primary" className="uppercase w-1/2 lg:w-1/3 text-left">
            Should be an Array?
          </Text>

          <Checkbox value={array} color="primary" change={setArray} />

          <Text mono>{array === true ? 'true' : 'false'}</Text>
        </div>

        <div className="w-full flex justify-start">
          <button
            title="Submit"
            className={`btn w-full lg:w-1/3 gap-2 ${
              name &&
              name.trim().length > 0 &&
              structureID &&
              structureID.trim().length > 0
                ? 'no-animation btn-primary btn-outline'
                : 'btn-ghost btn-disabled'
            }`}
            onClick={() =>
              name &&
              name.trim().length > 0 &&
              structureID &&
              structureID.trim().length > 0
                ? submitStructure()
                : null
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
