import create from "zustand";
import { combine } from "zustand/middleware";

export const useProjectStore = create(
  combine(
    {
      projects: [],
    },
    (set) => ({
      setProjects: (value) => set({ projects: value }),

      addProject: (id, name, description, api_path, members) =>
        set((state) => {
          let updatedProjects = [...state.projects];
          return {
            projects: [
              ...updatedProjects,
              { id, name, description, api_path, members },
            ],
          };
        }),

      updateProject: (id, name, description, api_path, members) =>
        set((state) => {
          let updatedProjects = [...state.projects];
          let found = false;
          updatedProjects = updatedProjects.map((p) => {
            let updatedProject = { ...p };
            if (p.id === id) {
              updatedProject.name = name;
              updatedProject.description = description;
              updatedProject.api_path = api_path;
              updatedProject.members = members;
              found = true;
            }
            return updatedProject;
          });
          if (found) {
            return { projects: [...updatedProjects] };
          } else {
            return {
              projects: [
                ...updatedProjects,
                { id, name, description, api_path, members },
              ],
            };
          }
        }),

      addProjectMember: (id, uid) =>
        set((state) => {
          let updatedProjects = [...state.projects];
          updatedProjects = updatedProjects.map((p) => {
            let updatedProject = { ...p };
            if (p.id === id) {
              updatedProject.members = [
                ...updatedProject.members.filter((m) => m !== uid),
                uid,
              ];
            }
            return updatedProject;
          });
          return { projects: [...updatedProjects] };
        }),

      removeProjectMember: (id, uid) =>
        set((state) => {
          let updatedProjects = [...state.projects];
          updatedProjects = updatedProjects.map((p) => {
            let updatedProject = { ...p };
            if (p.id === id) {
              updatedProject.members = [
                ...updatedProject.members.filter((m) => m !== uid),
              ];
            }
            return updatedProject;
          });
          return { projects: [...updatedProjects] };
        }),

      removeProject: (id) =>
        set((state) => {
          return {
            projects: [...state.projects.filter((p) => p.id !== id)],
          };
        }),
    })
  )
);
