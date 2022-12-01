import create from 'zustand';

export interface IConstraintProperty {
  property_name: string;
  is_alphabetic: boolean;
  is_numeric: boolean;
  min: number;
  max: number;
  not_allowed: Array<string>;
  additional_allowed: Array<string>;
}

export interface IConstraint {
  component_name: string;
  properties: Array<IConstraintProperty>;
}

export interface ConstraintStore {
  constraints: Array<IConstraint>;
  setConstraints: (value: Array<IConstraint>) => void;
  updateConstraintMin: (
    component_name: string,
    property_name: string,
    value: number
  ) => void;
  updateConstraintMax: (
    component_name: string,
    property_name: string,
    value: number
  ) => void;
}

export const useConstraintStore = create<ConstraintStore>((set, get) => ({
  constraints: [],

  setConstraints: (value) => {
    set({ constraints: value });
  },

  updateConstraintMin: (component_name, property_name, value) => {
    let updatedConstraints = [...get().constraints];
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
    set({ constraints: updatedConstraints });
  },

  updateConstraintMax: (component_name, property_name, value) => {
    let updatedConstraints = [...get().constraints];
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
    set({ constraints: updatedConstraints });
  },
}));
