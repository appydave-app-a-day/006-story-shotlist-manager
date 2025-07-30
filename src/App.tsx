import React from 'react';
import { ProjectProvider } from './context/ProjectProvider';
import { ProjectControls } from './components/ProjectControls';
import { VideoComponent } from './components/VideoComponent';
import { useProject } from './context/ProjectContext';

const AppContent: React.FC = () => {
  const { state } = useProject();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl">
                📄
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Story Shotlist Manager
              </h1>
            </div>
            <p className="text-slate-600 text-lg">
              Professional AI Image Asset Manager for Video Projects
            </p>
          </div>
        </header>

        <ProjectControls />

        {state.project ? (
          <VideoComponent />
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                🎬
              </div>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">
                No Project Loaded
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                Load a sample project or paste your JSON data to get started with your video storyboard
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}

export default App;
