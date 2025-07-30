import type { Project, CSVRow } from '../types';

export const exportAsJSON = (project: Project): string => {
  return JSON.stringify(project, null, 2);
};

export const downloadJSON = (project: Project, filename: string = 'project.json'): void => {
  const dataStr = exportAsJSON(project);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = filename;
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const copyJSONToClipboard = async (project: Project): Promise<void> => {
  const jsonStr = exportAsJSON(project);
  await navigator.clipboard.writeText(jsonStr);
};

export const convertToCSV = (project: Project): CSVRow[] => {
  const csvRows: CSVRow[] = [];
  
  project.video.chapters.forEach((chapter) => {
    chapter.scenes.forEach((scene) => {
      scene.prompts.forEach((prompt) => {
        const row: CSVRow = {
          a: prompt.approval_status || 1,
          category: chapter.chapter_file_name,
          filename: prompt.file_name,
          prompt: prompt.prompt_text,
          style: prompt.image_size === '1024x1024' ? 'vivid' : 'natural',
          size: prompt.image_size,
          seed: prompt.seed,
          n: 1
        };
        csvRows.push(row);
      });
    });
  });
  
  return csvRows;
};

export const exportAsCSV = (project: Project): string => {
  const csvRows = convertToCSV(project);
  const headers = ['a', 'category', 'filename', 'prompt', 'style', 'size', 'seed', 'n'];
  
  const csvContent = [
    headers.join(','),
    ...csvRows.map(row => [
      row.a,
      row.category,
      row.filename,
      `"${row.prompt.replace(/"/g, '""')}"`, // Escape quotes in CSV
      row.style || '',
      row.size || '',
      row.seed || '',
      row.n || 1
    ].join(','))
  ].join('\n');
  
  return csvContent;
};

export const downloadCSV = (project: Project, filename: string = 'prompts.csv'): void => {
  const csvContent = exportAsCSV(project);
  const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', filename);
  linkElement.click();
};

export const parseJSONProject = (jsonString: string): Project | null => {
  try {
    const parsed = JSON.parse(jsonString);
    
    // Basic validation
    if (!parsed.video || !parsed.video.title || !Array.isArray(parsed.video.chapters)) {
      throw new Error('Invalid project structure');
    }
    
    return parsed as Project;
  } catch (error) {
    console.error('Failed to parse JSON project:', error);
    return null;
  }
};