import React from 'react';

import {
  ALinkTo,
  BigText,
  Checkbox,
  Heading,
  Input,
  PasswordInput,
  SmallText,
  SubHeading,
  Text,
} from '../Components';
import { fetchData } from '../../utils/data';
import {
  getDataValue,
  setDataValue,
  validateData,
} from '../../utils/dataProcessor';
import { handleImage } from '../../utils/handleImage';
import { submitCreateData, submitUpdateData } from './data.utils';

import Parser from '../../processors/markdownEngine';
import MDEditor, { commands } from '@uiw/react-md-editor';

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
  alert,
  navigate,
  showPassword,
  setShowPassword,
  isCreating,
  isEditing,
}) {
  const svgPath =
    'M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z';

  const makeInput = (dataObject, published) => {
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
            <span className="text-secondary">
              {dataObject.custom_structure_name} {'>'}{' '}
            </span>
          )}{' '}
          {dataObject.structure_name}
        </BigText>

        {!['checkbox', 'custom-media'].includes(current.type) ? (
          current.type === 'password' ? (
            <PasswordInput
              title={dataObject.structure_name}
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
                  published: published,
                }));
              }}
              className="mt-2 mb-2"
              min={dataObject.min}
              max={dataObject.max}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              // showPassword={getDummyBool(
              //   currentData.pairs,
              //   dataObject.data_id,
              //   dataObject.pair_id,
              //   dataObject.structure_id,
              //   dataObject.custom_structure_id
              // )}
              // setShowPassword={() => {
              //   setCurrentData((prev) => ({
              //     id: prev.id,
              //     pairs: switchDummyBool(
              //       currentData.pairs,
              //       dataObject.data_id,
              //       dataObject.pair_id,
              //       dataObject.structure_id,
              //       dataObject.custom_structure_id
              //     ),
              //     published: published
              //   }));
              // }}
            />
          ) : current.type === 'markdown' ? (
            <MDEditor
              title={dataObject.structure_name}
              placeholder={`Enter Value... ${
                dataObject.default_val && `e.g ${dataObject.default_val}`
              }`}
              value={currentVal}
              onChange={(e) => {
                setCurrentData((prev) => ({
                  id: prev.id,
                  pairs: setDataValue(
                    currentData.pairs,
                    dataObject.data_id,
                    dataObject.pair_id,
                    dataObject.structure_id,
                    dataObject.custom_structure_id,
                    e
                  ),
                  published: published,
                }));
              }}
              visiableDragbar={true}
              preview="edit"
              minHeight="500"
              className="mb-2 mt-2"
              min={dataObject.min}
              max={dataObject.max}
              autoFocus={false}
              extraCommands={[
                commands.group([], {
                  name: 'upload-image',
                  groupName: 'upload-image',
                  icon: (
                    <svg viewBox="0 0 1024 1024" width="12" height="12">
                      <path fill="currentColor" d={svgPath} />
                    </svg>
                  ),
                  children: () => {
                    return <div></div>;
                  },
                  execute: () => {
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
                              `${currentVal}\n![](${PUBLIC_URL}/${i[0]})`
                            ),
                            published: published,
                          }));

                          addMedia(i[1], i[0]);
                        }
                      },
                      true,
                      false
                    );
                  },
                  buttonProps: { 'aria-label': 'Insert title' },
                }),
              ]}
            />
          ) : (
            <Input
              type={current.type}
              title={dataObject.structure_name}
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
                  published: published,
                }));
              }}
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
                  published: published,
                }));
              }}
            />

            <Text color="base-content" mono>
              {currentVal === 'true' || currentVal === true ? 'true' : 'false'}
            </Text>
          </div>
        ) : current.type === 'custom-media' ? (
          <div className="w-full lg:w-1/2 flex flex-col justify-start mb-2">
            <a
              className="hover:underline focus:underline font-noto outline-none text-secondary"
              target="_blank"
              rel="noopenner noreferrer"
              href={currentVal}
            >
              {currentVal}
            </a>

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
                        published: published,
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
            </button>
          </div>
        ) : (
          <div></div>
        )}

        {!v.valid && <SmallText color="error">* {v.message}</SmallText>}
      </div>
    );
  };

  const makeReadOnlyInput = (dataObject) => {
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
            <span className="text-secondary">
              {dataObject.custom_structure_name} {'>'}{' '}
            </span>
          )}{' '}
          {dataObject.structure_name}
        </BigText>

        {!['checkbox', 'custom-media'].includes(current.type) ? (
          current.type === 'password' ? (
            <PasswordInput
              title={dataObject.structure_name}
              placeholder=""
              value={currentVal}
              change={() => null}
              className="mt-2 mb-2"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          ) : current.type === 'markdown' ? (
            <Parser>{currentVal}</Parser>
          ) : (
            <Input
              type={current.type}
              title={dataObject.structure_name}
              placeholder=""
              value={currentVal}
              change={() => null}
              className="mt-2 mb-2"
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
              change={() => null}
            />

            <Text color="base-content" mono>
              {currentVal === 'true' || currentVal === true ? 'true' : 'false'}
            </Text>
          </div>
        ) : current.type === 'custom-media' ? (
          <div className="w-full lg:w-1/2 flex flex-col justify-start mb-2">
            <a
              className="hover:underline focus:underline font-noto outline-none text-secondary"
              target="_blank"
              rel="noopenner noreferrer"
              href={currentVal}
            >
              {currentVal}
            </a>
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
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-2 border-transparent bg-opacity-50 border-opacity-50 mb-2`}
    >
      <Heading
        color="primary"
        nobreak
        className="w-full flex lg:flex-row flex-col uppercase"
        smallerOnMobile
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
          className="lg:pl-2"
        >
          {currentCollection.name}
        </ALinkTo>
      </Heading>

      {profile && profile.role !== 'VIEWER' && (
        <div className="w-full flex mt-2">
          {!isEditing && !isCreating && (
            <button
              className="btn btn-info w-full lg:w-1/3 btn-outline gap-2"
              title="Edit"
              onClick={() =>
                navigate(
                  `/data/p/${project_id}/c/${collection_id}/d/e/${data_id}`
                )
              }
            >
              Edit
              <i className={`ri-pencil-line`} />
            </button>
          )}

          {isEditing && !isCreating && (
            <button
              className="btn btn-info w-full lg:w-1/3 btn-outline gap-2"
              title="View"
              onClick={() =>
                navigate(
                  `/data/p/${project_id}/c/${collection_id}/d/v/${data_id}`
                )
              }
            >
              View
              <i className={`ri-eye-line`} />
            </button>
          )}
        </div>
      )}

      {currentData && currentData.id && currentData.pairs.length > 0 ? (
        <div className="w-full">
          {currentData.pairs.map((dataObject) => (
            <div key={`it-${dataObject.pair_id}`}>
              {isEditing || isCreating
                ? makeInput(dataObject, currentData.published)
                : makeReadOnlyInput(dataObject, currentData.published)}
            </div>
          ))}

          <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

          {isEditing && (
            <button
              className="btn btn-primary btn-outline gap-2 mt-2 lg:mt-0 w-full lg:w-1/3"
              title="Submit"
              onClick={() => () =>
                !isCreating
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
                    )}
            >
              Submit
            </button>
          )}
        </div>
      ) : (
        <SubHeading color="error">
          no data structures in this data object.
        </SubHeading>
      )}
    </div>
  );
}
