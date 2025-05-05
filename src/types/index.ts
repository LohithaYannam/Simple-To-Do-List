export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  createdAt: number;
}

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type TasksState = {
  tasks: Task[];
  categories: Category[];
  activeCategory: string | null;
  showCompleted: boolean;
};

export type TasksAction =
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt'> }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'EDIT_TASK'; payload: { id: string; title: string } }
  | { type: 'ADD_CATEGORY'; payload: Omit<Category, 'id'> }
  | { type: 'SET_ACTIVE_CATEGORY'; payload: string | null }
  | { type: 'TOGGLE_SHOW_COMPLETED' };