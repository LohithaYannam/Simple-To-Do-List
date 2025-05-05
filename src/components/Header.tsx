import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const Header: React.FC = () => {
  const { state, dispatch } = useTasks();

  const handleToggleShowCompleted = () => {
    dispatch({ type: 'TOGGLE_SHOW_COMPLETED' });
  };

  return (
    <header className="py-6 px-4 text-center relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 opacity-70" />
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center mix-blend-overlay opacity-20" />
      
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-2 flex items-center justify-center">
          <Sparkles className="w-6 h-6 mr-2 text-yellow-500 animate-pulse" />
          <span className="tracking-wider">Kawaii Tasks</span>
          <Sparkles className="w-6 h-6 ml-2 text-yellow-500 animate-pulse" />
        </h1>
        <p className="text-sm md:text-base text-purple-700 mb-4">Keep your tasks organized with cuteness!</p>
        
        <div className="flex justify-center mt-4">
          <button
            onClick={handleToggleShowCompleted}
            className="flex items-center text-sm text-violet-700 bg-white/70 px-3 py-1.5 rounded-full shadow-sm hover:bg-white/90 transition-all"
          >
            {state.showCompleted ? 'Hide completed' : 'Show completed'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;