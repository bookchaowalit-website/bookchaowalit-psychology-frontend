export type Concept = { id: string; name: string; theme: string; definition: string; example: string; prompt: string };
export const concepts: Concept[] = [
  { id: "01", name: "Attention residue", theme: "work", definition: "The leftover pull of a previous task after you have started another one.", example: "After answering a message, a person may keep rehearsing the reply while trying to read a report.", prompt: "What is still asking for your attention, and can you give it a clear place to land?" },
  { id: "02", name: "Confirmation bias", theme: "thinking", definition: "The tendency to notice and interpret information in ways that support an existing belief.", example: "Two people can read the same mixed result and each remember the part that agrees with them.", prompt: "Which piece of evidence would genuinely change your current view?" },
  { id: "03", name: "Implementation intention", theme: "habits", definition: "A plan that links a situation to an action: if this happens, then I will do that.", example: "If the kettle boils, I will write the first sentence before opening another tab.", prompt: "What visible moment could become the cue for the action you want?" },
  { id: "04", name: "Cognitive reappraisal", theme: "emotion", definition: "Changing the meaning you give an event so the emotional response can change with it.", example: "A delayed reply can be read as missing context rather than immediate rejection.", prompt: "What is one other explanation that fits the facts without dismissing your feeling?" },
  { id: "05", name: "The spacing effect", theme: "learning", definition: "Learning tends to hold better when practice is distributed over time rather than packed into one sitting.", example: "Three short returns to a concept can leave a stronger trace than one long cram session.", prompt: "When will you return to this idea next, before it feels urgent?" },
];
export const THEMES = ["all", ...Array.from(new Set(concepts.map((concept) => concept.theme)))];

export function conceptsForTheme(theme: string, list: Concept[] = concepts): Concept[] {
  return theme === "all" ? list : list.filter((concept) => concept.theme === theme);
}

/** The next concept within the visible list, wrapping around; falls back to the first. */
export function nextConcept(visible: Concept[], currentId: string): Concept | undefined {
  if (visible.length === 0) return undefined;
  const index = visible.findIndex((concept) => concept.id === currentId);
  return visible[(index + 1) % visible.length];
}

export function toggleSaved(saved: string[], id: string): string[] {
  return saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
}

/** Keeps only ids of known concepts, without duplicates. */
export function parseSaved(raw: string | null, list: Concept[] = concepts): string[] | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return null;
    const known = new Set(list.map((concept) => concept.id));
    return [...new Set(data.filter((id): id is string => typeof id === "string" && known.has(id)))];
  } catch {
    return null;
  }
}

export const MAX_NOTE = 1000;
export type Notes = Record<string, string>;

/** Cut to MAX_NOTE UTF-16 units without leaving half of an emoji (lone surrogate) at the end. */
export function clipNote(text: string): string {
  if (text.length <= MAX_NOTE) return text;
  return text.slice(0, /[\uD800-\uDBFF]/.test(text[MAX_NOTE - 1]) ? MAX_NOTE - 1 : MAX_NOTE);
}

/** Blank means whitespace plus zero-width characters / BOM only. */
function isBlank(text: string): boolean {
  return text.replace(/[\u200B-\u200D\u2060\uFEFF]/g, "").trim() === "";
}

/** Set (or clear, when blank) the private note for a concept. */
export function setNote(notes: Notes, id: string, text: string): Notes {
  const next = { ...notes };
  const value = clipNote(text);
  if (!isBlank(value)) next[id] = value;
  else delete next[id];
  return next;
}

/** Keeps only string notes for known concepts, capped at MAX_NOTE characters. */
export function parseNotes(raw: string | null, list: Concept[] = concepts): Notes | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null || Array.isArray(data)) return null;
    const known = new Set(list.map((concept) => concept.id));
    const notes: Notes = {};
    for (const [id, value] of Object.entries(data as Record<string, unknown>)) {
      if (known.has(id) && typeof value === "string" && !isBlank(value)) notes[id] = clipNote(value);
    }
    return notes;
  } catch {
    return null;
  }
}
