import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useCollectionStore = create(
  combine(
    {
      collections: [],
    },
    (set) => ({
      setCollections: (value) => set({ collections: value }),

      addCollection: (id, project_id, name, description) =>
        set((state) => {
          let updatedCollections = [...state.collections];
          return {
            collections: [
              ...updatedCollections,
              {
                id,
                project_id,
                name,
                description,
                structures: [],
                custom_structures: [],
              },
            ],
          };
        }),

      updateCollection: (
        id,
        project_id,
        name,
        description,
        structures,
        custom_structures
      ) =>
        set((state) => {
          let updatedCollections = [...state.collections];
          let found = false;
          updatedCollections = updatedCollections.map((c) => {
            let updatedCollection = { ...c };
            if (c.id === id) {
              updatedCollection.name = name;
              updatedCollection.description = description;
              updatedCollection.structures = structures;
              updatedCollection.custom_structures = custom_structures;
              found = true;
            }
            return updatedCollection;
          });
          if (found) {
            return { collections: [...updatedCollections] };
          } else {
            return {
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
            };
          }
        }),

      addStructure: (id, structure) =>
        set((state) => {
          let updatedCollections = [...state.collections];
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
          return { collections: [...updatedCollections] };
        }),

      updateStructure: (id, structure) =>
        set((state) => {
          let updatedCollections = [...state.collections];
          updatedCollections = updatedCollections.map((c) => {
            let updatedCollection = { ...c };
            if (c.id === id) {
              updatedCollection.structures = updatedCollection.structures.map(
                (s) => {
                  let updatedStructure = { ...s };
                  if (s.id === structure.id) {
                    updatedStructure.name = structure.name;
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
                }
              );
            }
            return updatedCollection;
          });
          return { collections: [...updatedCollections] };
        }),

      deleteStructure: (id, structure) =>
        set((state) => {
          let updatedCollections = [...state.collections];
          updatedCollections = updatedCollections.map((c) => {
            let updatedCollection = { ...c };
            if (c.id === id) {
              updatedCollection.structures = [
                ...updatedCollection.structures.filter(
                  (s) => s.id !== structure.id
                ),
              ];
            }
            return updatedCollection;
          });
          return { collections: [...updatedCollections] };
        }),

      addCustomStructure: (id, customID, name, structures) =>
        set((state) => {
          let updatedCollections = [...state.collections];
          updatedCollections = updatedCollections.map((c) => {
            let updatedCollection = { ...c };
            if (c.id === id) {
              updatedCollection.custom_structures = [
                ...updatedCollection.custom_structures,
                {
                  id: customID,
                  name: name,
                  structures: structures,
                },
              ];
            }
            return updatedCollection;
          });
          return { collections: [...updatedCollections] };
        }),

      updateCustomStructure: (id, customID, name, structure) =>
        set((state) => {
          let updatedCollections = [...state.collections];
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
                          updatedStructure.stype = structure.stype;
                          updatedStructure.default_val = structure.default_val;
                          updatedStructure.min = structure.min;
                          updatedStructure.max = structure.max;
                          updatedStructure.encrypted = structure.encrypted;
                          updatedStructure.unique = structure.unique;
                          updatedStructure.regex_pattern =
                            structure.regex_pattern;
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
          return { collections: [...updatedCollections] };
        }),

      deleteCustomStructure: (id, customID) =>
        set((state) => {
          let updatedCollections = [...state.collections];
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
          return { collections: [...updatedCollections] };
        }),

      removeCollection: (id) =>
        set((state) => {
          return {
            colections: [...state.collections.filter((c) => c.id !== id)],
          };
        }),
    })
  )
);
