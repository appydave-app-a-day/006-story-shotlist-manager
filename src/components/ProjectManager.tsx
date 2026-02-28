import React from 'react';
import { useProject } from '../context/ProjectContext';
import { ProjectControls } from './ProjectControls';
import { VideoComponent } from './VideoComponent';

export const ProjectManager: React.FC = () => {
  const { state } = useProject();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Story Shotlist Manager</h1>
        <p className="text-slate-600">Manage your video projects with hierarchical scene organization</p>
      </div>

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
  );
};