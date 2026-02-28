import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import type { Project } from '../types';

// Aspect ratio to size mapping
const ASPECT_RATIOS = {
  '1:1': { width: 1024, height: 1024, label: '1:1 (Square)' },
  '16:9': { width: 1920, height: 1080, label: '16:9 (Landscape)' },
  '9:16': { width: 1080, height: 1920, label: '9:16 (Portrait)' },
  '3:2': { width: 1536, height: 1024, label: '3:2 (Photo)' },
  '4:3': { width: 1440, height: 1080, label: '4:3 (Classic)' }
};

interface SimplifiedJSON {
  video: {
    title: string;
    chapters: Array<{
      chapter_title: string;
      scenes: Array<{
        scene_description: string;
        prompts: Array<{
          prompt_text: string;
        }>;
      }>;
    }>;
  };
}

export const JSONBuilder: React.FC = () => {
  const { loadProject } = useProject();
  const [rawJSON, setRawJSON] = useState('');
  const [message, setMessage] = useState('');
  
  // Form fields
  const [videoStyle, setVideoStyle] = useState('');
  const [description, setDescription] = useState('');
  const [storyboard, setStoryboard] = useState('');
  const [narrative, setNarrative] = useState('');
  const [aspectRatio, setAspectRatio] = useState<keyof typeof ASPECT_RATIOS>('1:1');

  const getCurrentImageSize = () => {
    const ratio = ASPECT_RATIOS[aspectRatio];
    return `${ratio.width}x${ratio.height}`;
  };

  const handleAspectRatioChange = (newRatio: keyof typeof ASPECT_RATIOS) => {
    setAspectRatio(newRatio);
  };

  const generateFileName = (chapterIndex: number, sceneIndex: number, promptIndex: number, promptText: string) => {
    // Create a short slug from prompt text
    const slug = promptText
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 30)
      .replace(/-+$/, '');
    
    return `${chapterIndex + 1}-${sceneIndex + 1}-${promptIndex + 1}-${slug}`;
  };

  const generateChapterFileName = (index: number, title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    return `${index + 1}-${slug}`;
  };

  const processJSON = () => {
    try {
      // First, validate that it's valid JSON
      let parsed: any;
      try {
        parsed = JSON.parse(rawJSON);
      } catch (jsonError) {
        throw new Error(`Invalid JSON syntax: ${jsonError instanceof Error ? jsonError.message : 'Parse error'}`);
      }

      // Validate the structure
      if (!parsed.video) {
        throw new Error('Missing "video" property in JSON');
      }
      if (!parsed.video.title) {
        throw new Error('Missing "video.title" property in JSON');
      }
      if (!Array.isArray(parsed.video.chapters)) {
        throw new Error('Missing or invalid "video.chapters" array in JSON');
      }

      const typedParsed: SimplifiedJSON = parsed;
      const currentDate = new Date().toISOString().split('T')[0];
      const imageSize = getCurrentImageSize();
      
      // Build the complete project structure
      const completeProject: Project = {
        video: {
          title: typedParsed.video.title,
          description: description || `A visual storytelling project: ${typedParsed.video.title}`,
          style: videoStyle || 'Cinematic',
          default_image_size: imageSize,
          transcriptions: {
            storyboard: storyboard || `Storyboard notes for ${typedParsed.video.title}`,
            narrative: narrative || `Narrative overview for ${typedParsed.video.title}`
          },
          chapters: typedParsed.video.chapters.map((chapter, chapterIndex) => ({
            chapter_title: chapter.chapter_title,
            chapter_file_name: generateChapterFileName(chapterIndex, chapter.chapter_title),
            style: videoStyle || 'Cinematic', // Cascade from video style
            scenes: chapter.scenes.map((scene, sceneIndex) => ({
              scene_number: sceneIndex + 1,
              scene_description: scene.scene_description,
              style: videoStyle || 'Cinematic', // Cascade from video style
              prompts: scene.prompts.map((prompt, promptIndex) => ({
                prompt_text: prompt.prompt_text,
                image_size: imageSize,
                aspect_ratio: aspectRatio,
                approval_status: 1,
                file_name: generateFileName(chapterIndex, sceneIndex, promptIndex, prompt.prompt_text),
                created_at: currentDate
                // Note: seed is intentionally omitted, image is optional
              }))
            }))
          }))
        }
      };

      // Load the project
      loadProject(completeProject);
      setMessage('✅ JSON processed and project loaded successfully!');
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      console.error('JSON processing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setMessage(`❌ Error processing JSON: ${errorMessage}`);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">JSON Builder</h1>
        <p className="text-slate-600">Import ChatGPT-generated JSON and enhance it with metadata</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - JSON Input */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="mr-2">📝</span>
              Raw JSON Input
            </h2>
            <textarea
              value={rawJSON}
              onChange={(e) => setRawJSON(e.target.value)}
              placeholder="Paste your ChatGPT-generated JSON here..."
              className="w-full h-96 p-4 border-2 border-slate-200 rounded-xl resize-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 font-mono text-sm bg-slate-50"
            />
          </div>
        </div>

        {/* Right Column - Settings Form */}
        <div className="space-y-6">
          {/* Project Settings */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="mr-2">🎨</span>
              Project Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Video Style (cascades to chapters)
                </label>
                <input
                  type="text"
                  value={videoStyle}
                  onChange={(e) => setVideoStyle(e.target.value)}
                  placeholder="e.g., Cinematic, Painterly, Sci-Fi Realism..."
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your video project..."
                  className="w-full h-20 p-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Storyboard Notes
                </label>
                <textarea
                  value={storyboard}
                  onChange={(e) => setStoryboard(e.target.value)}
                  placeholder="Storyboard and visual planning notes..."
                  className="w-full h-20 p-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Narrative Summary
                </label>
                <textarea
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  placeholder="Overall narrative and story summary..."
                  className="w-full h-20 p-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Generation Defaults */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="mr-2">⚙️</span>
              Generation Defaults
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Prompt Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => handleAspectRatioChange(e.target.value as keyof typeof ASPECT_RATIOS)}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                >
                  {Object.entries(ASPECT_RATIOS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Prompt Image Size (auto-calculated)
                </label>
                <input
                  type="text"
                  value={getCurrentImageSize()}
                  readOnly
                  className="w-full p-3 border-2 border-slate-200 rounded-xl bg-slate-100 text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Process Button */}
          <button
            onClick={processJSON}
            disabled={!rawJSON.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
          >
            <span className="mr-2">🚀</span>
            Process JSON & Load Project
          </button>

          {message && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-xl shadow-sm">
              <div className="flex items-center">
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};