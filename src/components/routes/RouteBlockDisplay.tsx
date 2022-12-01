import React from 'react';

import {
  ALinkTo,
  BigText,
  Checkbox,
  Heading,
  Input,
  InputOption,
  InputSelect,
  InputTextArea,
  SmallText,
} from '../Components';

import {
  addBlockBodyData,
  addRouteBlock,
  addInbuiltBlock,
  moveInbuiltBlock,
  removeBlockBodyData,
  removeRouteBlock,
  removeInbuiltBlock,
  setBlockAuthJWTProperty,
  setBlockParamsProperty,
  setBlockBodyDataProperty,
  setRouteProperty,
  toggleRouteProperty,
  validateProperty,
} from '../../utils/routeProcessor';

import { submitCreateRoute, submitUpdateRoute } from './routes.utils';
import { fetchData } from '../../utils/data';
import FetchBlock from './blocks/FetchBlock';
import AssignmentBlock from './blocks/AssignmentBlock';
import TemplateBlock from './blocks/TemplateBlock';
import ConditionBlock from './blocks/ConditionBlock';
import LoopBlock from './blocks/LoopBlock';
import FilterBlock from './blocks/FilterBlock';
import PropertyBlock from './blocks/PropertyBlock';
import FunctionBlock from './blocks/FunctionBlock';
import ObjectBlock from './blocks/ObjectBlock';
import UpdateBlock from './blocks/UpdateBlock';
import CreateBlock from './blocks/CreateBlock';
import ReturnBlock from './blocks/ReturnBlock';
import { IUserProfile } from '../../stores/useUserProfileStore';
import { IComplexBlock, IRoute, TMixedBlocks } from '../../utils/route';
import { IProject } from '../../stores/useProjectStore';
import { NavigateFunction } from 'react-router-dom';

