import create from 'zustand';

export interface IProject {
  id: string;
  name: string;
  description: string;
  api_path: string;
  members: Array<string>;
}

export interface ProjectStore {
  projects: Array<IProject>;
  setProjects: (value: Array<IProject>) => void;
  addProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void;
  updateProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void;
  addProjectMember: (id: string, uid: string) => void;
  removeProjectMember: (id: string, uid: string) => void;
  removeProject: (id: string) => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],

  setProjects: (value) => {
    set({ projects: value });
  },

  addProject: (id, name, description, api_path, members) => {
    let updatedProjects = [
      ...get().projects,
      { id, name, description, api_path, members },
    ];
    set({ projects: updatedProjects });
  },

  updateProject: (id, name, description, api_path, members) => {
    let updatedProjects = [...get().projects];
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
      set({ projects: updatedProjects });
    } else {
      set({
        projects: [
          ...updatedProjects,
          { id, name, description, api_path, members },
        ],
      });
    }
  },

  addProjectMember: (id, uid) => {
    let updatedProjects = [...get().projects];
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
    set({ projects: updatedProjects });
  },

  removeProjectMember: (id, uid) => {
    let updatedProjects = [...get().projects];
    updatedProjects = updatedProjects.map((p) => {
      let updatedProject = { ...p };
      if (p.id === id) {
        updatedProject.members = [
          ...updatedProject.members.filter((m) => m !== uid),
        ];
      }
      return updatedProject;
    });
    set({ projects: updatedProjects });
  },

  removeProject: (id) => {
    let updatedProjects = [...get().projects.filter((p) => p.id !== id)];
    set({ projects: updatedProjects });
  },
}));
