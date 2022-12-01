import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @ts-ignore
import { useAlert } from 'react-alert';
import axios from 'axios';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProfileStore } from '../stores/useProfileStore';
import { IProject, useProjectStore } from '../stores/useProjectStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import RoutesProjectDisplay from '../components/routes/RoutesProjectDisplay';
import RoutesMiniDisplay from '../components/routes/RoutesMiniDisplay';
import RouteField from '../components/routes/RouteField';
import RoutesViewProjectIncludes from '../components/routes/RoutesViewProjectIncludes';
import { IRoute } from '../utils/route';

export default function ViewRoutesProject() {
  const { profile } = useUserProfileStore((state) => state);
  const { profiles } = useProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);

  const { API_URL } = useContext(LocalContext);
  const { project_id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const limit = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const [memberCurrentPage, setMemberCurrentPage] = useState(0);
  const memberLimit = 5;
  const [filter, setFilter] = useState('');

  const [currentProject, setCurrentProject] = useState<IProject | null>(null);
  const [currentRoutes, setCurrentRoutes] = useState<Array<IRoute>>([]);
  const [name, setName] = useState('');
  const [members, setMembers] = useState<Array<string>>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [showMembers, setShowMembers] = useState(false);
  const [routeID, setRouteID] = useState('');
  const [deletingRoute, setDeletingRoute] = useState(false);

  let allProfiles = [profile, ...profiles.filter((p) => p.id !== profile.id)];

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      setShowMembers(false);
      setDeletingRoute(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    let timer = setTimeout(() => setIsLoading(false), 4000);
    setIsLoading(!(projects && projects.length > 0));

    if (!projects || !profile) {
      navigate('/home');
    }

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let foundProject = projects.find((p) => p.id === project_id);
    if (foundProject) {
      if (
        !profile ||
        (!['ROOT', 'ADMIN'].includes(profile.role) &&
          !foundProject.members.includes(profile.id))
      ) {
        alert.error('Not Authorized to view Routes in this Project');
        navigate('/home');
      }

      setCurrentProject(foundProject);
      setName(foundProject.name);
      setMembers(foundProject.members);

      axios
        .get(
          `${API_URL}/routing/fetch?uid=${profile.uid}&project_id=${project_id}`,
          {
            headers: { Authorization: `Bearer ${profile.jwt}` },
          }
        )
        .then(async (res) => {
          if (res.data.status === 200) {
            setCurrentRoutes(res.data.routes);
          } else {
            console.log(res.data);
            alert.error(res.data.message);
          }

          setIsLoading(false);
        });
    }

    // eslint-disable-next-line
  }, [project_id, projects]);

  return (
    <div
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="routes" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="routes" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {!currentProject || !currentProject.id ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : (
                <Heading color="error">Project not found.</Heading>
              )
            ) : (
              <div></div>
            )}

            {currentProject && currentProject.id && (
              <RoutesProjectDisplay
                currentProject={currentProject}
                setShowMembers={setShowMembers}
                setMembers={setMembers}
                setName={setName}
                setMemberCurrentPage={setMemberCurrentPage}
              />
            )}

            <RoutesMiniDisplay
              currentRoutes={currentRoutes}
              projectID={project_id ? project_id : ''}
              profile={profile}
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
              limit={limit}
              navigate={navigate}
            />

            <div className="w-full lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col">
              {currentRoutes &&
                currentRoutes.length > 0 &&
                currentRoutes
                  .filter(
                    (r: IRoute) =>
                      filter.length <= 0 ||
                      r.route_id
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase()) ||
                      r.route_path
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase())
                  )
                  .slice(currentPage * limit, limit + currentPage * limit)
                  .map((r: IRoute) => (
                    <RouteField
                      key={`rl-${r.route_id}`}
                      route={r}
                      project_id={project_id ? project_id : ''}
                      profile={profile}
                      setRouteID={setRouteID}
                      setDeletingRoute={setDeletingRoute}
                      navigate={navigate}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>

      {currentProject && (
        <RoutesViewProjectIncludes
          API_URL={API_URL}
          profile={profile}
          currentProject={currentProject}
          setCurrentRoutes={setCurrentRoutes}
          routeID={routeID}
          setRouteID={setRouteID}
          deletingRoute={deletingRoute}
          setDeletingRoute={setDeletingRoute}
          alert={alert}
          allProfiles={allProfiles}
          name={name}
          showMembers={showMembers}
          setShowMembers={setShowMembers}
          members={members}
          memberLimit={memberLimit}
          memberCurrentPage={memberCurrentPage}
          setMemberCurrentPage={setMemberCurrentPage}
        />
      )}
    </div>
  );
}
