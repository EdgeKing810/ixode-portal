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
  IData,
  IDataOriginal,
  setDataValue,
  validateData,
} from '../../utils/dataProcessor';
import { handleImage } from '../../utils/handleImage';
import { submitCreateData, submitUpdateData } from './data.utils';

// @ts-ignore
import loadable from '@loadable/component';
import { IUserProfile } from '../../stores/useUserProfileStore';
import { IProject } from '../../stores/useProjectStore';
import { ICollection } from '../../stores/useCollectionStore';
import { NavigateFunction } from 'react-router-dom';
const MarkdownEngine = loadable(
  () => import('../../processors/MarkdownEngine')
);

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
}: {
  API_URL: string;
  PUBLIC_URL: string;
  profile: IUserProfile;
  currentData: IDataOriginal;
  setCurrentData: React.Dispatch<React.SetStateAction<IDataOriginal | null>>;
  addMedia: (id: string, name: string) => void;
  project_id: string;
  collection_id: string;
  data_id: string;
  currentProject: IProject;
  currentCollection: ICollection;
  alert: any;
  navigate: NavigateFunction;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isCreating: boolean;
  isEditing: boolean;
}) {
  const makeInput = (dataObject: IData, published: boolean) => {
    const types = fetchData().structures.types;
    const current = types.find(
      (t) => t.name.toLowerCase() === dataObject.dtype.toLowerCase()
    );

    // @ts-ignore
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

        {
          // @ts-ignore
          !['checkbox', 'custom-media'].includes(current.type) ? (
            // @ts-ignore
            current.type === 'password' ? (
              <PasswordInput
                title={dataObject.structure_name}
                placeholder={`Enter Value... ${
                  dataObject.default_val && `e.g ${dataObject.default_val}`
                }`}
                value={currentVal.toString()}
                change={(e) => {
                  setCurrentData((prev) => ({
                    // @ts-ignore
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
            ) : // @ts-ignore
            current.type === 'markdown' ? (
              <MarkdownEngine
                API_URL={API_URL}
                PUBLIC_URL={PUBLIC_URL}
                title={dataObject.structure_name}
                placeholder={`Enter Value... ${
                  dataObject.default_val && `e.g ${dataObject.default_val}`
                }`}
                data={currentVal}
                setData={(e: string) => {
                  setCurrentData((prev) => ({
                    // @ts-ignore
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
                addMedia={addMedia}
                min={dataObject.min}
                max={dataObject.max}
                alert={alert}
                viewOnly={false}
              />
            ) : (
              <Input
                // @ts-ignore
                type={current.type}
                title={dataObject.structure_name}
                placeholder={`Enter Value... ${
                  dataObject.default_val && `e.g ${dataObject.default_val}`
                }`}
                value={currentVal.toString()}
                change={(e) => {
                  setCurrentData((prev) => ({
                    // @ts-ignore
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
          ) : // @ts-ignore
          current.type === 'checkbox' ? (
            <div className="w-full flex justify-start mb-2">
              <Checkbox
                value={currentVal === 'true'}
                color="primary"
                change={(checked) => {
                  setCurrentData((prev) => ({
                    // @ts-ignore
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
                {currentVal.toString()}
              </Text>
            </div>
          ) : // @ts-ignore
          current.type === 'custom-media' ? (
            <div className="w-full flex flex-col justify-start mb-2">
              <a
                className="hover:underline w-full focus:underline font-noto outline-none text-secondary"
                target="_blank"
                rel="noopenner noreferrer"
                href={currentVal.toString()}
              >
                {currentVal.toString()}
              </a>

              <button
                className="btn btn-primary btn-outline gap-2 mt-2 lg:mt-0 w-full lg:w-1/6"
                title="Upload"
                onClick={() =>
                  handleImage(
                    alert,
                    API_URL,
                    PUBLIC_URL,
                    (i) => {
                      if (i) {
                        setCurrentData((prev) => ({
                          // @ts-ignore
                          id: prev.id,
                          pairs: setDataValue(
                            currentData.pairs,
                            dataObject.data_id,
                            dataObject.pair_id,
                            dataObject.structure_id,
                            dataObject.custom_structure_id,
                            // @ts-ignore
                            `${PUBLIC_URL}/${i[0]}`
                          ),
                          published: published,
                        }));

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
          )
        }

        {!v.valid && <SmallText color="error">* {v.message}</SmallText>}
      </div>
    );
  };

  const makeReadOnlyInput = (dataObject: IData) => {
    const types = fetchData().structures.types;
    const current = types.find(
      (t) => t.name.toLowerCase() === dataObject.dtype.toLowerCase()
    );

    if (
      // @ts-ignore
      current.type === 'hidden'
    ) {
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

        {!['checkbox', 'custom-media'].includes(
          // @ts-ignore
          current.type
        ) ? (
          // @ts-ignore
          current.type === 'password' ? (
            <PasswordInput
              title={dataObject.structure_name}
              placeholder=""
              value={currentVal.toString()}
              change={() => null}
              className="mt-2 mb-2"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          ) : // @ts-ignore
          current.type === 'markdown' ? (
            <MarkdownEngine
              data={currentVal}
              setData={() => null}
              viewOnly={true}
            />
          ) : (
            <Input
              // @ts-ignore
              type={current.type}
              title={dataObject.structure_name}
              placeholder=""
              value={currentVal.toString()}
              change={() => null}
              className="mt-2 mb-2"
            />
          )
        ) : // @ts-ignore
        current.type === 'checkbox' ? (
          <div className="w-full flex justify-start mb-2">
            <Checkbox
              value={currentVal === 'true'}
              color="primary"
              change={() => null}
            />

            <Text color="base-content" mono>
              {currentVal.toString()}
            </Text>
          </div>
        ) : // @ts-ignore
        current.type === 'custom-media' ? (
          <div className="w-full flex flex-col justify-start mb-2">
            <a
              className="hover:underline focus:underline font-noto outline-none text-secondary"
              target="_blank"
              rel="noopenner noreferrer"
              href={currentVal.toString()}
            >
              {currentVal.toString()}
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
        // nobreak
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
              onClick={() => {
                navigate(
                  `/data/p/${project_id}/c/${collection_id}/d/e/${data_id}`
                );
                // window.location.reload();
              }}
            >
              Edit
              <i className={`ri-pencil-line`} />
            </button>
          )}

          {isEditing && !isCreating && (
            <button
              className="btn btn-info w-full lg:w-1/3 btn-outline gap-2"
              title="View"
              onClick={() => {
                navigate(
                  `/data/p/${project_id}/c/${collection_id}/d/v/${data_id}`
                );
                // window.location.reload();
              }}
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
                : makeReadOnlyInput(dataObject)}
            </div>
          ))}

          <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

          {(isEditing || isCreating) && (
            <button
              className="btn btn-primary btn-outline gap-2 mt-2 lg:mt-0 w-full lg:w-1/3"
              title="Submit"
              onClick={() =>
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
                    )
              }
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
