import React from 'react';
import { IConstraint } from '../../stores/useConstraintStore';
import { IProfile } from '../../stores/useProfileStore';
import { BigText, SmallText, Text } from '../Components';

export default function ConstraintItem({
  constraint,
  profile,
  expandedConstraints,
  setExpandedConstraints,
  setUpdateProperty,
  setUpdateValue,
  setCurrentComponentName,
  setCurrentPropertyName,
  setEditingConstraint,
}: {
  constraint: IConstraint;
  profile: IProfile;
  expandedConstraints: Array<string>;
  setExpandedConstraints: React.Dispatch<React.SetStateAction<Array<string>>>;
  setUpdateProperty: React.Dispatch<React.SetStateAction<string>>;
  setUpdateValue: React.Dispatch<React.SetStateAction<string>>;
  setCurrentComponentName: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPropertyName: React.Dispatch<React.SetStateAction<string>>;
  setEditingConstraint: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const expanded = expandedConstraints.includes(constraint.component_name);

  return (
    <div
      key={`l-${constraint.component_name}`}
      className={`w-full rounded-lg lg:p-2 p-2 flex flex-col items-center bg-base-200 duration-300 border-2 border-primary bg-opacity-50 border-opacity-50 mb-2`}
    >
      <div className="w-full flex">
        <BigText
          // nobreak
          className="w-full"
          color="primary"
        >
          {constraint.component_name}
        </BigText>

        <button
          className="btn btn-sm btn-info btn-outline btn-circle"
          title={expanded ? 'Minimize' : 'Expand'}
          onClick={() => {
            setExpandedConstraints((prev) =>
              prev.includes(constraint.component_name)
                ? prev.filter((c) => c !== constraint.component_name)
                : [...prev, constraint.component_name]
            );
          }}
        >
          <i
            className={`text-xl
              ${expanded ? 'ri-arrow-drop-up-line' : 'ri-arrow-drop-down-line'}
            `}
          />
        </button>
      </div>

      {expanded && (
        <div className="w-full flex flex-col">
          {constraint.properties.map((p) => (
            <div
              className="lg:p-2 p-1 bg-base-300 rounded-lg mt-2"
              key={`l-${constraint.component_name}-p-${p.property_name}`}
            >
              <Text nobreak className="w-full" color="secondary">
                {p.property_name}
              </Text>

              <div
                className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`}
              />

              <SmallText className="mt-1" mono>
                Enforce Alphabetic:{' '}
                <span className="text-primary">
                  {p.is_alphabetic ? 'true' : 'false'}
                </span>
              </SmallText>

              <SmallText className="mt-1" mono>
                Enforce Numeric:{' '}
                <span className="text-primary">
                  {p.is_numeric ? 'true' : 'false'}
                </span>
              </SmallText>

              <div className="w-full mt-1 flex items-center">
                <SmallText className="w-24" mono>
                  MIN: <span className="text-primary">{p.min}</span>
                </SmallText>

                <button
                  className="btn btn-xs btn-warning btn-outline btn-circle"
                  title="Edit Min"
                  onClick={() => {
                    setUpdateProperty('MIN');
                    setUpdateValue(p.min.toString());
                    setCurrentComponentName(constraint.component_name);
                    setCurrentPropertyName(p.property_name);
                    setEditingConstraint(true);
                  }}
                >
                  <i className={`ri-pencil-line`} />
                </button>
              </div>

              <div className="w-full mt-1 flex items-center">
                <SmallText className="w-24" mono>
                  MAX: <span className="text-primary">{p.max}</span>
                </SmallText>

                <button
                  className="btn btn-xs btn-warning btn-outline btn-circle"
                  title="Edit Max"
                  onClick={() => {
                    setUpdateProperty('MAX');
                    setUpdateValue(p.max.toString());
                    setCurrentComponentName(constraint.component_name);
                    setCurrentPropertyName(p.property_name);
                    setEditingConstraint(true);
                  }}
                >
                  <i className={`ri-pencil-line`} />
                </button>
              </div>

              <div className="w-full mt-1 flex items-center">
                <SmallText className="lg:w-48 w-56 uppercase" mono>
                  Not Allowed:
                </SmallText>

                <div className="w-full justify-left flex">
                  {p.not_allowed.map((na, i) => (
                    <div className="flex items-center" key={`na-${i}`}>
                      <SmallText
                        className="py-1 px-2 rounded-lg bg-base-200 mr-1"
                        mono
                      >
                        {na === ' ' ? '<space>' : na}
                      </SmallText>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full mt-1 flex items-center">
                <SmallText className="lg:w-48 w-56 uppercase" mono>
                  Additional Allowed:
                </SmallText>

                <div className="w-full justify-left flex">
                  {p.additional_allowed.map((aa, i) => (
                    <div className="flex items-center" key={`aa-${i}`}>
                      <SmallText
                        className="py-1 px-2 rounded-lg bg-base-200 mr-1"
                        mono
                      >
                        {aa === ' ' ? '<space>' : aa}
                      </SmallText>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <div className="w-full lg:w-1/4 flex lg:justify-end">
        <button
          className="btn btn-sm btn-secondary btn-outline btn-circle mr-2"
          title={visibility.includes(config.name) ? 'Hide value' : 'Show value'}
          onClick={() => {
            setVisibility((prev) => {
              let updatedVisibility = [...prev];
              if (updatedVisibility.includes(config.name)) {
                updatedVisibility = updatedVisibility.filter(
                  (v) => v !== config.name
                );
              } else {
                updatedVisibility = [...updatedVisibility, config.name];
              }
              return updatedVisibility;
            });
          }}
        >
          <i className={`ri-eye-line`} />
        </button>

        <button
          className="btn btn-sm btn-warning btn-outline btn-circle mr-2"
          title="Edit Config"
          onClick={() => {
            setKeyName(config.name);
            setValue(config.value);
            setEditingConfig(true);
          }}
        >
          <i className={`ri-pencil-line`} />
        </button>

        <button
          className="btn btn-sm btn-error btn-outline btn-circle mr-2"
          title="Delete Config"
          onClick={() => {
            setKeyName(config.name);
            setDeletingConfig(true);
          }}
        >
          <i className={`ri-delete-bin-2-line`} />
        </button>
      </div> */}
    </div>
  );
}
