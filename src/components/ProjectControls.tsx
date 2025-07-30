import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { downloadJSON, downloadCSV, copyJSONToClipboard, parseJSONProject } from '../utils/exportUtils';

export const ProjectControls: React.FC = () => {
  const { state, loadProject, loadSampleProject } = useProject();
  const [jsonInput, setJsonInput] = useState('');
  const [showJsonInput, setShowJsonInput] = useState(false);
  const [message, setMessage] = useState('');

  const handleLoadSample = () => {
    loadSampleProject();
    setMessage('Sample project loaded successfully!');
    setTimeout(() => setMessage(''), 3000);
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

  const handleDownloadJSON = () => {
    if (!state.project) {
      setMessage('No project to export');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    downloadJSON(state.project, `${state.project.video.title.toLowerCase().replace(/\s+/g, '-')}.json`);
    setMessage('JSON downloaded successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCopyJSON = async () => {
    if (!state.project) {
      setMessage('No project to copy');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    try {
      await copyJSONToClipboard(state.project);
      setMessage('JSON copied to clipboard!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Failed to copy to clipboard');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDownloadCSV = () => {
    if (!state.project) {
      setMessage('No project to export');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    downloadCSV(state.project, `${state.project.video.title.toLowerCase().replace(/\s+/g, '-')}-prompts.csv`);
    setMessage('CSV downloaded successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <button
          onClick={handleLoadSample}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <span className="mr-2">🎬</span>
          Load Sample
        </button>
        
        <button
          onClick={() => setShowJsonInput(!showJsonInput)}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <span className="mr-2">{showJsonInput ? '📝' : '📋'}</span>
          {showJsonInput ? 'Hide JSON' : 'Paste JSON'}
        </button>

        {state.project && (
          <>
            <button
              onClick={handleDownloadJSON}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="mr-2">💾</span>
              Download JSON
            </button>
            
            <button
              onClick={handleCopyJSON}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="mr-2">📋</span>
              Copy JSON
            </button>
            
            <button
              onClick={handleDownloadCSV}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="mr-2">📊</span>
              Export CSV
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
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
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