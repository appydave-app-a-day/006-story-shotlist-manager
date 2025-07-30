import React, { useReducer } from 'react';
import type { ReactNode } from 'react';
import type { ProjectContextType, ProjectState } from './types';
import type { Project, Video, Chapter, Scene, Prompt } from '../types';
import { ProjectContext } from './ProjectContext';
import { projectReducer } from './reducer';
import { getSampleProject } from '../utils/sampleData';

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, { project: null } as ProjectState);

  const loadProject = (project: Project) => {
    dispatch({ type: 'LOAD_PROJECT', payload: project });
  };

  const loadSampleProject = () => {
    const sampleProject = getSampleProject();
    dispatch({ type: 'LOAD_PROJECT', payload: sampleProject });
  };

  const updateVideo = (updates: Partial<Video>) => {
    dispatch({ type: 'UPDATE_VIDEO', payload: updates });
  };

  const addChapter = (chapter: Chapter) => {
    dispatch({ type: 'ADD_CHAPTER', payload: chapter });
  };

  const updateChapter = (index: number, updates: Partial<Chapter>) => {
    dispatch({ type: 'UPDATE_CHAPTER', payload: { index, chapter: updates } });
  };

  const deleteChapter = (index: number) => {
    dispatch({ type: 'DELETE_CHAPTER', payload: index });
  };

  const addScene = (chapterIndex: number, scene: Scene) => {
    dispatch({ type: 'ADD_SCENE', payload: { chapterIndex, scene } });
  };

  const updateScene = (chapterIndex: number, sceneIndex: number, updates: Partial<Scene>) => {
    dispatch({ type: 'UPDATE_SCENE', payload: { chapterIndex, sceneIndex, scene: updates } });
  };

  const deleteScene = (chapterIndex: number, sceneIndex: number) => {
    dispatch({ type: 'DELETE_SCENE', payload: { chapterIndex, sceneIndex } });
  };

  const addPrompt = (chapterIndex: number, sceneIndex: number, prompt: Prompt) => {
    dispatch({ type: 'ADD_PROMPT', payload: { chapterIndex, sceneIndex, prompt } });
  };

  const updatePrompt = (chapterIndex: number, sceneIndex: number, promptIndex: number, updates: Partial<Prompt>) => {
    dispatch({ type: 'UPDATE_PROMPT', payload: { chapterIndex, sceneIndex, promptIndex, prompt: updates } });
  };

  const deletePrompt = (chapterIndex: number, sceneIndex: number, promptIndex: number) => {
    dispatch({ type: 'DELETE_PROMPT', payload: { chapterIndex, sceneIndex, promptIndex } });
  };

  const contextValue: ProjectContextType = {
    state,
    dispatch,
    loadProject,
    loadSampleProject,
    updateVideo,
    addChapter,
    updateChapter,
    deleteChapter,
    addScene,
    updateScene,
    deleteScene,
    addPrompt,
    updatePrompt,
    deletePrompt
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};