import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useConstraintStore = create(
  combine(
    {
      constraints: [],
    },
    (set) => ({
      setConstraints: (value) => set({ constraints: value }),

      updateConstraintMin: (component_name, property_name, value) =>
        set((state) => {
          let updatedConstraints = [...state.constraints];
          updatedConstraints = updatedConstraints.map((c) => {
            let updatedConstraint = { ...c };
            if (c.component_name === component_name) {
              let updatedProperties = [...c.properties];
              updatedProperties = updatedProperties.map((p) => {
                let updatedProperty = { ...p };
                if (p.property_name === property_name) {
                  updatedProperty.min = value;
                }
                return updatedProperty;
              });
              updatedConstraint.properties = updatedProperties;
            }
            return updatedConstraint;
          });
          return { constraints: updatedConstraints };
        }),

      updateConstraintMax: (component_name, property_name, value) =>
        set((state) => {
          let updatedConstraints = [...state.constraints];
          updatedConstraints = updatedConstraints.map((c) => {
            let updatedConstraint = { ...c };
            if (c.component_name === component_name) {
              let updatedProperties = [...c.properties];
              updatedProperties = updatedProperties.map((p) => {
                let updatedProperty = { ...p };
                if (p.property_name === property_name) {
                  updatedProperty.max = value;
                }
                return updatedProperty;
              });
              updatedConstraint.properties = updatedProperties;
            }
            return updatedConstraint;
          });
          return { constraints: updatedConstraints };
        }),
    })
  )
);
