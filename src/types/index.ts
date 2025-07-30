export interface ImageData {
  path: string;
  approved: boolean;
}

export interface Prompt {
  prompt_text: string;
  image_size?: string;
  aspect_ratio?: string;
  seed?: number;
  approval_status?: number;
  file_name: string;
  created_at?: string;
  image?: ImageData;
}

export interface Scene {
  scene_number: number;
  scene_description: string;
  style?: string;
  prompts: Prompt[];
}

export interface Chapter {
  chapter_title: string;
  chapter_file_name: string;
  style?: string;
  scenes: Scene[];
}

export interface Video {
  title: string;
  description?: string;
  style?: string;
  default_image_size?: string;
  transcriptions?: {
    storyboard?: string;
    narrative?: string;
  };
  chapters: Chapter[];
}

export interface Project {
  video: Video;
}

export interface CSVRow {
  a: number;
  category: string;
  filename: string;
  prompt: string;
  style?: string;
  size?: string;
  seed?: number;
  n?: number;
}