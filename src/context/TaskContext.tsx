import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Task, TasksState, TasksAction, Category } from '../types';
import { saveState, loadState } from '../utils/localStorage';

const defaultCategories: Category[] = [
  { id: '1', name: 'Personal', color: '#FF6B9C' },
  { id: '2', name: 'Work', color: '#9C7CF4' },
  { id: '3', name: 'School', color: '#7CFACC' },
];

const initialState: TasksState = {
  tasks: [],
  categories: defaultCategories,
  activeCategory: null,
  showCompleted: true,
};

const TasksContext = createContext<{
  state: TasksState;
  dispatch: React.Dispatch<TasksAction>;
} | undefined>(undefined);

function tasksReducer(state: TasksState, action: TasksAction): TasksState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: crypto.randomUUID(),
            ...action.payload,
            createdAt: Date.now(),
          },
        ],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task
        ),
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [
          ...state.categories,
          { id: crypto.randomUUID(), ...action.payload },
        ],
      };
    case 'SET_ACTIVE_CATEGORY':
      return {
        ...state,
        activeCategory: action.payload,
      };
    case 'TOGGLE_SHOW_COMPLETED':
      return {
        ...state,
        showCompleted: !state.showCompleted,
      };
    default:
      return state;
  }
}

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const savedState = loadState();
  const [state, dispatch] = useReducer(
    tasksReducer,
    savedState || initialState
  );

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};