import type { Project } from '../types';

export const getSampleProject = (): Project => ({
  video: {
    title: "A Day in the Life of a Woman and Her Cat",
    description: "A glimpse into the daily adventures of a woman and her cat.",
    style: "Soft Pastel Aesthetic",
    default_image_size: "1920x1080",
    transcriptions: {
      storyboard: "Morning scenes of a woman and her cat",
      narrative: "A peaceful morning routine shared between a woman and her beloved cat"
    },
    chapters: [
      {
        chapter_title: "Morning Routine",
        chapter_file_name: "1-morning-routine",
        style: "Golden Morning Light",
        scenes: [
          {
            scene_number: 1,
            scene_description: "The woman wakes up to her cat snuggling next to her.",
            style: "Warm and Cozy",
            prompts: [
              {
                prompt_text: "A soft morning scene with a woman and her cat snuggling in bed, golden sunlight streaming through the window, peaceful and warm atmosphere",
                image_size: "1024x1024",
                aspect_ratio: "1:1",
                seed: 12345,
                approval_status: 1,
                file_name: "1-1-1-wake-up-snuggle",
                created_at: "2025-07-30",
                image_a: {
                  path: "output/1-1-1-wake-up-snuggle.png",
                  approved: true
                },
                image_b: {
                  path: "output/1-1-1-wake-up-snuggle-b.png",
                  approved: false
                }
              }
            ]
          },
          {
            scene_number: 2,
            scene_description: "Breakfast chaos as the cat tries to steal food.",
            style: "Bright and Playful",
            prompts: [
              {
                prompt_text: "A playful kitchen scene with a woman preparing breakfast while her mischievous cat tries to steal food from the counter",
                image_size: "1024x1024",
                aspect_ratio: "1:1",
                seed: 67890,
                approval_status: 1,
                file_name: "1-2-1-breakfast-chaos",
                created_at: "2025-07-30",
                image_a: {
                  path: "output/1-2-1-breakfast-chaos.png",
                  approved: false
                },
                image_b: {
                  path: "output/1-2-1-breakfast-chaos-b.png",
                  approved: true
                }
              }
            ]
          }
        ]
      },
      {
        chapter_title: "Afternoon Adventures",
        chapter_file_name: "2-afternoon-adventures",
        style: "Bright Daylight",
        scenes: [
          {
            scene_number: 1,
            scene_description: "Playing with cat toys in the living room.",
            style: "Energetic and Fun",
            prompts: [
              {
                prompt_text: "A lively living room scene with a woman playing with her cat using various toys, sunlight filling the space",
                image_size: "1024x1024",
                aspect_ratio: "1:1",
                seed: 11111,
                approval_status: 1,
                file_name: "2-1-1-toy-playtime",
                created_at: "2025-07-30"
              }
            ]
          }
        ]
      }
    ]
  }
});