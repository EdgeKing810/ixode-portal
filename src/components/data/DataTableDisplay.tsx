import React from 'react';

import {
  ALinkTo,
  BigText,
  Checkbox,
  Heading,
  Input,
  PasswordInput,
  Text,
} from '../Components';
import { fetchData } from '../../utils/data';
import {
  getDataValue,
  IDataOriginal,
  setDataValue,
  // validateData,
} from '../../utils/dataProcessor';
import { handleImage } from '../../utils/handleImage';
// import { submitCreateData, submitUpdateData } from './data.utils';

// @ts-ignore
import loadable from '@loadable/component';
import { IUserProfile } from '../../stores/useUserProfileStore';
import { IProject } from '../../stores/useProjectStore';
import { ICollection } from '../../stores/useCollectionStore';
import { NavigateFunction } from 'react-router-dom';
const MarkdownEngine = loadable(
  () => import('../../processors/MarkdownEngine')
);

export default function DataTableDisplay({
  API_URL,
  PUBLIC_URL,
  profile,
  currentTableData,
  setCurrentTableData,
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
  currentTableData: Array<IDataOriginal>;
  setCurrentTableData: React.Dispatch<
    React.SetStateAction<Array<IDataOriginal>>
  >;
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
  const makeCellInput = (dataObject: IDataOriginal) => {
    return (
      <>
        {dataObject.pairs.map((p) => {
          const types = fetchData().structures.types;
          const current = types.find(
            (t) => t.name.toLowerCase() === p.dtype.toLowerCase()
          );

          let currentVal = getDataValue(
            dataObject.pairs,
            p.data_id,
            p.pair_id,
            p.structure_id,
            p.custom_structure_id
          );

          // let v = validateData(p, PUBLIC_URL);

          return (
            <div
              key={`${p.data_id}-${p.pair_id}`}
              className="border-2 border-base-100"
            >
              {
                // @ts-ignore
                !['checkbox', 'custom-media'].includes(current.type) ? (
                  // @ts-ignore
                  current.type === 'password' ? (
                    <PasswordInput
                      title={p.structure_name}
                      placeholder={`Enter Value... ${
                        p.default_val && `e.g ${p.default_val}`
                      }`}
                      value={currentVal.toString()}
                      change={(e) => {
                        setCurrentTableData((prev) =>
                          prev.map((pr) => {
                            let update = { ...pr };
                            if (pr.id === dataObject.id) {
                              update.pairs = setDataValue(
                                update.pairs,
                                p.data_id,
                                p.pair_id,
                                p.structure_id,
                                p.custom_structure_id,
                                e.target.value
                              );
                            }
                            return update;
                          })
                        );
                      }}
                      className="mt-2 mb-2"
                      min={p.min}
                      max={p.max}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  ) : // @ts-ignore
                  current.type === 'markdown' ? (
                    <MarkdownEngine
                      API_URL={API_URL}
                      PUBLIC_URL={PUBLIC_URL}
                      title={p.structure_name}
                      placeholder={`Enter Value... ${
                        p.default_val && `e.g ${p.default_val}`
                      }`}
                      data={currentVal}
                      change={(e: string) => {
                        setCurrentTableData((prev) =>
                          prev.map((pr) => {
                            let update = { ...pr };
                            if (pr.id === dataObject.id) {
                              update.pairs = setDataValue(
                                update.pairs,
                                p.data_id,
                                p.pair_id,
                                p.structure_id,
                                p.custom_structure_id,
                                e
                              );
                            }
                            return update;
                          })
                        );
                      }}
                      addMedia={addMedia}
                      min={p.min}
                      max={p.max}
                      alert={alert}
                      viewOnly={false}
                    />
                  ) : (
                    <Input
                      // @ts-ignore
                      type={current.type}
                      title={p.structure_name}
                      placeholder={`Enter Value... ${
                        p.default_val && `e.g ${p.default_val}`
                      }`}
                      value={currentVal.toString()}
                      change={(e) => {
                        setCurrentTableData((prev) =>
                          prev.map((pr) => {
                            let update = { ...pr };
                            if (pr.id === dataObject.id) {
                              update.pairs = setDataValue(
                                update.pairs,
                                p.data_id,
                                p.pair_id,
                                p.structure_id,
                                p.custom_structure_id,
                                e.target.value
                              );
                            }
                            return update;
                          })
                        );
                      }}
                      className="mt-2 mb-2"
                      min={p.min}
                      max={p.max}
                    />
                  )
                ) : // @ts-ignore
                current.type === 'checkbox' ? (
                  <div className="w-full flex justify-start mb-2">
                    <Checkbox
                      value={currentVal === 'true'}
                      color="primary"
                      change={(checked) => {
                        setCurrentTableData((prev) =>
                          prev.map((pr) => {
                            let update = { ...pr };
                            if (pr.id === dataObject.id) {
                              update.pairs = setDataValue(
                                update.pairs,
                                p.data_id,
                                p.pair_id,
                                p.structure_id,
                                p.custom_structure_id,
                                checked
                              );
                            }
                            return update;
                          })
                        );
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
                              setCurrentTableData((prev) =>
                                prev.map((pr) => {
                                  let update = { ...pr };
                                  if (pr.id === dataObject.id) {
                                    update.pairs = setDataValue(
                                      update.pairs,
                                      p.data_id,
                                      p.pair_id,
                                      p.structure_id,
                                      p.custom_structure_id,
                                      // @ts-ignore
                                      `${PUBLIC_URL}/${i[0]}`
                                    );
                                  }
                                  return update;
                                })
                              );

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
            </div>
          );
        })}
      </>
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

      <div className="w-full overflow-x-scroll">
        {currentTableData && currentTableData.length > 0 && (
          <div className="w-full overflow-x-scroll">
            <div className="grid grid-flow-col">
              {currentTableData[0].pairs.map((field) => (
                <div
                  key={`itf-${field.pair_id}`}
                  className="border-2 border-base-100"
                >
                  <BigText
                    color="primary"
                    className="uppercase text-center p-2 w-full"
                  >
                    {field.custom_structure_name && (
                      <span className="text-secondary">
                        {field.custom_structure_name} {'>'}{' '}
                      </span>
                    )}{' '}
                    {field.structure_name}
                  </BigText>
                </div>
              ))}
            </div>

            {currentTableData.map((dataObject) => (
              <div key={`it-${dataObject.id}`} className="grid grid-flow-col">
                {makeCellInput(dataObject)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
