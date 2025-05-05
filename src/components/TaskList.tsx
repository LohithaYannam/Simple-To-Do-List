import React, { useMemo } from 'react';
import TaskItem from './TaskItem';
import { useTasks } from '../context/TaskContext';
import { ListX } from 'lucide-react';

const TaskList: React.FC = () => {
  const { state } = useTasks();
  
  const filteredTasks = useMemo(() => {
    return state.tasks
      .filter(task => {
        // Filter by category if one is selected
        if (state.activeCategory && task.category !== state.activeCategory) {
          return false;
        }
        
        // Filter out completed tasks if showCompleted is false
        if (!state.showCompleted && task.completed) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort by completion status first (incomplete tasks first)
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        
        // Then sort by creation date (newest first)
        return b.createdAt - a.createdAt;
      });
  }, [state.tasks, state.activeCategory, state.showCompleted]);

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <ListX className="w-12 h-12 text-gray-300 mb-2" />
        <h3 className="text-xl font-medium text-gray-500 mb-1">No tasks found</h3>
        <p className="text-sm text-gray-400">
          {state.tasks.length > 0
            ? "Try changing your filters or add new tasks"
            : "Add your first task to get started!"}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3 animate-fadeIn">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          category={task.category}
        />
      ))}
    </div>
  );
};

export default TaskList;