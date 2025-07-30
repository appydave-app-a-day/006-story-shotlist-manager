import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import type { Prompt, ImageData } from '../types';

interface PromptComponentProps {
  prompt: Prompt;
  chapterIndex: number;
  sceneIndex: number;
  promptIndex: number;
}

export const PromptComponent: React.FC<PromptComponentProps> = ({ 
  prompt, 
  chapterIndex, 
  sceneIndex, 
  promptIndex 
}) => {
  const { updatePrompt, deletePrompt } = useProject();
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [tempPromptText, setTempPromptText] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handlePromptEdit = () => {
    setTempPromptText(prompt.prompt_text);
    setIsEditingPrompt(true);
  };

  const handlePromptSave = () => {
    if (tempPromptText.trim()) {
      updatePrompt(chapterIndex, sceneIndex, promptIndex, { prompt_text: tempPromptText.trim() });
    }
    setIsEditingPrompt(false);
  };

  const handlePromptCancel = () => {
    setTempPromptText('');
    setIsEditingPrompt(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      deletePrompt(chapterIndex, sceneIndex, promptIndex);
    }
  };

  const handleImageUpload = (imageType: 'image_a' | 'image_b', file: File) => {
    // In a real app, you'd upload to a server here
    // For now, we'll just create a mock path
    const imagePath = `uploads/${file.name}`;
    const imageData: ImageData = {
      path: imagePath,
      approved: false
    };
    
    updatePrompt(chapterIndex, sceneIndex, promptIndex, { [imageType]: imageData });
  };

  const handleImageApproval = (imageType: 'image_a' | 'image_b', approved: boolean) => {
    const currentImage = prompt[imageType];
    if (currentImage) {
      const updatedImage: ImageData = { ...currentImage, approved };
      updatePrompt(chapterIndex, sceneIndex, promptIndex, { [imageType]: updatedImage });
    }
  };

  const handleImageRemove = (imageType: 'image_a' | 'image_b') => {
    updatePrompt(chapterIndex, sceneIndex, promptIndex, { [imageType]: undefined });
  };

  const renderImageSection = (imageType: 'image_a' | 'image_b', label: string) => {
    const image = prompt[imageType];
    
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              {imageType === 'image_a' ? 'A' : 'B'}
            </div>
            <span className="font-semibold text-slate-700">{label}</span>
          </div>
          {image && (
            <div className="flex gap-2">
              <button
                onClick={() => handleImageApproval(imageType, !image.approved)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  image.approved 
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg' 
                    : 'bg-gradient-to-r from-slate-300 to-slate-400 hover:from-slate-400 hover:to-slate-500 text-slate-700'
                }`}
              >
                {image.approved ? '✅ Approved' : '⏳ Approve'}
              </button>
              <button
                onClick={() => handleImageRemove(imageType)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg transition-all duration-200"
              >
                🗑️ Remove
              </button>
            </div>
          )}
        </div>
        
        {image ? (
          <div className="space-y-3">
            <div className="bg-white border border-slate-200 p-3 rounded-lg">
              <div className="text-xs text-slate-500 mb-1">File Path:</div>
              <div className="text-sm font-mono text-slate-700 break-all">
                {image.path}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${image.approved ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              <span className={`text-xs font-semibold ${image.approved ? 'text-emerald-700' : 'text-amber-700'}`}>
                {image.approved ? 'Approved for use' : 'Pending approval'}
              </span>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors duration-200">
            <div className="text-slate-400 mb-3">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImageUpload(imageType, file);
                }
              }}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-rose-500 file:text-white file:font-semibold hover:file:from-pink-600 hover:file:to-rose-600 file:shadow-lg file:transition-all file:duration-200"
            />
            <p className="text-xs text-slate-500 mt-2">Upload an image for this variant</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden ml-4">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-5">
        <div className="flex items-start gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 mt-1"
          >
            {isExpanded ? '▼' : '▶'}
          </button>
          
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-xl mt-1">
            🖼️
          </div>
          
          <div className="flex-1">
            {isEditingPrompt ? (
              <div className="space-y-3">
                <textarea
                  value={tempPromptText}
                  onChange={(e) => setTempPromptText(e.target.value)}
                  className="w-full h-24 p-4 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-xl focus:border-white focus:ring-4 focus:ring-white/25 text-slate-800 resize-none font-medium"
                  placeholder="Enter your image generation prompt..."
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') handlePromptCancel();
                  }}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handlePromptSave}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200"
                  >
                    ✅ Save
                  </button>
                  <button
                    onClick={handlePromptCancel}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onClick={handlePromptEdit}
                className="cursor-pointer hover:bg-white/10 p-3 rounded-xl transition-all duration-200 backdrop-blur-sm"
                title="Click to edit prompt"
              >
                <p className="text-white leading-relaxed font-medium">
                  {prompt.prompt_text}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePromptEdit}
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

        <div className="flex flex-wrap gap-2 mt-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-lg">
            <span className="text-white font-semibold text-xs">📁 {prompt.file_name}</span>
          </div>
          {prompt.image_size && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-lg">
              <span className="text-white font-semibold text-xs">📐 {prompt.image_size}</span>
            </div>
          )}
          {prompt.seed && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-lg">
              <span className="text-white font-semibold text-xs">🌱 Seed: {prompt.seed}</span>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderImageSection('image_a', 'Image A')}
            {renderImageSection('image_b', 'Image B')}
          </div>
        </div>
      )}
    </div>
  );
};