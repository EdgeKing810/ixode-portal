import create from "zustand";
import { combine } from "zustand/middleware";

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

      addStructure: (id) =>
        set((state) => {
          let updatedCollections = [...state.collections];
          updatedCollections = updatedCollections.map((c) => {
            let updatedCollection = { ...c };
            if (c.id === id) {
              //todo + update + remove * 2 for custom_structure
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
