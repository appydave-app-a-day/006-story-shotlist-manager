import type { Project, Video, Chapter, Scene, Prompt } from '../types';

export interface ProjectState {
  project: Project | null;
}

export type ProjectAction =
  | { type: 'LOAD_PROJECT'; payload: Project }
  | { type: 'UPDATE_VIDEO'; payload: Partial<Video> }
  | { type: 'ADD_CHAPTER'; payload: Chapter }
  | { type: 'UPDATE_CHAPTER'; payload: { index: number; chapter: Partial<Chapter> } }
  | { type: 'DELETE_CHAPTER'; payload: number }
  | { type: 'ADD_SCENE'; payload: { chapterIndex: number; scene: Scene } }
  | { type: 'UPDATE_SCENE'; payload: { chapterIndex: number; sceneIndex: number; scene: Partial<Scene> } }
  | { type: 'DELETE_SCENE'; payload: { chapterIndex: number; sceneIndex: number } }
  | { type: 'ADD_PROMPT'; payload: { chapterIndex: number; sceneIndex: number; prompt: Prompt } }
  | { type: 'UPDATE_PROMPT'; payload: { chapterIndex: number; sceneIndex: number; promptIndex: number; prompt: Partial<Prompt> } }
  | { type: 'DELETE_PROMPT'; payload: { chapterIndex: number; sceneIndex: number; promptIndex: number } };

export interface ProjectContextType {
  state: ProjectState;
  dispatch: React.Dispatch<ProjectAction>;
  loadProject: (project: Project) => void;
  loadSampleProject: () => void;
  updateVideo: (updates: Partial<Video>) => void;
  addChapter: (chapter: Chapter) => void;
  updateChapter: (index: number, updates: Partial<Chapter>) => void;
  deleteChapter: (index: number) => void;
  addScene: (chapterIndex: number, scene: Scene) => void;
  updateScene: (chapterIndex: number, sceneIndex: number, updates: Partial<Scene>) => void;
  deleteScene: (chapterIndex: number, sceneIndex: number) => void;
  addPrompt: (chapterIndex: number, sceneIndex: number, prompt: Prompt) => void;
  updatePrompt: (chapterIndex: number, sceneIndex: number, promptIndex: number, updates: Partial<Prompt>) => void;
  deletePrompt: (chapterIndex: number, sceneIndex: number, promptIndex: number) => void;
}