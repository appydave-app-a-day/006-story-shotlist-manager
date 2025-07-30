Here is your **fully corrected and expanded Requirements Specification Document**, now reflecting:

* The true data structure (Video → Chapters → Scenes → Prompts)
* A UI that respects and visually mirrors this nested hierarchy
* A persistent **Load Sample** button and **text area input** for custom JSON
* No prompt injection UI (still exported as CSV)

---

```markdown
# 📄 AI Image Asset Manager — Full Requirements Specification (Data-Accurate UI)

## 1. Purpose

This tool allows creators to visually manage AI image assets structured around **videos**, broken into **chapters**, **scenes (aka shot list)**, and **prompts per scene**. It supports:

- Import/export of structured project data as JSON.
- Export of flattened data as CSV for prompt injection (external tool).
- Manual assignment and comparison of A/B image versions.
- Support for pasting full projects via JSON input.

---

## 2. Core Concepts (Data Hierarchy)

| Level    | Description                                     |
|----------|-------------------------------------------------|
| Video    | Represents the full creative project or episode |
| Chapter  | A logical group of scenes (e.g. "Morning Routine") |
| Scene    | A visual shot or moment within a chapter        |
| Prompt   | An image generation request linked to a scene   |

---

## 3. Application Features

### 3.1 Top-Level Controls

- **Load Sample** button: Inserts a pre-built example JSON project.
- **Paste JSON** area (always visible or collapsible):
  - Allows pasting of custom JSON input.
  - Validates and hydrates the app state from this structure.
- **Download JSON**: Copy project to clipboard or save.
- **Export CSV**: Generate flattened prompt data for prompt injection.

---

## 4. User Interface Layout

### 4.1 Hierarchical Tree or Nested Cards View

Each project is displayed as a nested structure:

```

📽 Video: A Day in the Life of a Woman and Her Cat
└── 📚 Chapter: Morning Routine
├── 🎬 Scene 1: Waking Up
│   ├── 🖼️ Prompt 1A: \[prompt text...]
│   │       - Image A | Image B
│   └── 🖼️ Prompt 1B: \[prompt text...]
│           - Image A | Image B
└── 🎬 Scene 2: Breakfast Chaos
└── 🖼️ Prompt: ...

````

### 4.2 Per-Level Functions

| Level   | Controls |
|---------|----------|
| Video   | Rename, Export JSON/CSV |
| Chapter | Add Chapter, Rename, Reorder |
| Scene   | Add Scene, Edit description, Reorder |
| Prompt  | Edit prompt, Add A/B images, Delete prompt |

---

## 5. JSON Structure (Import/Export Format)

```json
{
  "video": {
    "title": "A Day in the Life of a Woman and Her Cat",
    "description": "A glimpse into the daily adventures of a woman and her cat.",
    "style": "Soft Pastel Aesthetic",
    "default_image_size": "1920x1080",
    "transcriptions": {
      "storyboard": "...",
      "narrative": "..."
    },
    "chapters": [
      {
        "chapter_title": "Morning Routine",
        "chapter_file_name": "1-morning-routine",
        "style": "Golden Morning Light",
        "scenes": [
          {
            "scene_number": 1,
            "scene_description": "The woman wakes up to her cat snuggling next to her.",
            "style": "Warm and Cozy",
            "prompts": [
              {
                "prompt_text": "A soft morning scene with a woman and her cat...",
                "image_size": "1024x1024",
                "aspect_ratio": "1:1",
                "seed": 12345,
                "approval_status": 1,
                "file_name": "1-1-1-wake-up-snuggle",
                "created_at": "2025-07-30",
                "image_a": {
                  "path": "output/1-1-1-wake-up-snuggle.png",
                  "approved": true
                },
                "image_b": {
                  "path": "output/1-1-1-wake-up-snuggle-b.png",
                  "approved": false
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
````

---

## 6. CSV Export Format (Prompt Injection Use)

Used for exporting **flattened prompt data** to a separate tool that handles prompt injection.

### CSV Headers

```csv
a,category,filename,prompt,style,size,seed,n
```

### Example Row

```csv
1,morning-routine,1-1-1-wake-up-snuggle,"A soft morning scene with a woman and her cat snuggling...",vivid,1024x1024,12345,1
```

| Field      | Description                                         |
| ---------- | --------------------------------------------------- |
| `a`        | Active status flag (`1=active`, `0=skip`, `9=done`) |
| `category` | Chapter name (kebab-case)                           |
| `filename` | Unique prompt file slug                             |
| `prompt`   | Full prompt text                                    |
| `style`    | Optional: vivid, natural                            |
| `size`     | Optional image size                                 |
| `seed`     | Optional seed number                                |
| `n`        | Number of variations                                |

---

## 7. Sample JSON Loader + Paste Panel

This feature is **always available** in the UI.

| Component               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| **Load Sample** button  | Injects a known-good JSON demo for testing UI         |
| **Paste JSON** textarea | Allows user to paste a new project manually           |
| **Validate + Load**     | Parses and hydrates UI from textarea contents         |
| **Live preview**        | Shows what data will be loaded (optional enhancement) |

---

## 8. Additional Features

| Feature                           | Status       |
| --------------------------------- | ------------ |
| Manual reordering (drag-drop)     | Nice-to-have |
| LocalStorage/Autosave             | Optional     |
| Dark mode                         | Optional     |
| Tooltip hints on hover            | Recommended  |
| Responsive layout (desktop-first) | Required     |

---

## 9. Out of Scope (Handled Separately)

| Feature          | Owner                  |
| ---------------- | ---------------------- |
| Prompt Injection | External CLI or script |
| AI Model Calls   | External system        |
| Cloud Sync       | Not required for MVP   |

---

## 10. Summary

| Layer         | Format      | Purpose                              |
| ------------- | ----------- | ------------------------------------ |
| UI Tree       | Nested View | Navigate Chapters → Scenes → Prompts |
| JSON          | Structured  | Full project load/save               |
| CSV Export    | Flat        | Used by prompt injection pipeline    |
| Image A/B     | UI Upload   | Store two variations per prompt      |
| Sample Loader | Persistent  | Always available for debugging/demo  |
| Paste Panel   | Persistent  | Enables manual input of full JSON    |

```

