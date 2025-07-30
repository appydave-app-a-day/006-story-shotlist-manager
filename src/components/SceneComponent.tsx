import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { PromptComponent } from './PromptComponent';
import type { Scene, Prompt } from '../types';

interface SceneComponentProps {
  scene: Scene;
  chapterIndex: number;
  sceneIndex: number;
}

export const SceneComponent: React.FC<SceneComponentProps> = ({ scene, chapterIndex, sceneIndex }) => {
  const { updateScene, deleteScene, addPrompt } = useProject();
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [tempDescription, setTempDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleDescriptionEdit = () => {
    setTempDescription(scene.scene_description);
    setIsEditingDescription(true);
  };

  const handleDescriptionSave = () => {
    if (tempDescription.trim()) {
      updateScene(chapterIndex, sceneIndex, { scene_description: tempDescription.trim() });
    }
    setIsEditingDescription(false);
  };

  const handleDescriptionCancel = () => {
    setTempDescription('');
    setIsEditingDescription(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete Scene ${scene.scene_number}?`)) {
      deleteScene(chapterIndex, sceneIndex);
    }
  };

  const handleAddPrompt = () => {
    const newPrompt: Prompt = {
      prompt_text: 'New prompt description...',
      image_size: '1024x1024',
      aspect_ratio: '1:1',
      approval_status: 1,
      file_name: `${chapterIndex + 1}-${sceneIndex + 1}-${scene.prompts.length + 1}-new-prompt`,
      created_at: new Date().toISOString().split('T')[0]
    };
    addPrompt(chapterIndex, sceneIndex, newPrompt);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden ml-4">
      <div className="bg-gradient-to-r from-amber-400 to-yellow-400 p-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
          >
            {isExpanded ? '▼' : '▶'}
          </button>
          
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-xl">
            🎬
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
            <span className="text-white font-bold text-sm">Scene {scene.scene_number}</span>
          </div>
          
          {isEditingDescription ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                className="text-base font-medium bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border-2 border-white/50 focus:border-white focus:ring-4 focus:ring-white/25 text-slate-800 flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleDescriptionSave();
                  if (e.key === 'Escape') handleDescriptionCancel();
                }}
                autoFocus
              />
              <button
                onClick={handleDescriptionSave}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200"
              >
                ✅
              </button>
              <button
                onClick={handleDescriptionCancel}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200"
              >
                ❌
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 flex-1">
              <span 
                onClick={handleDescriptionEdit}
                className="text-base font-medium text-white cursor-pointer hover:text-yellow-100 transition-colors flex-1"
                title="Click to edit scene description"
              >
                {scene.scene_description}
              </span>
              
              <div className="flex gap-2">
                <button
                  onClick={handleDescriptionEdit}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-200"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500/80 hover:bg-red-600 backdrop-blur-sm text-white px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-200"
                >
                  🗑️
                </button>
              </div>
            </div>
          )}
        </div>

        {scene.style && (
          <div className="mt-3">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-lg inline-block">
              <span className="text-white font-semibold text-sm">🎨 {scene.style}</span>
            </div>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="p-5 space-y-4">
          {scene.prompts.map((prompt, promptIndex) => (
            <PromptComponent
              key={promptIndex}
              prompt={prompt}
              chapterIndex={chapterIndex}
              sceneIndex={sceneIndex}
              promptIndex={promptIndex}
            />
          ))}
          
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={handleAddPrompt}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span className="text-lg">➕</span>
              <span>Add Prompt</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};