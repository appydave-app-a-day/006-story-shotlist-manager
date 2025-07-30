import type { Project } from '../types';

// Sample data file definitions
export interface SampleFile {
  key: string;
  title: string;
  filename: string;
}

// Dynamically discover all sample files using Vite's import.meta.glob
const sampleModules = import.meta.glob('../data/*.json', { eager: true });

// Generate SAMPLE_FILES array from discovered files
export const SAMPLE_FILES: SampleFile[] = Object.keys(sampleModules).map(path => {
  // Extract filename without path and extension: ../data/woman-and-cat.json -> woman-and-cat
  const filename = path.split('/').pop()!;
  const key = filename.replace('.json', '');
  
  // Convert kebab-case to Title Case: woman-and-cat -> Woman And Cat
  const title = key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    key,
    title,
    filename
  };
}).sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title

// Dynamically import and load a sample project
export const loadSampleProject = async (key: string): Promise<Project | null> => {
  try {
    // Find the matching module from our pre-loaded modules
    const modulePath = `../data/${key}.json`;
    const module = sampleModules[modulePath] as { default: Project };
    
    if (!module) {
      throw new Error(`Sample file not found: ${key}.json`);
    }
    
    return module.default;
  } catch (error) {
    console.error(`Failed to load sample project "${key}":`, error);
    return null;
  }
};

// Load the default sample (backward compatibility)
export const getSampleProject = async (): Promise<Project | null> => {
  // Use the first available sample file, or fallback to woman-and-cat
  const defaultKey = SAMPLE_FILES.length > 0 
    ? SAMPLE_FILES.find(f => f.key === 'woman-and-cat')?.key || SAMPLE_FILES[0].key
    : 'woman-and-cat';
  
  return loadSampleProject(defaultKey);
};

// Get a human-readable title for a sample key
export const getSampleTitle = (key: string): string => {
  const sample = SAMPLE_FILES.find(s => s.key === key);
  return sample?.title || key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};