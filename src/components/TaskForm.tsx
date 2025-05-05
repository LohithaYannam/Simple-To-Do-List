import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import AnimatedButton from './AnimatedButton';
import { PlusCircle } from 'lucide-react';

const TaskForm: React.FC = () => {
  const { state, dispatch } = useTasks();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState(
    state.categories.length > 0 ? state.categories[0].id : ''
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          title: taskTitle,
          completed: false,
          category: taskCategory,
        },
      });
      setTaskTitle('');
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full bg-white rounded-xl shadow-lg p-4 transition-all duration-300 transform hover:shadow-xl"
    >
      <div className="flex items-center gap-3">
        <div className="flex-grow">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onFocus={handleFocus}
            placeholder="Add a new task..."
            className="w-full px-4 py-2 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            required
          />
        </div>
        
        <AnimatedButton
          type="submit"
          className="flex items-center gap-1"
          disabled={!taskTitle.trim()}
        >
          <PlusCircle size={18} />
          <span className="hidden sm:inline">Add</span>
        </AnimatedButton>
      </div>
      
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <select
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            {state.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </form>
  );
};

export default TaskForm;