import create from 'zustand';

export interface IStructure {
  id: string;
  name: string;
  description: string;
  stype: string;
  default_val: Date | string | boolean | number;
  min: number;
  max: number;
  encrypted: boolean;
  unique: boolean;
  regex_pattern: string;
  array: boolean;
  required: boolean;
}

export interface ICustomStructure {
  id: string;
  name: string;
  description: string;
  structures: Array<IStructure>;
}

export interface ICollection {
  id: string;
  project_id: string;
  name: string;
  description: string;
  structures: Array<IStructure>;
  custom_structures: Array<ICustomStructure>;
}

export interface CollectionStore {
  collections: Array<ICollection>;
  setCollections: (value: Array<ICollection>) => void;
  addCollection: (
    id: string,
    project_id: string,
    name: string,
    description: string
  ) => void;
  updateCollection: (
    id: string,
    project_id: string,
    name: string,
    description: string,
    structures: Array<IStructure>,
    custom_structures: Array<ICustomStructure>
  ) => void;
  addStructure: (id: string, structure: IStructure) => void;
  updateStructure: (id: string, structure: IStructure) => void;
  deleteStructure: (id: string, structure: IStructure) => void;
  addCustomStructure: (
    id: string,
    customID: string,
    name: string,
    structures: Array<IStructure>
  ) => void;
  updateCustomStructure: (
    id: string,
    customID: string,
    name: string,
    structure: IStructure
  ) => void;
  deleteCustomStructure: (id: string, customID: string) => void;
  removeCollection: (id: string) => void;
}

export const useCollectionStore = create<CollectionStore>((set, get) => ({
  collections: [],

  setCollections: (value) => {
    set({ collections: value });
  },

  addCollection: (id, project_id, name, description) => {
    let updatedCollections = [
      ...get().collections,
      {
        id,
        project_id,
        name,
        description,
        structures: [],
        custom_structures: [],
      },
    ];
    set({ collections: updatedCollections });
  },

  updateCollection: (
    id,
    project_id,
    name,
    description,
    structures,
    custom_structures
  ) => {
    let updatedCollections = [...get().collections];
    let found = false;
    updatedCollections = updatedCollections.map((c) => {
      let updatedCollection = { ...c };
      if (c.id === id) {
        found = true;
        updatedCollection.project_id = project_id;
        updatedCollection.name = name;
        updatedCollection.description = description;
        updatedCollection.structures = structures;
        updatedCollection.custom_structures = custom_structures;
      }
      return updatedCollection;
    });
    if (found) {
      set({ collections: updatedCollections });
    } else {
      set({
        collections: [
          ...updatedCollections,
          {
            id,
            project_id,
            name,
            description,
            structures,
            custom_structures,
          },
        ],
      });
    }
  },

  addStructure: (id, structure) => {
    let updatedCollections = [...get().collections];
    updatedCollections = updatedCollections.map((c) => {
      let updatedCollection = { ...c };
      if (c.id === id) {
        updatedCollection.structures = [
          ...updatedCollection.structures,
          structure,
        ];
      }
      return updatedCollection;
    });
    set({ collections: updatedCollections });
  },

  updateStructure: (id, structure) => {
    let updatedCollections = [...get().collections];
    updatedCollections = updatedCollections.map((c) => {
      let updatedCollection = { ...c };
      if (c.id === id) {
        updatedCollection.structures = updatedCollection.structures.map((s) => {
          let updatedStructure = { ...s };
          if (s.id === structure.id) {
            updatedStructure.name = structure.name;
            updatedStructure.description = structure.description;
            updatedStructure.stype = structure.stype;
            updatedStructure.default_val = structure.default_val;
            updatedStructure.min = structure.min;
            updatedStructure.max = structure.max;
            updatedStructure.encrypted = structure.encrypted;
            updatedStructure.unique = structure.unique;
            updatedStructure.regex_pattern = structure.regex_pattern;
            updatedStructure.array = structure.array;
          }
          return updatedStructure;
        });
      }
      return updatedCollection;
    });
    set({ collections: updatedCollections });
  },

  deleteStructure: (id, structure) => {
    let updatedCollections = [...get().collections];
    updatedCollections = updatedCollections.map((c) => {
      let updatedCollection = { ...c };
      if (c.id === id) {
        updatedCollection.structures = [
          ...updatedCollection.structures.filter((s) => s.id !== structure.id),
        ];
      }
      return updatedCollection;
    });
    set({ collections: updatedCollections });
  },

  addCustomStructure: (id, customID, name, structures) => {
    let updatedCollections = [...get().collections];
    updatedCollections = updatedCollections.map((c) => {
      let updatedCollection = { ...c };
      if (c.id === id) {
        updatedCollection.custom_structures = [
          ...updatedCollection.custom_structures,
          {
            id: customID,
            name,
            description: '',
            structures,
          },
        ];
      }
      return updatedCollection;
    });
    set({ collections: updatedCollections });
  },

  updateCustomStructure: (id, customID, name, structure) => {
    let updatedCollections = [...get().collections];
    updatedCollections = updatedCollections.map((c) => {
      let updatedCollection = { ...c };
      if (c.id === id) {
        updatedCollection.custom_structures =
          updatedCollection.custom_structures.map((cs) => {
            let updatedCustomStructure = { ...cs };
            if (cs.id === customID) {
              updatedCustomStructure.name = name;
              updatedCustomStructure.structures =
                updatedCustomStructure.structures.map((s) => {
                  let updatedStructure = { ...s };
                  if (s.id === structure.id) {
                    updatedStructure.name = structure.name;
                    updatedStructure.description = structure.description;
                    updatedStructure.stype = structure.stype;
                    updatedStructure.default_val = structure.default_val;
                    updatedStructure.min = structure.min;
                    updatedStructure.max = structure.max;
                    updatedStructure.encrypted = structure.encrypted;
                    updatedStructure.unique = structure.unique;
                    updatedStructure.regex_pattern = structure.regex_pattern;
                    updatedStructure.array = structure.array;
                  }
                  return updatedStructure;
                });
            }
            return updatedCustomStructure;
          });
      }
      return updatedCollection;
    });
    set({ collections: updatedCollections });
  },

  deleteCustomStructure: (id, customID) => {
    let updatedCollections = [...get().collections];
    updatedCollections = updatedCollections.map((c) => {
      let updatedCollection = { ...c };
      if (c.id === id) {
        updatedCollection.custom_structures = [
          ...updatedCollection.custom_structures.filter(
            (cs) => cs.id !== customID
          ),
        ];
      }
      return updatedCollection;
    });
    set({ collections: updatedCollections });
  },

  removeCollection: (id) => {
    let updatedCollections = [...get().collections];
    updatedCollections = updatedCollections.filter((c) => c.id !== id);
    set({ collections: updatedCollections });
  },
}));
