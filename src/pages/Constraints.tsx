import React, { useCallback, useContext, useEffect, useState } from 'react';
// @ts-ignore
import { useAlert } from 'react-alert';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useConstraintStore } from '../stores/useConstraintStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import ConstraintItem from '../components/constraints/ConstraintItem';
import ConstraintsBulk from '../components/constraints/ConstraintsBulk';
import ConstraintsIncludes from '../components/constraints/ConstraintsIncludes';

export default function Constraints() {
  const { profile } = useUserProfileStore((state) => state);
  const { constraints, updateConstraintMin, updateConstraintMax } =
    useConstraintStore((state) => state);

  const limit = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');

  const { API_URL } = useContext(LocalContext);
  const alert = useAlert();

  const [isLoading, setIsLoading] = useState(true);

  const [currentComponentName, setCurrentComponentName] = useState('');
  const [currentPropertyName, setCurrentPropertyName] = useState('');
  const [editingConstraint, setEditingConstraint] = useState(false);
  const [updateProperty, setUpdateProperty] = useState('MIN');
  const [updateValue, setUpdateValue] = useState('');
  const [expandedConstraints, setExpandedConstraints] = useState<Array<string>>(
    []
  );

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      setEditingConstraint(false);
      setUpdateValue('');
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    let timer = setTimeout(() => setIsLoading(false), 4000);
    setIsLoading(!(constraints && constraints.length > 0));

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="constraints" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="constraints" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {!constraints || constraints.length <= 0 ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : (
                <Heading color="error">No Constraints Found.</Heading>
              )
            ) : (
              <div></div>
            )}

            <ConstraintsBulk
              constraints={constraints}
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
              limit={limit}
            />

            {constraints
              .filter(
                (c) =>
                  filter.length <= 0 ||
                  c.component_name
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase())
              )
              .slice(currentPage * limit, limit + currentPage * limit)
              .map((c) => (
                <ConstraintItem
                  key={`cn-${c.component_name}`}
                  constraint={c}
                  profile={profile}
                  expandedConstraints={expandedConstraints}
                  setExpandedConstraints={setExpandedConstraints}
                  setUpdateProperty={setUpdateProperty}
                  setUpdateValue={setUpdateValue}
                  setCurrentComponentName={setCurrentComponentName}
                  setCurrentPropertyName={setCurrentPropertyName}
                  setEditingConstraint={setEditingConstraint}
                />
              ))}
          </div>
        </div>
      </div>

      <ConstraintsIncludes
        API_URL={API_URL}
        profile={profile}
        value={updateValue}
        setValue={setUpdateValue}
        editingConstraint={editingConstraint}
        setEditingConstraint={setEditingConstraint}
        updateProperty={updateProperty}
        componentName={currentComponentName}
        propertyName={currentPropertyName}
        updateConstraintMin={updateConstraintMin}
        updateConstraintMax={updateConstraintMax}
        alert={alert}
      />
    </div>
  );
}
