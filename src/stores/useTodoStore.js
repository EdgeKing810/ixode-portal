import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useTodoStore = create(
  combine({ todos: [] }, (set) => ({
    setTodos: (value) => set({ todos: value }),

    addTodo: (todoID, title, description) =>
      set((state) => {
        return {
          todos: [
            {
              todoID,
              title,
              description,
              completed: false,
            },
            ...state.todos.filter((t) => t.todoID !== todoID),
          ],
        };
      }),

    updateTodo: (todoID, title, description) =>
      set((state) => {
        let currentTodos = [...state.todos];
        let shouldAddTodo = true;

        currentTodos = currentTodos.map((ct) => {
          let updatedTodo = { ...ct };
          if (updatedTodo.todoID === todoID) {
            shouldAddTodo = false;
            updatedTodo = {
              todoID,
              title,
              description,
              completed: ct.completed,
            };
          }
          return updatedTodo;
        });

        return {
          todos: shouldAddTodo
            ? [
                {
                  todoID,
                  title,
                  description,
                  completed: false,
                },
                ...state.todos,
              ]
            : [...currentTodos],
        };
      }),

    deleteTodo: (todoID) =>
      set((state) => {
        return {
          todos: state.todos.filter((t) => t.todoID !== todoID),
        };
      }),

    toggleTodo: (todoID) =>
      set((state) => {
        let currentTodos = [...state.todos];

        currentTodos = currentTodos.map((ct) => {
          let updatedTodo = { ...ct };
          if (updatedTodo.todoID === todoID) {
            updatedTodo.completed = !ct.completed;
          }
          return updatedTodo;
        });

        return {
          todos: [...currentTodos],
        };
      }),
  }))
);
