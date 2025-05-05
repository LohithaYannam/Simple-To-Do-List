import React, { useState, useRef, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckCircle, Circle, Trash2, Edit2, Save } from 'lucide-react';

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed, category }) => {
  const { state, dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const categoryObj = state.categories.find((c) => c.id === category);
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(title);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      dispatch({
        type: 'EDIT_TASK',
        payload: { id, title: editedTitle },
      });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(title);
    }
  };

  return (
    <div 
      className={`group relative bg-white rounded-lg p-4 shadow-sm transition-all duration-300 
                 hover:shadow-md ${completed ? 'opacity-75' : ''}`}
      style={{ borderLeft: `3px solid ${categoryObj?.color || '#ddd'}` }}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className="shrink-0 mt-0.5 focus:outline-none transition-transform hover:scale-110"
        >
          {completed ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
        </button>

        <div className="flex-grow">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className="w-full px-2 py-1 border-b border-pink-300 focus:outline-none focus:border-pink-500"
              autoFocus
            />
          ) : (
            <div className="flex items-center">
              <p
                className={`text-gray-800 font-medium ${
                  completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {title}
              </p>
              {categoryObj && (
                <span
                  className="ml-2 px-2 py-0.5 text-xs rounded-full"
                  style={{ 
                    backgroundColor: `${categoryObj.color}20`, 
                    color: categoryObj.color 
                  }}
                >
                  {categoryObj.name}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-1">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;