import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProjectStore } from '../stores/useProjectStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import RouteBlockDisplay from '../components/routes/RouteBlockDisplay';
import RoutesViewProjectIncludes from '../components/routes/RoutesViewProjectIncludes';
import { processRouteBlocks } from '../utils/routeProcessor';
import { fetchData } from '../utils/data';

export default function Route() {
  const { profile } = useUserProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);

  const { API_URL } = useContext(LocalContext);
  const { project_id, route_id, mode } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const targets = fetchData().route.flow.targets;

  const [currentProject, setCurrentProject] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [currentBlocks, setCurrentBlocks] = useState([]);
  const [targetBlock, setTargetBlock] = useState(targets[0].name);
  const [currentKdl, setCurrentKdl] = useState(null);
  const [kdlError, setKdlError] = useState('');
  const [kdl, setKdl] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [deletingRoute, setDeletingRoute] = useState(false);

  const isEditing = ['edit', 'e'].includes(mode.toLowerCase());
  const isCreating = ['create', 'c'].includes(mode.toLowerCase());

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setDeletingRoute(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    setIsLoading(true);
    let timer = setTimeout(() => setIsLoading(false), 6000);

    if (!projects || !profile) {
      navigate('/home');
    }

    if (profile.role === 'VIEWER' && isEditing) {
      navigate(`/routes/p/${project_id}`);
    }

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let foundProject = projects.find((p) => p.id === project_id);
    setCurrentProject(foundProject);

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

      if (isCreating) {
        setCurrentRoute({
          route_id: '',
          route_path: '/',
          project_id: project_id,
          auth_jwt: null,
          body: [],
          params: null,
          flow: {
            fetchers: [],
            assignments: [],
            templates: [],
            conditions: [],
            loops: [],
            filters: [],
            properties: [],
            functions: [],
            objects: [],
            updates: [],
            creates: [],
            returns: [],
          },
        });

        setCurrentBlocks([]);
      } else {
        axios
          .post(
            `${API_URL}/routing/fetch/one`,
            {
              uid: profile.uid,
              project_id: project_id,
              route_id: route_id,
            },
            {
              headers: { Authorization: `Bearer ${profile.jwt}` },
            }
          )
          .then(async (res) => {
            if (res.data.status === 200) {
              setCurrentRoute(res.data.route);
              setCurrentBlocks(processRouteBlocks(res.data.route));

              axios
                .post(
                  `${API_URL}/routing/convert/blocks`,
                  {
                    uid: profile.uid,
                    project_id: project_id,
                    route: res.data.route,
                  },
                  {
                    headers: { Authorization: `Bearer ${profile.jwt}` },
                  }
                )
                .then(async (res) => {
                  if (res.data.status === 200) {
                    setCurrentKdl(res.data.route);
                  } else {
                    console.log(res.data);
                    alert.error(res.data.message);
                  }
                });
            } else {
              console.log(res.data);
              alert.error(res.data.message);
            }

            setIsLoading(false);
          });
      }
    }

    // eslint-disable-next-line
  }, [project_id, projects]);

  const toggleKdl = (toggle) => {
    if (kdl) {
      if (!toggle) {
        alert.info('Validating...');
      }

      axios
        .post(
          `${API_URL}/routing/convert/kdl`,
          {
            uid: profile.uid,
            project_id: project_id,
            route: currentKdl,
          },
          {
            headers: { Authorization: `Bearer ${profile.jwt}` },
          }
        )
        .then(async (res) => {
          if (res.data) {
            setKdlError(res.data.success ? '' : res.data.message);
          }

          if (res.data.status === 200) {
            setCurrentRoute(res.data.route);
            setCurrentBlocks(processRouteBlocks(res.data.route));

            alert.success(
              toggle ? 'Validation OK' : 'KDL Conversion successful'
            );
          } else {
            console.log(res.data);
            alert.error(res.data.message);
            alert.error(toggle ? 'Validation FAIL' : 'KDL Conversion failed');
          }
        });
    } else {
      axios
        .post(
          `${API_URL}/routing/convert/blocks`,
          {
            uid: profile.uid,
            project_id: project_id,
            route: currentRoute,
          },
          {
            headers: { Authorization: `Bearer ${profile.jwt}` },
          }
        )
        .then(async (res) => {
          if (res.data.status === 200) {
            setCurrentKdl(res.data.route);
            alert.success('BLocks Conversion successful');
          } else {
            console.log(res.data);
            alert.error(res.data.message);
            alert.error('Blocks Conversion failed');
          }
        });
    }

    if (toggle) {
      setKdl((prev) => !prev);
    }
  };

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
            {!currentProject ||
            !currentProject.id ||
            ((!currentRoute || !currentRoute.route_id) && isEditing) ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : !currentProject ? (
                <Heading color="error">Project not found.</Heading>
              ) : !currentRoute ? (
                <Heading color="error">Route not found.</Heading>
              ) : (
                <div></div>
              )
            ) : (
              <div></div>
            )}

            {currentProject && currentProject.id && (
              <RouteBlockDisplay
                API_URL={API_URL}
                profile={profile}
                currentRoute={currentRoute}
                setCurrentRoute={setCurrentRoute}
                currentBlocks={currentBlocks}
                setCurrentBlocks={setCurrentBlocks}
                targetBlock={targetBlock}
                setTargetBlock={setTargetBlock}
                project_id={project_id}
                route_id={route_id}
                currentProject={currentProject}
                alert={alert}
                navigate={navigate}
                isEditing={isEditing}
                isCreating={isCreating}
                kdl={kdl}
                kdlError={kdlError}
                currentKdl={currentKdl}
                setCurrentKdl={setCurrentKdl}
                toggleKdl={toggleKdl}
              />
            )}
          </div>
        </div>
      </div>

      <RoutesViewProjectIncludes
        API_URL={API_URL}
        profile={profile}
        currentProject={currentProject}
        setCurrentRoutes={() => null}
        routeID={route_id}
        setRouteID={() => null}
        deletingRoute={deletingRoute}
        setDeletingRoute={setDeletingRoute}
        alert={alert}
        allProfiles={[]}
        name=""
        showMembers={false}
        setShowMembers={() => null}
        members={[]}
        memberLimit={0}
        memberCurrentPage={0}
        setMemberCurrentPage={() => null}
      />
    </div>
  );
}