export default function RouteBlockDisplay({
  API_URL,
  profile,
  currentRoute,
  setCurrentRoute,
  project_id,
  route_id,
  currentProject,
  alert,
  navigate,
  isEditing,
  isCreating,
  currentBlocks,
  setCurrentBlocks,
  targetBlock,
  setTargetBlock,
  kdl,
  kdlError,
  currentKdl,
  setCurrentKdl,
  toggleKdl,
}: {
  API_URL: string;
  profile: IUserProfile;
  currentRoute: IRoute;
  setCurrentRoute: React.Dispatch<React.SetStateAction<IRoute | null>>;
  project_id: string;
  route_id: string;
  currentProject: IProject;
  alert: any;
  navigate: NavigateFunction;
  isEditing: boolean;
  isCreating: boolean;
  currentBlocks: Array<IComplexBlock>;
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>;
  targetBlock: string;
  setTargetBlock: React.Dispatch<React.SetStateAction<string>>;
  kdl: boolean;
  kdlError: string;
  currentKdl: string;
  setCurrentKdl: React.Dispatch<React.SetStateAction<string>>;
  toggleKdl: (b: boolean) => void;
}) {
  const targets = fetchData().route.flow.targets;

  const makePreBlocks = (viewOnly: boolean) => {
    return (
      <div className="w-full">
        <BigText
          color="primary"
          smallerOnMobile
          className="uppercase text-left w-full"
        >
          Route ID
        </BigText>
        <Input
          title="Route ID"
          placeholder={viewOnly ? '' : 'e.g fetch_users'}
          value={currentRoute.route_id}
          min={1}
          max={100}
          change={(e) =>
            !viewOnly
              ? setRouteProperty(
                  setCurrentRoute,
                  'route_id',
                  e.target.value.trim()
                )
              : null
          }
          className="mt-2 mb-2 lg:w-2/3"
        />
        {!viewOnly &&
          !validateProperty(currentRoute.route_id, 'Route ID', true).valid && (
            <SmallText color="error">
              *{' '}
              {
                validateProperty(currentRoute.route_id, 'Route ID', true)
                  .message
              }
            </SmallText>
          )}

        <BigText
          color="primary"
          smallerOnMobile
          className="mt-4 uppercase text-left w-full"
        >
          Route Path
        </BigText>
        <Input
          title="Route Path"
          placeholder={viewOnly ? '' : 'e.g /users/fetch/all'}
          value={currentRoute.route_path}
          min={1}
          max={200}
          change={(e) =>
            !viewOnly
              ? setRouteProperty(
                  setCurrentRoute,
                  'route_path',
                  e.target.value.trim()
                )
              : null
          }
          className="mt-2 mb-2 lg:w-2/3"
        />

        {!viewOnly &&
          !validateProperty(
            currentRoute.route_path.split('/').join(''),
            'Route Path',
            true
          ).valid && (
            <SmallText color="error">
              *{' '}
              {
                validateProperty(
                  currentRoute.route_path.split('/').join(''),
                  'Route Path',
                  true
                ).message
              }
            </SmallText>
          )}

        <BigText
          color="primary"
          smallerOnMobile
          className="mt-4 uppercase text-left w-full"
        >
          Project ID
        </BigText>

        <Input
          title="Project ID"
          placeholder=""
          value={currentRoute.project_id}
          change={() => null}
          className="mt-2 mb-2 lg:w-2/3"
        />

        <div className="w-full flex items-center mt-4">
          <BigText
            color="primary"
            smallerOnMobile
            notFull
            className="uppercase text-left"
          >
            Auth JWT
          </BigText>

          <Checkbox
            noMargin
            value={currentRoute.auth_jwt !== null}
            color="primary"
            change={(checked) =>
              !viewOnly
                ? toggleRouteProperty(setCurrentRoute, 'auth_jwt', checked)
                : null
            }
            className="ml-2 mt-1"
          />
        </div>

        {currentRoute.auth_jwt !== null && (
          <div className="w-full bg-base-300 rounded-lg p-4 my-2 lg:w-2/3">
            <BigText
              color="primary"
              smallerOnMobile
              className="uppercase text-left w-full"
            >
              Field
            </BigText>

            <Input
              title="Field"
              placeholder={viewOnly ? '' : 'e.g uid'}
              value={currentRoute.auth_jwt.field}
              max={100}
              change={(e) =>
                !viewOnly
                  ? setBlockAuthJWTProperty(
                      setCurrentRoute,
                      'field',
                      e.target.value.trim()
                    )
                  : null
              }
              className="mt-2 mb-2"
            />

            {!viewOnly &&
              !validateProperty(currentRoute.auth_jwt.field, 'Field', true)
                .valid && (
                <SmallText color="error">
                  *{' '}
                  {
                    validateProperty(currentRoute.auth_jwt.field, 'Field', true)
                      .message
                  }
                </SmallText>
              )}

            <BigText
              color="primary"
              smallerOnMobile
              className="mt-4 uppercase text-left w-full"
            >
              Ref Col
            </BigText>
            <Input
              title="Field"
              placeholder={viewOnly ? '' : 'e.g users'}
              value={currentRoute.auth_jwt.ref_col}
              max={100}
              change={(e) =>
                !viewOnly
                  ? setBlockAuthJWTProperty(
                      setCurrentRoute,
                      'ref_col',
                      e.target.value.trim()
                    )
                  : null
              }
              className="mt-2 mb-2"
            />

            {!viewOnly &&
              !validateProperty(currentRoute.auth_jwt.ref_col, 'Ref Col', true)
                .valid && (
                <SmallText color="error">
                  *{' '}
                  {
                    validateProperty(
                      currentRoute.auth_jwt.ref_col,
                      'Ref Col',
                      true
                    ).message
                  }
                </SmallText>
              )}
          </div>
        )}

        <BigText
          color="primary"
          smallerOnMobile
          notFull
          className="mt-4 w-full uppercase text-left"
        >
          Body ({currentRoute.body.length})
        </BigText>

        <div className="lg:w-2/3 w-full bg-base-300 rounded-lg p-4 my-2">
          {!viewOnly && (
            <button
              className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
              title="Add Body Data"
              onClick={() => addBlockBodyData(setCurrentRoute, false)}
            >
              Add Body Data
            </button>
          )}

          {currentRoute.body.map((b, i) => (
            <div className="w-full" key={`body-${i}`}>
              <div className="w-full flex items-center mt-4 mb-2">
                <Input
                  title="ID"
                  placeholder={viewOnly ? '' : 'e.g profileID'}
                  value={b.id}
                  max={100}
                  change={(e) =>
                    !viewOnly
                      ? setBlockBodyDataProperty(
                          setCurrentRoute,
                          'id',
                          e.target.value.trim(),
                          i,
                          false
                        )
                      : null
                  }
                />

                <InputSelect
                  className="ml-2"
                  value={b.bdtype}
                  change={(e) =>
                    !viewOnly
                      ? setBlockBodyDataProperty(
                          setCurrentRoute,
                          'bdtype',
                          e.target.value.trim(),
                          i,
                          false
                        )
                      : null
                  }
                >
                  <InputOption title="INTEGER" value="INTEGER">
                    INTEGER
                  </InputOption>
                  <InputOption title="FLOAT" value="FLOAT">
                    FLOAT
                  </InputOption>
                  <InputOption title="STRING" value="STRING">
                    STRING
                  </InputOption>
                  <InputOption title="BOOLEAN" value="BOOLEAN">
                    BOOLEAN
                  </InputOption>
                  <InputOption title="ARRAY" value="ARRAY">
                    ARRAY
                  </InputOption>
                  <InputOption title="OTHER" value="OTHER">
                    OTHER
                  </InputOption>
                </InputSelect>

                {!viewOnly && (
                  <button
                    className="btn btn-md btn-error btn-outline btn-circle ml-2"
                    title="Remove Body Data"
                    onClick={() => {
                      removeBlockBodyData(setCurrentRoute, i, false);
                    }}
                  >
                    <i className={`ri-delete-bin-2-line`} />
                  </button>
                )}
              </div>

              {!viewOnly && !validateProperty(b.id, 'ID', true).valid && (
                <SmallText color="error">
                  * {validateProperty(b.id, 'ID', true).message}
                </SmallText>
              )}
            </div>
          ))}
        </div>

        <div className="w-full flex items-center mt-4">
          <BigText
            color="primary"
            smallerOnMobile
            notFull
            className="uppercase text-left"
          >
            Params
          </BigText>
          <Checkbox
            noMargin
            value={currentRoute.params !== null}
            color="primary"
            change={(checked) =>
              !viewOnly
                ? toggleRouteProperty(setCurrentRoute, 'params', checked)
                : null
            }
            className="ml-2 mt-1"
          />
        </div>

        {currentRoute.params !== null && (
          <div className="w-full bg-base-300 rounded-lg p-4 my-2 lg:w-2/3">
            <BigText
              color="primary"
              smallerOnMobile
              className="uppercase text-left w-full"
            >
              Delimiter
            </BigText>
            <Input
              title="Delimiter"
              placeholder={viewOnly ? '' : 'e.g &'}
              value={currentRoute.params.delimiter}
              max={5}
              change={(e) =>
                !viewOnly
                  ? setBlockParamsProperty(
                      setCurrentRoute,
                      'delimiter',
                      e.target.value.trim()
                    )
                  : null
              }
              className="mt-2 mb-2"
            />

            {!viewOnly &&
              !validateProperty(
                currentRoute.params.delimiter
                  .split('&')
                  .join('')
                  .split('!')
                  .join('')
                  .split('#')
                  .join('')
                  .split('-')
                  .join('')
                  .split('_')
                  .join(''),
                'Delimiter',
                true
              ).valid && (
                <SmallText color="error">
                  *{' '}
                  {
                    validateProperty(
                      currentRoute.params.delimiter
                        .split('&')
                        .join('')
                        .split('!')
                        .join('')
                        .split('#')
                        .join('')
                        .split('-')
                        .join('')
                        .split('_')
                        .join(''),
                      'Delimiter',
                      true
                    ).message
                  }
                </SmallText>
              )}

            <BigText
              color="primary"
              smallerOnMobile
              notFull
              className="mt-4 w-full uppercase text-left"
            >
              Pairs ({currentRoute.params.pairs.length})
            </BigText>

            <div className="w-full my-2">
              {!viewOnly && (
                <button
                  className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
                  title="Add Pair"
                  onClick={() => addBlockBodyData(setCurrentRoute, true)}
                >
                  Add Pair
                </button>
              )}

              {currentRoute.params.pairs.map((p, i) => (
                <div className="w-full" key={`pair-${i}`}>
                  <div className="w-full flex items-center mt-4 mb-2">
                    <Input
                      title="ID"
                      placeholder={viewOnly ? '' : 'e.g limit'}
                      value={p.id}
                      max={100}
                      change={(e) =>
                        !viewOnly
                          ? setBlockBodyDataProperty(
                              setCurrentRoute,
                              'id',
                              e.target.value.trim(),
                              i,
                              true
                            )
                          : null
                      }
                    />

                    <InputSelect
                      className="ml-2"
                      value={p.bdtype}
                      change={(e) =>
                        !viewOnly
                          ? setBlockBodyDataProperty(
                              setCurrentRoute,
                              'bdtype',
                              e.target.value.trim(),
                              i,
                              true
                            )
                          : null
                      }
                    >
                      <InputOption title="INTEGER" value="INTEGER">
                        INTEGER
                      </InputOption>
                      <InputOption title="FLOAT" value="FLOAT">
                        FLOAT
                      </InputOption>
                      <InputOption title="STRING" value="STRING">
                        STRING
                      </InputOption>
                      <InputOption title="BOOLEAN" value="BOOLEAN">
                        BOOLEAN
                      </InputOption>
                      <InputOption title="ARRAY" value="ARRAY">
                        ARRAY
                      </InputOption>
                      <InputOption title="OTHER" value="OTHER">
                        OTHER
                      </InputOption>
                    </InputSelect>

                    {!viewOnly && (
                      <button
                        className="btn btn-md btn-error btn-outline btn-circle ml-2"
                        title="Remove Pair"
                        onClick={() => {
                          removeBlockBodyData(setCurrentRoute, i, true);
                        }}
                      >
                        <i className={`ri-delete-bin-2-line`} />
                      </button>
                    )}
                  </div>

                  {!viewOnly && !validateProperty(p.id, 'ID', true).valid && (
                    <SmallText color="error">
                      * {validateProperty(p.id, 'ID', true).message}
                    </SmallText>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const makeBlocks = (viewOnly: boolean) => {
    return (
      <div className="w-full">
        <BigText
          color="primary"
          smallerOnMobile
          notFull
          className="mt-4 w-full uppercase text-left"
        >
          Flow ({currentBlocks.reduce((acc, b) => acc + b.blocks.length, 0)})
        </BigText>

        <div className="w-full rounded-lg my-2">
          {!viewOnly && (
            <button
              className="btn btn-secondary btn-outline gap-2 mb-2 w-full lg:w-1/3"
              title="Add Block"
              onClick={() => addRouteBlock(setCurrentBlocks)}
            >
              Add Flow Block
            </button>
          )}

          {currentBlocks.map((b, i) => (
            <div className="w-full lg:w-2/3" key={`flow-block-${i}`}>
              <div className="w-full bg-base-300 p-4 my-2 rounded-lg">
                <BigText
                  color="secondary"
                  smallerOnMobile
                  notFull
                  className="w-full uppercase text-left"
                >
                  Block Index: {b.block_index}
                </BigText>

                {!viewOnly && (
                  <div className="w-full flex my-2">
                    <InputSelect
                      value={targetBlock}
                      change={(e) => {
                        setTargetBlock(e.target.value);
                      }}
                      noPadding
                    >
                      {targets.map((t) => (
                        <InputOption
                          title={t.name}
                          value={t.name}
                          key={`flow-block-${i}-t-${t.name}`}
                        >
                          {t.name}
                        </InputOption>
                      ))}
                    </InputSelect>

                    <button
                      className="btn btn-secondary btn-outline ml-2 w-1/2 lg:w-1/3"
                      title="Add"
                      onClick={() =>
                        addInbuiltBlock(setCurrentBlocks, i, targetBlock)
                      }
                    >
                      Add
                    </button>
                  </div>
                )}

                {b.blocks.map((block, j) => (
                  <div
                    className="w-full my-4 p-2 lg:p-2 bg-base-200 rounded-lg lg:border-4 border-2 border-primary border-opacity-50"
                    key={`flow-block-${i}-${j}`}
                  >
                    <div className="w-full flex items-center">
                      <BigText
                        color="primary"
                        smallerOnMobile
                        notFull
                        className="w-full uppercase text-left"
                      >
                        {block.name} Block
                      </BigText>

                      {!viewOnly && (
                        <button
                          className="btn btn-sm btn-info btn-outline btn-circle"
                          title="Move Up"
                          onClick={() => {
                            moveInbuiltBlock(setCurrentBlocks, i, j, 'up');
                          }}
                        >
                          <i className={`ri-arrow-up-line`} />
                        </button>
                      )}

                      {!viewOnly && (
                        <button
                          className="btn btn-sm btn-info btn-outline btn-circle ml-2"
                          title="Move Down"
                          onClick={() => {
                            moveInbuiltBlock(setCurrentBlocks, i, j, 'down');
                          }}
                        >
                          <i className={`ri-arrow-down-line`} />
                        </button>
                      )}

                      {!viewOnly && (
                        <button
                          className="btn btn-sm btn-error btn-outline btn-circle ml-2"
                          title="Remove"
                          onClick={() => {
                            removeInbuiltBlock(setCurrentBlocks, i, j);
                          }}
                        >
                          <i className={`ri-delete-bin-2-line`} />
                        </button>
                      )}
                    </div>

                    {makeMainBlock(block, i, j, viewOnly)}
                  </div>
                ))}
              </div>

              {!viewOnly && (
                <div className="w-full flex justify-center">
                  <button
                    className="btn btn-md btn-success btn-outline btn-circle"
                    title="Add new Flow Block"
                    onClick={() => {
                      addRouteBlock(setCurrentBlocks, i);
                    }}
                  >
                    <i className={`ri-add-line`} />
                  </button>

                  <button
                    className="btn btn-md btn-error btn-outline btn-circle ml-2"
                    title="Remove Flow Block"
                    onClick={() => {
                      removeRouteBlock(setCurrentBlocks, i);
                    }}
                  >
                    <i className={`ri-delete-bin-2-line`} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const makeKdlInput = (viewOnly: boolean) => {
    return (
      <div className="w-full">
        {kdlError && (
          <div className="w-full text-error p-2 bg-base-300 rounded-lg mb-2">
            {kdlError}
          </div>
        )}

        <InputTextArea
          placeholder={viewOnly ? '' : 'Enter KDL...'}
          title="KDL"
          type="text"
          value={currentKdl}
          change={(e) => (!viewOnly ? setCurrentKdl(e.target.value) : null)}
          inbuiltClassName="lg:min-h-120"
        />

        {!viewOnly && (
          <button
            className={`btn btn-primary btn-outline gap-2 w-full mt-2 lg:w-1/3`}
            title="Validate KDL"
            onClick={() => toggleKdl(false)}
          >
            Validate
          </button>
        )}
      </div>
    );
  };

  const makeMainBlock = (b: TMixedBlocks, i: number, j: number, v: boolean) => {
    const props = {
      block: b,
      index: i,
      blockIndex: j,
      setCurrentBlocks: setCurrentBlocks,
      viewOnly: v,
    };

    switch (b.name) {
      case 'FETCH':
        // @ts-ignore
        return <FetchBlock {...props} />;
      case 'ASSIGN':
        // @ts-ignore
        return <AssignmentBlock {...props} />;
      case 'TEMPLATE':
        // @ts-ignore
        return <TemplateBlock {...props} />;
      case 'CONDITION':
        // @ts-ignore
        return <ConditionBlock {...props} />;
      case 'LOOP':
        // @ts-ignore
        return <LoopBlock {...props} />;
      case 'FILTER':
        // @ts-ignore
        return <FilterBlock {...props} />;
      case 'PROPERTY':
        // @ts-ignore
        return <PropertyBlock {...props} />;
      case 'FUNCTION':
        // @ts-ignore
        return <FunctionBlock {...props} />;
      case 'OBJECT':
        // @ts-ignore
        return <ObjectBlock {...props} />;
      case 'UPDATE':
        // @ts-ignore
        return <UpdateBlock {...props} />;
      case 'CREATE':
        // @ts-ignore
        return <CreateBlock {...props} />;
      case 'RETURN':
        // @ts-ignore
        return <ReturnBlock {...props} />;
      default:
        return <div></div>;
    }
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
          to={`/routes/p/${project_id}`}
          color="primary"
        >
          {currentProject.name}
        </ALinkTo>
        {currentRoute && currentRoute.route_id.length > 0 && (
          <div className="lg:pl-2 text-secondary">
            {' > '}
            {currentRoute.route_id}
          </div>
        )}
      </Heading>

      {profile && profile.role !== 'VIEWER' && (
        <div className="w-full flex lg:flex-row flex-col my-2">
          {!isEditing && !isCreating && (
            <button
              className="btn btn-info w-full lg:w-1/3 btn-outline gap-2"
              title="Edit"
              onClick={() =>
                navigate(`/routes/p/${project_id}/r/e/${route_id}`)
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
                navigate(`/routes/p/${project_id}/r/v/${route_id}`)
              }
            >
              View
              <i className={`ri-eye-line`} />
            </button>
          )}

          <button
            className="btn btn-info w-full lg:w-1/3 btn-outline gap-2 mt-2 lg:mt-0 lg:ml-2"
            title="Toggle KDL View"
            onClick={() => toggleKdl(true)}
          >
            Toggle KDL
            <i className={`ri-booklet-line`} />
          </button>
        </div>
      )}

      {currentRoute && currentRoute.route_id !== undefined && !kdl ? (
        makePreBlocks(!(isEditing || isCreating))
      ) : (
        <div></div>
      )}

      <div className="w-full">
        {kdl
          ? makeKdlInput(!(isEditing || isCreating))
          : makeBlocks(!(isEditing || isCreating))}

        <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

        {(isEditing || isCreating) &&
          currentRoute &&
          currentRoute.route_id !== undefined && (
            <button
              className={`btn ${
                currentRoute.route_id.length > 0 &&
                currentRoute.route_path.length > 0
                  ? 'btn-primary'
                  : 'btn-disabled'
              } btn-outline gap-2 mt-2 lg:mt-0 w-full lg:w-2/3`}
              title="Submit"
              onClick={() =>
                currentRoute.route_id.length > 0 &&
                currentRoute.route_path.length > 0
                  ? !isCreating
                    ? submitUpdateRoute(
                        API_URL,
                        profile,
                        project_id,
                        currentRoute,
                        alert,
                        navigate,
                        currentBlocks
                      )
                    : submitCreateRoute(
                        API_URL,
                        profile,
                        project_id,
                        currentRoute,
                        alert,
                        navigate,
                        currentBlocks
                      )
                  : null
              }
            >
              Submit
            </button>
          )}
      </div>
    </div>
  );
}
