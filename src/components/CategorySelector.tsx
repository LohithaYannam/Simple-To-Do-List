import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import AnimatedButton from './AnimatedButton';
import { Plus, X, Tag } from 'lucide-react';

const CategorySelector: React.FC = () => {
  const { state, dispatch } = useTasks();
  const [newCategory, setNewCategory] = useState('');
  const [newColor, setNewColor] = useState('#FF6B9C');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      dispatch({
        type: 'ADD_CATEGORY',
        payload: { name: newCategory, color: newColor },
      });
      setNewCategory('');
      setIsAdding(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    if (state.activeCategory === categoryId) {
      dispatch({ type: 'SET_ACTIVE_CATEGORY', payload: null });
    } else {
      dispatch({ type: 'SET_ACTIVE_CATEGORY', payload: categoryId });
    }
  };

  const colors = [
    '#FF6B9C', // Pink
    '#9C7CF4', // Purple
    '#7CFACC', // Mint
    '#FFD166', // Yellow
    '#F78FB3', // Light Pink
    '#3DB2FF', // Blue
  ];

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center">
          <Tag className="w-4 h-4 mr-1" />
          Categories
        </h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center text-sm text-violet-600 hover:text-violet-800 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAddCategory} className="mb-4 bg-white p-3 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setNewColor(color)}
                  className={`w-5 h-5 rounded-full cursor-pointer transition-transform ${
                    newColor === color ? 'ring-2 ring-gray-400 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            <AnimatedButton type="submit" size="sm">
              Add
            </AnimatedButton>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => dispatch({ type: 'SET_ACTIVE_CATEGORY', payload: null })}
          className={`px-3 py-1.5 text-sm rounded-full transition-all ${
            state.activeCategory === null
              ? 'bg-gray-700 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        
        {state.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-3 py-1.5 text-sm rounded-full transition-all ${
              state.activeCategory === category.id
                ? 'text-white shadow-md'
                : 'bg-white/80 hover:bg-white'
            }`}
            style={{
              backgroundColor: state.activeCategory === category.id ? category.color : '',
              color: state.activeCategory === category.id ? 'white' : 'rgba(55, 65, 81)',
              borderLeft: `3px solid ${category.color}`,
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;