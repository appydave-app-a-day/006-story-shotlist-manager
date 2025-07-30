import React, { useState, useEffect } from 'react';
import { useProject } from '../context/ProjectContext';
import { downloadJSON, downloadCSV, copyJSONToClipboard, parseJSONProject, exportAsCSV } from '../utils/exportUtils';

export const ProjectControls: React.FC = () => {
  const { state, loadProject, loadSampleProject } = useProject();
  const [jsonInput, setJsonInput] = useState('');
  const [showJsonInput, setShowJsonInput] = useState(false);
  const [message, setMessage] = useState('');
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  // Track Ctrl/Cmd key state for visual feedback
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        setIsCtrlPressed(false);
      }
    };

    // Also handle focus/blur to reset state when window loses focus
    const handleBlur = () => setIsCtrlPressed(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const handleLoadSample = () => {
    loadSampleProject();
    setMessage('Sample project loaded successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleJSONImport = (event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      // Ctrl/Cmd+click: File upload
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result as string;
            const project = parseJSONProject(content);
            if (project) {
              loadProject(project);
              setMessage('Project loaded from file!');
              setTimeout(() => setMessage(''), 3000);
            } else {
              setMessage('Invalid JSON file format.');
              setTimeout(() => setMessage(''), 3000);
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    } else {
      // Default: Show paste area
      setShowJsonInput(!showJsonInput);
    }
  };

  const handleLoadFromJson = () => {
    if (!jsonInput.trim()) {
      setMessage('Please paste JSON content first');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const project = parseJSONProject(jsonInput);
    if (project) {
      loadProject(project);
      setJsonInput('');
      setShowJsonInput(false);
      setMessage('Project loaded successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Invalid JSON format. Please check your input.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleJSONExport = async (event: React.MouseEvent) => {
    if (!state.project) {
      setMessage('No project to export');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const filename = `${state.project.video.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    
    if (event.ctrlKey || event.metaKey) {
      // Ctrl/Cmd+click: Download file
      downloadJSON(state.project, filename);
      setMessage('JSON file downloaded!');
    } else {
      // Default: Copy to clipboard
      try {
        await copyJSONToClipboard(state.project);
        setMessage('JSON copied to clipboard!');
      } catch {
        setMessage('Failed to copy to clipboard');
      }
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCSVExport = async (event: React.MouseEvent) => {
    if (!state.project) {
      setMessage('No project to export');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const filename = `${state.project.video.title.toLowerCase().replace(/\s+/g, '-')}-prompts.csv`;
    
    if (event.ctrlKey || event.metaKey) {
      // Ctrl/Cmd+click: Download file
      downloadCSV(state.project, filename);
      setMessage('CSV file downloaded!');
    } else {
      // Default: Copy to clipboard
      try {
        const csvContent = exportAsCSV(state.project);
        await navigator.clipboard.writeText(csvContent);
        setMessage('CSV copied to clipboard!');
      } catch {
        setMessage('Failed to copy to clipboard');
      }
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <button
          onClick={handleLoadSample}
          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <span className="mr-2">🎬</span>
          Load Sample
        </button>
        
        <button
          onClick={handleJSONImport}
          className={`bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 ${isCtrlPressed ? 'ring-4 ring-emerald-300' : ''}`}
        >
          <span className="mr-2">{isCtrlPressed ? '💾' : '📋'}</span>
          Load JSON
        </button>

        {state.project && (
          <>
            <button
              onClick={handleJSONExport}
              className={`bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 ${isCtrlPressed ? 'ring-4 ring-purple-300' : ''}`}
            >
              <span className="mr-2">{isCtrlPressed ? '💾' : '📋'}</span>
              Save JSON
            </button>
            
            <button
              onClick={handleCSVExport}
              className={`bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 ${isCtrlPressed ? 'ring-4 ring-orange-300' : ''}`}
            >
              <span className="mr-2">{isCtrlPressed ? '💾' : '📋'}</span>
              Save CSV
            </button>
          </>
        )}
      </div>

      {message && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-xl shadow-sm">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            {message}
          </div>
        </div>
      )}

      {showJsonInput && (
        <div className="space-y-4 border-t border-slate-200 pt-6">
          <div className="relative">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your JSON project data here..."
              className="w-full h-40 p-4 border-2 border-slate-200 rounded-xl resize-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 font-mono text-sm bg-slate-50"
            />
            <div className="absolute top-3 right-3 text-xs text-slate-400 bg-white px-2 py-1 rounded">
              JSON
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLoadFromJson}
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="mr-2">✨</span>
              Validate & Load
            </button>
            <button
              onClick={() => {
                setJsonInput('');
                setShowJsonInput(false);
              }}
              className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="mr-2">❌</span>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};