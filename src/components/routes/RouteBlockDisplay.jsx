import React from 'react';

import {
  ALinkTo,
  BigText,
  Checkbox,
  Heading,
  Input,
  InputOption,
  InputSelect,
  SmallText,
} from '../Components';

import {
  addRouteBodyData,
  addRouteFlowBlock,
  addRouteFlowBlockInbuilt,
  moveRouteFlowBlockInbuilt,
  removeRouteBody,
  removeRouteFlowBlock,
  removeRouteFlowBlockInbuilt,
  setAuthJWTProperty,
  setParamsProperty,
  setRouteBodyProperty,
  setRouteProperty,
  toggleRouteProperty,
  validateDefaultRouteProperty,
  validateRouteProperty,
} from '../../utils/routeProcessor';
import { submitCreateRoute, submitUpdateRoute } from './routes.utils';
import { fetchData } from '../../utils/data';
import FetchBlock from './blocks/FetchBlock';
import AssignmentBlock from './blocks/AssignmentBlock';
import TemplateBlock from './blocks/TemplateBlock';

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
}) {
  const targets = fetchData().route.flow.targets;

  const makePreBlocks = () => {
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
          placeholder="e.g fetch_users"
          value={currentRoute.route_id}
          min={1}
          max={100}
          change={(e) => {
            setRouteProperty(
              setCurrentRoute,
              'route_id',
              e.target.value.trim()
            );
          }}
          className="mt-2 mb-2 lg:w-2/3"
        />
        {!validateRouteProperty(currentRoute, 'route_id').valid && (
          <SmallText color="error">
            * {validateRouteProperty(currentRoute, 'route_id').message}
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
          placeholder="e.g /users/fetch/all"
          value={currentRoute.route_path}
          min={1}
          max={200}
          change={(e) => {
            setRouteProperty(
              setCurrentRoute,
              'route_path',
              e.target.value.trim()
            );
          }}
          className="mt-2 mb-2 lg:w-2/3"
        />

        {!validateRouteProperty(currentRoute, 'route_path').valid && (
          <SmallText color="error">
            * {validateRouteProperty(currentRoute, 'route_path').message}
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
            change={(checked) => {
              toggleRouteProperty(setCurrentRoute, 'auth_jwt', checked);
            }}
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
              placeholder="e.g uid"
              value={currentRoute.auth_jwt.field}
              max={100}
              change={(e) => {
                setAuthJWTProperty(
                  setCurrentRoute,
                  'field',
                  e.target.value.trim()
                );
              }}
              className="mt-2 mb-2"
            />

            {!validateDefaultRouteProperty(currentRoute.auth_jwt.field, 'Field')
              .valid && (
              <SmallText color="error">
                *{' '}
                {
                  validateDefaultRouteProperty(
                    currentRoute.auth_jwt.field,
                    'Field'
                  ).message
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
              placeholder="e.g users"
              value={currentRoute.auth_jwt.ref_col}
              max={100}
              change={(e) => {
                setAuthJWTProperty(
                  setCurrentRoute,
                  'ref_col',
                  e.target.value.trim()
                );
              }}
              className="mt-2 mb-2"
            />

            {!validateDefaultRouteProperty(
              currentRoute.auth_jwt.ref_col,
              'Ref Col'
            ).valid && (
              <SmallText color="error">
                *{' '}
                {
                  validateDefaultRouteProperty(
                    currentRoute.auth_jwt.ref_col,
                    'Ref Col'
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
          <button
            className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
            title="Add Body Data"
            onClick={() => addRouteBodyData(setCurrentRoute, false)}
          >
            Add Body Data
          </button>

          {currentRoute.body.map((b, i) => (
            <div className="w-full" key={`body-${i}`}>
              <div className="w-full flex items-center mt-4 mb-2">
                <Input
                  title="ID"
                  placeholder="e.g profileID"
                  value={b.id}
                  max={100}
                  change={(e) => {
                    setRouteBodyProperty(
                      setCurrentRoute,
                      'id',
                      e.target.value.trim(),
                      i,
                      false
                    );
                  }}
                />

                <InputSelect
                  className="ml-2"
                  value={b.bdtype}
                  change={(e) => {
                    setRouteBodyProperty(
                      setCurrentRoute,
                      'bdtype',
                      e.target.value.trim(),
                      i,
                      false
                    );
                  }}
                >
                  <InputOption title="INTEGER" value="INTEGER">
                    INTEGER
                  </InputOption>
                  <InputOption title="STRING" value="STRING">
                    STRING
                  </InputOption>
                  <InputOption title="BOOLEAN" value="BOOLEAN">
                    BOOLEAN
                  </InputOption>
                  <InputOption title="OTHER" value="OTHER">
                    OTHER
                  </InputOption>
                </InputSelect>

                <button
                  className="btn btn-md btn-error btn-outline btn-circle ml-2"
                  title="Remove Body Data"
                  onClick={() => {
                    removeRouteBody(setCurrentRoute, i, false);
                  }}
                >
                  <i className={`ri-delete-bin-2-line`} />
                </button>
              </div>

              {!validateDefaultRouteProperty(b.id, 'ID').valid && (
                <SmallText color="error">
                  * {validateDefaultRouteProperty(b.id, 'ID').message}
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
            change={(checked) => {
              toggleRouteProperty(setCurrentRoute, 'params', checked);
            }}
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
              placeholder="e.g &"
              value={currentRoute.params.delimiter}
              max={5}
              change={(e) => {
                setParamsProperty(
                  setCurrentRoute,
                  'delimiter',
                  e.target.value.trim()
                );
              }}
              className="mt-2 mb-2"
            />

            {!validateDefaultRouteProperty(
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
              'Delimiter'
            ).valid && (
              <SmallText color="error">
                *{' '}
                {
                  validateDefaultRouteProperty(
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
                    'Delimiter'
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
              <button
                className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
                title="Add Pair"
                onClick={() => addRouteBodyData(setCurrentRoute, true)}
              >
                Add Pair
              </button>

              {currentRoute.params.pairs.map((p, i) => (
                <div className="w-full" key={`pair-${i}`}>
                  <div className="w-full flex items-center mt-4 mb-2">
                    <Input
                      title="ID"
                      placeholder="e.g limit"
                      value={p.id}
                      max={100}
                      change={(e) => {
                        setRouteBodyProperty(
                          setCurrentRoute,
                          'id',
                          e.target.value.trim(),
                          i,
                          true
                        );
                      }}
                    />

                    <InputSelect
                      className="ml-2"
                      value={p.bdtype}
                      change={(e) => {
                        setRouteBodyProperty(
                          setCurrentRoute,
                          'bdtype',
                          e.target.value.trim(),
                          i,
                          true
                        );
                      }}
                    >
                      <InputOption title="INTEGER" value="INTEGER">
                        INTEGER
                      </InputOption>
                      <InputOption title="STRING" value="STRING">
                        STRING
                      </InputOption>
                      <InputOption title="BOOLEAN" value="BOOLEAN">
                        BOOLEAN
                      </InputOption>
                      <InputOption title="OTHER" value="OTHER">
                        OTHER
                      </InputOption>
                    </InputSelect>

                    <button
                      className="btn btn-md btn-error btn-outline btn-circle ml-2"
                      title="Remove Pair"
                      onClick={() => {
                        removeRouteBody(setCurrentRoute, i, true);
                      }}
                    >
                      <i className={`ri-delete-bin-2-line`} />
                    </button>
                  </div>

                  {!validateDefaultRouteProperty(p.id, 'ID').valid && (
                    <SmallText color="error">
                      * {validateDefaultRouteProperty(p.id, 'ID').message}
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

  const makeReadOnlyPreBlocks = () => {
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
          placeholder=""
          value={currentRoute.route_id}
          change={() => null}
          className="mt-2 mb-2 lg:w-2/3"
        />

        <BigText
          color="primary"
          smallerOnMobile
          className="mt-4 uppercase text-left w-full"
        >
          Route Path
        </BigText>
        <Input
          title="Route Path"
          placeholder=""
          value={currentRoute.route_path}
          change={() => null}
          className="mt-2 mb-2 lg:w-2/3"
        />

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
            change={() => null}
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
              placeholder=""
              value={currentRoute.auth_jwt.field}
              change={() => null}
              className="mt-2 mb-2"
            />

            <BigText
              color="primary"
              smallerOnMobile
              className="mt-4 uppercase text-left w-full"
            >
              Ref Col
            </BigText>
            <Input
              title="Field"
              placeholder=""
              value={currentRoute.auth_jwt.ref_col}
              change={() => null}
              className="mt-2 mb-2"
            />
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
          {currentRoute.body.map((b, i) => (
            <div className="w-full" key={`body-${i}`}>
              <div className="w-full flex items-center mt-4 mb-2">
                <Input
                  title="ID"
                  placeholder=""
                  value={b.id}
                  change={() => null}
                />

                <InputSelect
                  className="ml-2"
                  value={b.bdtype}
                  change={() => null}
                >
                  <InputOption title="INTEGER" value="INTEGER">
                    INTEGER
                  </InputOption>
                  <InputOption title="STRING" value="STRING">
                    STRING
                  </InputOption>
                  <InputOption title="BOOLEAN" value="BOOLEAN">
                    BOOLEAN
                  </InputOption>
                  <InputOption title="OTHER" value="OTHER">
                    OTHER
                  </InputOption>
                </InputSelect>
              </div>
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
            change={() => null}
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
              placeholder=""
              value={currentRoute.params.delimiter}
              change={() => null}
              className="mt-2 mb-2"
            />

            <BigText
              color="primary"
              smallerOnMobile
              notFull
              className="mt-4 w-full uppercase text-left"
            >
              Pairs ({currentRoute.params.pairs.length})
            </BigText>

            <div className="w-full my-2">
              {currentRoute.params.pairs.map((p, i) => (
                <div className="w-full" key={`pair-${i}`}>
                  <div className="w-full flex items-center mt-4 mb-2">
                    <Input
                      title="ID"
                      placeholder=""
                      value={p.id}
                      change={() => null}
                    />

                    <InputSelect
                      className="ml-2"
                      value={p.bdtype}
                      change={() => null}
                    >
                      <InputOption title="INTEGER" value="INTEGER">
                        INTEGER
                      </InputOption>
                      <InputOption title="STRING" value="STRING">
                        STRING
                      </InputOption>
                      <InputOption title="BOOLEAN" value="BOOLEAN">
                        BOOLEAN
                      </InputOption>
                      <InputOption title="OTHER" value="OTHER">
                        OTHER
                      </InputOption>
                    </InputSelect>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const makeBlocks = () => {
    const viewOnly = false;

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
          <button
            className="btn btn-secondary btn-outline gap-2 mb-2 w-full lg:w-1/3"
            title="Add Block"
            onClick={() => addRouteFlowBlock(setCurrentBlocks)}
          >
            Add Flow Block
          </button>

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
                      addRouteFlowBlockInbuilt(setCurrentBlocks, i, targetBlock)
                    }
                  >
                    Add
                  </button>
                </div>

                {b.blocks.map((block, j) => (
                  <div
                    className="w-full my-2 p-2 lg:p-2 bg-base-200 rounded-lg lg:border-4 border-2 border-primary border-opacity-50"
                    key={`flow-block-${i}-${j}`}
                  >
                    <div className="w-full flex items-center">
                      <BigText
                        color="primary"
                        smallerOnMobile
                        notFull
                        className="w-full uppercase text-left"
                      >
                        {block.name} Block{' '}
                        {block.rand ? `(unsaved [${block.rand}])` : ''}
                      </BigText>

                      <button
                        className="btn btn-sm btn-info btn-outline btn-circle"
                        title="Move Up"
                        onClick={() => {
                          moveRouteFlowBlockInbuilt(
                            setCurrentBlocks,
                            i,
                            j,
                            'up'
                          );
                        }}
                      >
                        <i className={`ri-arrow-up-line`} />
                      </button>

                      <button
                        className="btn btn-sm btn-info btn-outline btn-circle ml-2"
                        title="Move Down"
                        onClick={() => {
                          moveRouteFlowBlockInbuilt(
                            setCurrentBlocks,
                            i,
                            j,
                            'down'
                          );
                        }}
                      >
                        <i className={`ri-arrow-down-line`} />
                      </button>

                      <button
                        className="btn btn-sm btn-error btn-outline btn-circle ml-2"
                        title="Remove"
                        onClick={() => {
                          removeRouteFlowBlockInbuilt(setCurrentBlocks, i, j);
                        }}
                      >
                        <i className={`ri-delete-bin-2-line`} />
                      </button>
                    </div>

                    {block.name === 'FETCH' ? (
                      <FetchBlock
                        block={block}
                        index={i}
                        blockIndex={j}
                        setCurrentBlocks={setCurrentBlocks}
                        viewOnly={viewOnly}
                      />
                    ) : block.name === 'ASSIGN' ? (
                      <AssignmentBlock
                        block={block}
                        index={i}
                        blockIndex={j}
                        setCurrentBlocks={setCurrentBlocks}
                        viewOnly={viewOnly}
                      />
                    ) : block.name === 'TEMPLATE' ? (
                      <TemplateBlock
                        block={block}
                        index={i}
                        blockIndex={j}
                        setCurrentBlocks={setCurrentBlocks}
                        viewOnly={viewOnly}
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="w-full flex justify-center">
                <button
                  className="btn btn-md btn-success btn-outline btn-circle"
                  title="Add new Flow Block"
                  onClick={() => {
                    addRouteFlowBlock(setCurrentBlocks, i);
                  }}
                >
                  <i className={`ri-add-line`} />
                </button>

                <button
                  className="btn btn-md btn-error btn-outline btn-circle ml-2"
                  title="Remove Flow Block"
                  onClick={() => {
                    removeRouteFlowBlock(setCurrentBlocks, i);
                  }}
                >
                  <i className={`ri-delete-bin-2-line`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const makeReadOnlyBlocks = () => {
    return <div></div>;
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
        <div className="w-full flex my-2">
          {!isEditing && !isCreating && (
            <button
              className="btn btn-info w-full lg:w-2/3 btn-outline gap-2"
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
              className="btn btn-info w-full lg:w-2/3 btn-outline gap-2"
              title="View"
              onClick={() =>
                navigate(`/routes/p/${project_id}/r/v/${route_id}`)
              }
            >
              View
              <i className={`ri-eye-line`} />
            </button>
          )}
        </div>
      )}

      {currentRoute && currentRoute.route_id !== undefined ? (
        isEditing || isCreating ? (
          makePreBlocks()
        ) : (
          makeReadOnlyPreBlocks()
        )
      ) : (
        <div></div>
      )}

      <div className="w-full">
        {isEditing || isCreating ? makeBlocks() : makeReadOnlyBlocks()}

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
