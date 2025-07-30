import type { ProjectState, ProjectAction } from './types';

export const projectReducer = (state: ProjectState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case 'LOAD_PROJECT':
      return { project: action.payload };
    
    case 'UPDATE_VIDEO': {
      if (!state.project) return state;
      return {
        project: {
          video: { ...state.project.video, ...action.payload }
        }
      };
    }
    
    case 'ADD_CHAPTER': {
      if (!state.project) return state;
      return {
        project: {
          video: {
            ...state.project.video,
            chapters: [...state.project.video.chapters, action.payload]
          }
        }
      };
    }
    
    case 'UPDATE_CHAPTER': {
      if (!state.project) return state;
      const updatedChapters = [...state.project.video.chapters];
      updatedChapters[action.payload.index] = { ...updatedChapters[action.payload.index], ...action.payload.chapter };
      return {
        project: {
          video: {
            ...state.project.video,
            chapters: updatedChapters
          }
        }
      };
    }
    
    case 'DELETE_CHAPTER': {
      if (!state.project) return state;
      return {
        project: {
          video: {
            ...state.project.video,
            chapters: state.project.video.chapters.filter((_, index) => index !== action.payload)
          }
        }
      };
    }
    
    case 'ADD_SCENE': {
      if (!state.project) return state;
      const chaptersWithNewScene = [...state.project.video.chapters];
      chaptersWithNewScene[action.payload.chapterIndex] = {
        ...chaptersWithNewScene[action.payload.chapterIndex],
        scenes: [...chaptersWithNewScene[action.payload.chapterIndex].scenes, action.payload.scene]
      };
      return {
        project: {
          video: {
            ...state.project.video,
            chapters: chaptersWithNewScene
          }
        }
      };
    }
    
    case 'UPDATE_SCENE': {
      if (!state.project) return state;
      const chaptersWithUpdatedScene = [...state.project.video.chapters];
      const updatedScenes = [...chaptersWithUpdatedScene[action.payload.chapterIndex].scenes];
      updatedScenes[action.payload.sceneIndex] = { ...updatedScenes[action.payload.sceneIndex], ...action.payload.scene };
      chaptersWithUpdatedScene[action.payload.chapterIndex] = {
        ...chaptersWithUpdatedScene[action.payload.chapterIndex],
        scenes: updatedScenes
      };
      return {
        project: {
          video: {
            ...state.project.video,
            chapters: chaptersWithUpdatedScene
          }
        }
      };
    }
    
    case 'DELETE_SCENE': {
      if (!state.project) return state;
      const chaptersWithDeletedScene = [...state.project.video.chapters];
      chaptersWithDeletedScene[action.payload.chapterIndex] = {
        ...chaptersWithDeletedScene[action.payload.chapterIndex],
        scenes: chaptersWithDeletedScene[action.payload.chapterIndex].scenes.filter((_, index) => index !== action.payload.sceneIndex)
      };
      return {
        project: {
          video: {
            ...state.project.video,
            chapters: chaptersWithDeletedScene
          }
        }
      };
    }
    
    case 'ADD_PROMPT': {
      if (!state.project) return state;
      const chaptersWithNewPrompt = [...state.project.video.chapters];
      const scenesWithNewPrompt = [...chaptersWithNewPrompt[action.payload.chapterIndex].scenes];
      scenesWithNewPrompt[action.payload.sceneIndex] = {
        ...scenesWithNewPrompt[action.payload.sceneIndex],
        prompts: [...scenesWithNewPrompt[action.payload.sceneIndex].prompts, action.payload.prompt]
      };
      chaptersWithNewPrompt[action.payload.chapterIndex] = {
        ...chaptersWithNewPrompt[action.payload.chapterIndex],
        scenes: scenesWithNewPrompt
      };
      return {
        project: {
          video: {
            ...state.project.video,
            chapters: chaptersWithNewPrompt
          }
        }
      };
    }
    
    case 'UPDATE_PROMPT': {
      if (!state.project) return state;
      const chaptersWithUpdatedPrompt = [...state.project.video.chapters];
      const scenesWithUpdatedPrompt = [...chaptersWithUpdatedPrompt[action.payload.chapterIndex].scenes];
      const updatedPrompts = [...scenesWithUpdatedPrompt[action.payload.sceneIndex].prompts];
      updatedPrompts[action.payload.promptIndex] = { ...updatedPrompts[action.payload.promptIndex], ...action.payload.prompt };
      scenesWithUpdatedPrompt[action.payload.sceneIndex] = {
        ...scenesWithUpdatedPrompt[action.payload.sceneIndex],
        prompts: updatedPrompts
      };
      chaptersWithUpdatedPrompt[action.payload.chapterIndex] = {
        ...chaptersWithUpdatedPrompt[action.payload.chapterIndex],
        scenes: scenesWithUpdatedPrompt
      };
      return {
        project: {
          video: {
            ...state.project.video,
            chapters: chaptersWithUpdatedPrompt
          }
        }
      };
    }
    
    case 'DELETE_PROMPT': {
      if (!state.project) return state;
      const chaptersWithDeletedPrompt = [...state.project.video.chapters];
      const scenesWithDeletedPrompt = [...chaptersWithDeletedPrompt[action.payload.chapterIndex].scenes];
      scenesWithDeletedPrompt[action.payload.sceneIndex] = {
        ...scenesWithDeletedPrompt[action.payload.sceneIndex],
        prompts: scenesWithDeletedPrompt[action.payload.sceneIndex].prompts.filter((_, index) => index !== action.payload.promptIndex)
      };
      chaptersWithDeletedPrompt[action.payload.chapterIndex] = {
        ...chaptersWithDeletedPrompt[action.payload.chapterIndex],
        scenes: scenesWithDeletedPrompt
      };
      return {
        project: {
          video: {
            ...state.project.video,
            chapters: chaptersWithDeletedPrompt
          }
        }
      };
    }
    
    default:
      return state;
  }
};