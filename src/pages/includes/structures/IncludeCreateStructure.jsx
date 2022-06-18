import React from 'react';

import {
  BigText,
  Button,
  Checkbox,
  FullAbsoluteContainer,
  IconButton,
  Input,
  InputTextArea,
  LinkerButton,
  Separator,
  SmallText,
  SubHeading,
  Text,
} from '../../../components/Components';

import { fetchData } from '../../../utils/data';

export default function IncludeCreateStructure({
  isCreating,
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
  submitStructure,
  theme,
  isEditing,
}) {
  let types = fetchData().structures.types;

  const typeSelector = () => (
    <div className="w-full lg:w-1/2 grid lg:grid-cols-4 grid-cols-3 gap-2">
      {types.map((t) => (
        <Button
          className="w-full pt-1 lg:py-2 rounded-lg"
          click={() => {
            setType(t.name);
            setDefaultVal('');
          }}
          theme={theme}
          key={`type-${t.id}`}
          noMargin
        >
          <SmallText color={type === t.name ? 'secondary' : 'primary'}>
            {t.name}
          </SmallText>
        </Button>
      ))}
    </div>
  );

  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        isCreating ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsCreating(false)}
      theme={theme}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        {!isEditing ? (
          <SubHeading color="primary" smallerOnMobile>
            Create a Structure in{' '}
            <span
              className={
                theme === 'light' ? 'text-main-dark' : 'text-main-light'
              }
            >
              {collectionName}
            </span>
          </SubHeading>
        ) : (
          <SubHeading color="primary" smallerOnMobile>
            Edit{' '}
            <span
              className={
                theme === 'light' ? 'text-main-dark' : 'text-main-light'
              }
            >
              {name}
            </span>{' '}
            Structure in{' '}
            <span
              className={
                theme === 'light' ? 'text-main-dark' : 'text-main-light'
              }
            >
              {collectionName}
            </span>
          </SubHeading>
        )}

        <IconButton
          click={() => setIsCreating(false)}
          condition
          icon="close"
          noFill
          className="ml-3 px-2 rounded-lg bg-transparent"
        />
      </div>

      <Input
        title="Enter Name"
        placeholder="Enter Name... (e.g username)"
        value={name}
        change={(e) => {
          setName(e.target.value);
          setStructureID(e.target.value.trim().toLowerCase());
        }}
        theme={theme}
        className="mt-2 lg:w-1/2"
      />

      <InputTextArea
        title="Enter Description"
        placeholder="Enter Description... (optional)"
        value={description}
        change={(e) => setDescription(e.target.value)}
        theme={theme}
        className="my-2 lg:w-1/2"
      />

      <Input
        title="Enter ID"
        placeholder="Enter ID... (e.g username)"
        value={structureID}
        change={(e) => setStructureID(e.target.value.trim().toLowerCase())}
        theme={theme}
        className="mt-2 lg:w-1/2"
      />

      <div className="w-full lg:w-1/2 mt-1">
        <Separator smaller />
      </div>

      <BigText
        color="primary"
        className="mb-2 uppercase text-left w-full lg:w-1/2"
      >
        Choose Type
      </BigText>

      {typeSelector()}

      <div className="w-full lg:w-1/2 flex mt-4">
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
            value={min}
            change={(e) => setMin(e.target.value)}
            theme={theme}
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
            value={max}
            change={(e) => setMax(e.target.value)}
            theme={theme}
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 mt-1">
        <Separator smaller />
      </div>

      {types.find((t) => t.name === type).type !== 'hidden' && (
        <>
          <BigText
            color="primary"
            className="mt-2 uppercase text-left w-full lg:w-1/2"
          >
            Specify Default Value (Optional)
          </BigText>

          {types.find((t) => t.name === type).type !== 'checkbox' ? (
            <Input
              type={types.find((t) => t.name === type).type}
              title="Enter Default Value"
              placeholder="Enter Default Value..."
              value={defaultVal}
              change={(e) => setDefaultVal(e.target.value)}
              theme={theme}
              className="mt-2 lg:w-1/2"
              min={min}
              max={max}
            />
          ) : (
            <div className="w-full lg:w-1/2 flex justify-start">
              <Checkbox
                value={defaultVal}
                color="primary"
                change={setDefaultVal}
              />

              <Text color={theme === 'light' ? 'dark' : 'light'} mono>
                {defaultVal === true ? 'true' : 'false'}
              </Text>
            </div>
          )}
        </>
      )}

      <BigText
        color="primary"
        className="mt-2 uppercase text-left w-full lg:w-1/2"
      >
        Specify Regex Pattern (Optional)
      </BigText>

      <Input
        title="Enter Regex Pattern"
        placeholder="Enter Regex Pattern..."
        value={regex}
        change={(e) => setRegex(e.target.value)}
        theme={theme}
        className="mt-2 lg:w-1/2"
        min={min}
        max={max}
      />

      <div className="w-full lg:w-1/2 flex justify-start mt-2">
        <Text color="primary" className="uppercase w-1/2 lg:w-1/3 text-left">
          Should Encrypt?
        </Text>

        <Checkbox value={encrypted} color="primary" change={setEncrypted} />

        <Text color={theme === 'light' ? 'dark' : 'light'} mono>
          {encrypted === true ? 'true' : 'false'}
        </Text>
      </div>

      <div className="w-full lg:w-1/2 flex justify-start mt-1">
        <Text color="primary" className="uppercase w-1/2 lg:w-1/3 text-left">
          Should be Unique?
        </Text>

        <Checkbox value={unique} color="primary" change={setUnique} />

        <Text color={theme === 'light' ? 'dark' : 'light'} mono>
          {unique === true ? 'true' : 'false'}
        </Text>
      </div>

      <div className="w-full lg:w-1/2 flex justify-start mt-1">
        <Text color="primary" className="uppercase w-1/2 lg:w-1/3 text-left">
          Should be an Array?
        </Text>

        <Checkbox value={array} color="primary" change={setArray} />

        <Text color={theme === 'light' ? 'dark' : 'light'} mono>
          {array === true ? 'true' : 'false'}
        </Text>
      </div>

      <div className="w-full lg:w-1/2 flex justify-start">
        <LinkerButton
          title="Submit"
          condition={
            name &&
            name.trim().length > 0 &&
            structureID &&
            structureID.trim().length > 0
              ? true
              : false
          }
          click={() =>
            name &&
            name.trim().length > 0 &&
            structureID &&
            structureID.trim().length > 0
              ? submitStructure()
              : null
          }
          className="uppercase p-2 rounded-lg lg:w-1/2 w-full"
          theme={theme}
        />
      </div>
    </FullAbsoluteContainer>
  );
}
