import React from 'react';
import { TasksProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import CategorySelector from './components/CategorySelector';

function App() {
  return (
    <TasksProvider>
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-2xl animate-slideIn">
          <TaskForm />
          <CategorySelector />
          <TaskList />
        </main>
      </div>
    </TasksProvider>
  );
}

export default App;