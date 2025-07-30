import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { SceneComponent } from './SceneComponent';
import type { Chapter, Scene } from '../types';

interface ChapterComponentProps {
  chapter: Chapter;
  chapterIndex: number;
}

export const ChapterComponent: React.FC<ChapterComponentProps> = ({ chapter, chapterIndex }) => {
  const { updateChapter, deleteChapter, addScene } = useProject();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleTitleEdit = () => {
    setTempTitle(chapter.chapter_title);
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    if (tempTitle.trim()) {
      const fileNameSlug = tempTitle.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      updateChapter(chapterIndex, { 
        chapter_title: tempTitle.trim(),
        chapter_file_name: `${chapterIndex + 1}-${fileNameSlug}`
      });
    }
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTempTitle('');
    setIsEditingTitle(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${chapter.chapter_title}"?`)) {
      deleteChapter(chapterIndex);
    }
  };

  const handleAddScene = () => {
    const newScene: Scene = {
      scene_number: chapter.scenes.length + 1,
      scene_description: `Scene ${chapter.scenes.length + 1}`,
      style: chapter.style || '',
      prompts: []
    };
    addScene(chapterIndex, newScene);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden ml-4">
      <div className="bg-gradient-to-r from-emerald-400 to-green-400 p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
          >
            {isExpanded ? '▼' : '▶'}
          </button>
          
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
            📚
          </div>
          
          {isEditingTitle ? (
            <div className="flex items-center gap-3 flex-1">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="text-xl font-bold bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border-2 border-white/50 focus:border-white focus:ring-4 focus:ring-white/25 text-slate-800 flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSave();
                  if (e.key === 'Escape') handleTitleCancel();
                }}
                autoFocus
              />
              <button
                onClick={handleTitleSave}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200"
              >
                ✅
              </button>
              <button
                onClick={handleTitleCancel}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200"
              >
                ❌
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1">
                <h2 
                  onClick={handleTitleEdit}
                  className="text-xl font-bold text-white cursor-pointer hover:text-green-100 transition-colors"
                  title="Click to edit chapter title"
                >
                  {chapter.chapter_title}
                </h2>
                <div className="text-green-100 text-sm font-medium mt-1">
                  📁 {chapter.chapter_file_name}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleTitleEdit}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-2 rounded-xl font-semibold text-sm transition-all duration-200"
                >
                  ✏️ Rename
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500/80 hover:bg-red-600 backdrop-blur-sm text-white px-3 py-2 rounded-xl font-semibold text-sm transition-all duration-200"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {chapter.style && (
          <div className="mt-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl inline-block">
              <span className="text-white font-semibold text-sm">🎨 {chapter.style}</span>
            </div>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="p-6 space-y-4">
          {chapter.scenes.map((scene, sceneIndex) => (
            <SceneComponent
              key={sceneIndex}
              scene={scene}
              chapterIndex={chapterIndex}
              sceneIndex={sceneIndex}
            />
          ))}
          
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={handleAddScene}
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span className="text-lg">➕</span>
              <span>Add Scene</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};