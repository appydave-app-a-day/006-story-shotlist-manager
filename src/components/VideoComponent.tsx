import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { ChapterComponent } from './ChapterComponent';
import type { Chapter } from '../types';

export const VideoComponent: React.FC = () => {
  const { state, updateVideo, addChapter } = useProject();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');

  if (!state.project) return null;

  const { video } = state.project;

  const handleTitleEdit = () => {
    setTempTitle(video.title);
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    if (tempTitle.trim()) {
      updateVideo({ title: tempTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTempTitle('');
    setIsEditingTitle(false);
  };

  const handleAddChapter = () => {
    const newChapter: Chapter = {
      chapter_title: `Chapter ${video.chapters.length + 1}`,
      chapter_file_name: `${video.chapters.length + 1}-new-chapter`,
      style: video.style || '',
      scenes: []
    };
    addChapter(newChapter);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
            📽️
          </div>
          
          {isEditingTitle ? (
            <div className="flex items-center gap-3 flex-1">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="text-3xl font-bold bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border-2 border-white/50 focus:border-white focus:ring-4 focus:ring-white/25 text-slate-800 flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSave();
                  if (e.key === 'Escape') handleTitleCancel();
                }}
                autoFocus
              />
              <button
                onClick={handleTitleSave}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200"
              >
                ✅ Save
              </button>
              <button
                onClick={handleTitleCancel}
                className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200"
              >
                ❌ Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 flex-1">
              <h1 
                onClick={handleTitleEdit}
                className="text-3xl font-bold text-white cursor-pointer hover:text-blue-100 transition-colors flex-1"
                title="Click to edit title"
              >
                {video.title}
              </h1>
              <button
                onClick={handleTitleEdit}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200"
              >
                ✏️ Edit
              </button>
            </div>
          )}
        </div>

        {video.description && (
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
            <p className="text-white text-lg leading-relaxed">
              {video.description}
            </p>
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {video.style && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 px-4 py-2 rounded-xl">
              <span className="text-blue-700 font-semibold text-sm">🎨 Style:</span>
              <span className="text-blue-800 ml-2">{video.style}</span>
            </div>
          )}
          {video.default_image_size && (
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 px-4 py-2 rounded-xl">
              <span className="text-purple-700 font-semibold text-sm">📐 Size:</span>
              <span className="text-purple-800 ml-2">{video.default_image_size}</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {video.chapters.map((chapter, index) => (
            <ChapterComponent
              key={index}
              chapter={chapter}
              chapterIndex={index}
            />
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={handleAddChapter}
            className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-3"
          >
            <span className="text-xl">➕</span>
            <span>Add New Chapter</span>
          </button>
        </div>
      </div>
    </div>
  );
};