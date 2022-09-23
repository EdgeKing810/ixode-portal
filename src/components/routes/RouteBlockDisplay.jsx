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
  getBlocks,
  getRouteBlocks,
  removeRouteBody,
  setAuthJWTProperty,
  setParamsProperty,
  setRouteBodyProperty,
  setRouteProperty,
  toggleRouteProperty,
  validateDefaultRouteProperty,
  validateRouteProperty,
} from '../../utils/routeProcessor';
import { submitCreateRoute, submitUpdateRoute } from './routes.utils';

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
}) {
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
          className="mt-2 mb-2 lg:w-1/2"
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
          className="mt-2 mb-2 lg:w-1/2"
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
          className="mt-2 mb-2 lg:w-1/2"
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
          <div className="w-full bg-base-300 rounded-lg p-4 my-2 lg:w-1/2">
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

        <div className="lg:w-1/2 w-full bg-base-300 rounded-lg p-4 my-2">
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
          <div className="w-full bg-base-300 rounded-lg p-4 my-2 lg:w-1/2">
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
          className="mt-2 mb-2 lg:w-1/2"
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
          className="mt-2 mb-2 lg:w-1/2"
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
          className="mt-2 mb-2 lg:w-1/2"
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
          <div className="w-full bg-base-300 rounded-lg p-4 my-2 lg:w-1/2">
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

        <div className="lg:w-1/2 w-full bg-base-300 rounded-lg p-4 my-2">
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
          <div className="w-full bg-base-300 rounded-lg p-4 my-2 lg:w-1/2">
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

  const makeBlock = (block) => {
    // let v = validateData(dataObject, PUBLIC_URL);

    return (
      <div className="w-full" key={`blo-${block.global_index}`}>
        {/* <BigText color="primary" className="mt-2 uppercase text-left w-full">
          {dataObject.custom_structure_name && (
            <span className="text-secondary">
              {dataObject.custom_structure_name} {'>'}{' '}
            </span>
          )}{' '}
          {dataObject.structure_name}
        </BigText> */}

        <div></div>

        {/* {!v.valid && <SmallText color="error">* {v.message}</SmallText>} */}
      </div>
    );
  };

  const makeReadOnlyBlock = (block) => {
    // let v = validateData(dataObject, PUBLIC_URL);

    return (
      <div className="w-full" key={`blo-${block.global_index}`}>
        {/* <BigText color="primary" className="mt-2 uppercase text-left w-full">
            {dataObject.custom_structure_name && (
              <span className="text-secondary">
                {dataObject.custom_structure_name} {'>'}{' '}
              </span>
            )}{' '}
            {dataObject.structure_name}
          </BigText> */}

        <div></div>

        {/* {!v.valid && <SmallText color="error">* {v.message}</SmallText>} */}
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
              className="btn btn-info w-full lg:w-1/2 btn-outline gap-2"
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
              className="btn btn-info w-full lg:w-1/2 btn-outline gap-2"
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
        {getRouteBlocks(currentRoute).map((block) => (
          <div key={`bl-${block.global_index}`}>
            {isEditing || isCreating
              ? makeBlock(block)
              : makeReadOnlyBlock(block)}
          </div>
        ))}

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
              } btn-outline gap-2 mt-2 lg:mt-0 w-full lg:w-1/2`}
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
                        navigate
                      )
                    : submitCreateRoute(
                        API_URL,
                        profile,
                        project_id,
                        currentRoute,
                        alert,
                        navigate
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
