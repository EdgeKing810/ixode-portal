import React from 'react';

import {
  ALinkTo,
  BigText,
  Button,
  Checkbox,
  Heading,
  Input,
  InputTextArea,
  PasswordInput,
  Separator,
  SmallText,
  SubHeading,
  Text,
} from '../Components';
import { fetchData } from '../../utils/data';
import {
  getDataValue,
  getDummyBool,
  setDataValue,
  switchDummyBool,
  validateData,
} from '../../utils/dataProcessor';
import { handleImage } from '../../utils/handleImage';
import { submitCreateData, submitUpdateData } from './data.utils';

export default function DataStructureDisplay({
  API_URL,
  PUBLIC_URL,
  profile,
  currentData,
  setCurrentData,
  addMedia,
  project_id,
  collection_id,
  data_id,
  currentProject,
  currentCollection,
  theme,
  alert,
  navigate,
}) {
  const makeInput = (dataObject) => {
    const types = fetchData().structures.types;
    const current = types.find(
      (t) => t.name.toLowerCase() === dataObject.dtype.toLowerCase()
    );

    if (current.type === 'hidden') {
      return <div key={`it1-${dataObject.pair_id}`}></div>;
    }

    let currentVal = getDataValue(
      currentData.pairs,
      dataObject.data_id,
      dataObject.pair_id,
      dataObject.structure_id,
      dataObject.custom_structure_id
    );

    let v = validateData(dataObject, PUBLIC_URL);

    return (
      <div className="w-full" key={`it1-${dataObject.pair_id}`}>
        <BigText color="primary" className="mt-2 uppercase text-left w-full">
          {dataObject.custom_structure_name && (
            <span className="text-main-secondary">
              {dataObject.custom_structure_name} {'>'}{' '}
            </span>
          )}{' '}
          {dataObject.structure_name}
        </BigText>

        {!['checkbox', 'custom-media'].includes(current.type) ? (
          current.type === 'password' ? (
            <PasswordInput
              title="Enter Value"
              placeholder={`Enter Value... ${
                dataObject.default_val && `e.g ${dataObject.default_val}`
              }`}
              value={currentVal}
              change={(e) => {
                setCurrentData((prev) => ({
                  id: prev.id,
                  pairs: setDataValue(
                    currentData.pairs,
                    dataObject.data_id,
                    dataObject.pair_id,
                    dataObject.structure_id,
                    dataObject.custom_structure_id,
                    e.target.value
                  ),
                }));
              }}
              theme={theme}
              className="mt-2 mb-2"
              min={dataObject.min}
              max={dataObject.max}
              showPassword={getDummyBool(
                currentData.pairs,
                dataObject.data_id,
                dataObject.pair_id,
                dataObject.structure_id,
                dataObject.custom_structure_id
              )}
              setShowPassword={() =>
                switchDummyBool(
                  currentData.pairs,
                  dataObject.data_id,
                  dataObject.pair_id,
                  dataObject.structure_id,
                  dataObject.custom_structure_id
                )
              }
            />
          ) : current.type === 'markdown' ? (
            <InputTextArea
              title="Enter Value"
              placeholder={`Enter Value... ${
                dataObject.default_val && `e.g ${dataObject.default_val}`
              }`}
              value={currentVal}
              change={(e) => {
                setCurrentData((prev) => ({
                  id: prev.id,
                  pairs: setDataValue(
                    currentData.pairs,
                    dataObject.data_id,
                    dataObject.pair_id,
                    dataObject.structure_id,
                    dataObject.custom_structure_id,
                    e.target.value
                  ),
                }));
              }}
              theme={theme}
              className="mt-2 mb-2"
              min={dataObject.min}
              max={dataObject.max}
              noTransition
            />
          ) : (
            <Input
              type={current.type}
              title="Enter Value"
              placeholder={`Enter Value... ${
                dataObject.default_val && `e.g ${dataObject.default_val}`
              }`}
              value={currentVal}
              change={(e) => {
                setCurrentData((prev) => ({
                  id: prev.id,
                  pairs: setDataValue(
                    currentData.pairs,
                    dataObject.data_id,
                    dataObject.pair_id,
                    dataObject.structure_id,
                    dataObject.custom_structure_id,
                    e.target.value
                  ),
                }));
              }}
              theme={theme}
              className="mt-2 mb-2"
              min={dataObject.min}
              max={dataObject.max}
            />
          )
        ) : current.type === 'checkbox' ? (
          <div className="w-full flex justify-start mb-2">
            <Checkbox
              value={
                currentVal === 'true'
                  ? true
                  : currentVal === 'false'
                  ? false
                  : currentVal
              }
              color="primary"
              change={(checked) => {
                setCurrentData((prev) => ({
                  id: prev.id,
                  pairs: setDataValue(
                    currentData.pairs,
                    dataObject.data_id,
                    dataObject.pair_id,
                    dataObject.structure_id,
                    dataObject.custom_structure_id,
                    checked
                  ),
                }));
              }}
            />

            <Text color={theme === 'light' ? 'dark' : 'light'} mono>
              {currentVal === 'true' || currentVal === true ? 'true' : 'false'}
            </Text>
          </div>
        ) : current.type === 'custom-media' ? (
          <div className="w-full lg:w-1/2 flex justify-start mb-2">
            <Button
              color="dark"
              bgcolor="primary"
              theme={theme}
              className="p-3 w-full lg:w-1/3 justify-center uppercase font-bold"
              click={() =>
                handleImage(
                  alert,
                  API_URL,
                  PUBLIC_URL,
                  (i) => {
                    if (i) {
                      setCurrentData((prev) => ({
                        id: prev.id,
                        pairs: setDataValue(
                          currentData.pairs,
                          dataObject.data_id,
                          dataObject.pair_id,
                          dataObject.structure_id,
                          dataObject.custom_structure_id,
                          `${PUBLIC_URL}/${i[0]}`
                        ),
                      }));

                      addMedia(i[1], i[0]);
                    }
                  },
                  true,
                  false
                )
              }
            >
              Upload
            </Button>
          </div>
        ) : (
          <div></div>
        )}

        {!v.valid && <SmallText color="error">* {v.message}</SmallText>}
      </div>
    );
  };

  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } duration-400 border-2 border-transparent bg-opacity-50 border-opacity-50 mb-2`}
    >
      <Heading
        color="primary"
        theme={theme}
        nobreak
        className="w-full flex uppercase"
      >
        <ALinkTo
          noopacity
          notfull
          notnoto
          to={`/data/p/${project_id}`}
          color="primary"
        >
          {currentProject.name} {'>'}
        </ALinkTo>
        <ALinkTo
          noopacity
          notfull
          notnoto
          to={`/data/p/${project_id}/c/${collection_id}`}
          color="secondary"
          className="pl-2"
        >
          {currentCollection.name}
        </ALinkTo>
      </Heading>

      {currentData && currentData.id && currentData.pairs.length > 0 ? (
        <div className="w-full">
          {currentData.pairs.map((dataObject) => (
            <div key={`it-${dataObject.pair_id}`}>{makeInput(dataObject)}</div>
          ))}

          <Separator />

          <Button
            color="dark"
            bgcolor="primary"
            theme={theme}
            className="p-3 w-full lg:w-1/3 justify-center uppercase font-bold"
            click={() =>
              data_id && data_id.length > 0
                ? submitUpdateData(
                    API_URL,
                    profile,
                    project_id,
                    collection_id,
                    data_id,
                    currentData.pairs,
                    alert,
                    navigate
                  )
                : submitCreateData(
                    API_URL,
                    profile,
                    project_id,
                    collection_id,
                    currentData.pairs,
                    alert,
                    navigate
                  )
            }
          >
            Submit
          </Button>
        </div>
      ) : (
        <SubHeading color="error">
          no data structures in this data object.
        </SubHeading>
      )}
    </div>
  );
}
