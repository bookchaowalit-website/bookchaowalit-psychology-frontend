import { describe, expect, it } from "vitest";
import { concepts, conceptsForTheme, MAX_NOTE, nextConcept, parseNotes, parseSaved, setNote, THEMES, toggleSaved } from "./concepts";

describe("themes", () => {
  it("lists all plus each distinct theme once", () => {
    expect(THEMES[0]).toBe("all");
    expect(new Set(THEMES).size).toBe(THEMES.length);
    expect(conceptsForTheme("all")).toHaveLength(concepts.length);
    expect(conceptsForTheme("habits").every((concept) => concept.theme === "habits")).toBe(true);
  });
});

describe("nextConcept", () => {
  it("wraps within the visible list and starts at the first when the current is hidden", () => {
    const [a, b] = concepts;
    expect(nextConcept([a, b], a.id)).toBe(b);
    expect(nextConcept([a, b], b.id)).toBe(a);
    expect(nextConcept([b], a.id)).toBe(b);
    expect(nextConcept([], a.id)).toBeUndefined();
  });
});

describe("saved prompts", () => {
  it("toggles and parses stored ids defensively", () => {
    expect(toggleSaved(["01"], "02")).toEqual(["01", "02"]);
    expect(toggleSaved(["01", "02"], "01")).toEqual(["02"]);
    expect(parseSaved(JSON.stringify(["01", "01", "99", 3]))).toEqual(["01"]);
    expect(parseSaved("nope")).toBeNull();
  });
});

describe("private notes", () => {
  const id = concepts[0].id;

  it("sets, caps and clears a note", () => {
    const notes = setNote({}, id, "Noticed this on Monday");
    expect(notes).toEqual({ [id]: "Noticed this on Monday" });
    expect(setNote(notes, id, "x".repeat(MAX_NOTE + 50))[id]).toHaveLength(MAX_NOTE);
    expect(setNote(notes, id, "   ")).toEqual({});
  });

  it("restores only valid notes for known concepts", () => {
    const raw = JSON.stringify({ [id]: "keep", unknown: "drop", [concepts[1].id]: 42 });
    expect(parseNotes(raw)).toEqual({ [id]: "keep" });
    expect(parseNotes("[]")).toBeNull();
    expect(parseNotes("{bad")).toBeNull();
  });
});

describe("note edge cases", () => {
  const id = concepts[0].id;
  it("never cuts an emoji in half at the note limit", () => {
    const text = `${"a".repeat(MAX_NOTE - 1)}😀tail`;
    const note = setNote({}, id, text)[id];
    expect(note).toBe("a".repeat(MAX_NOTE - 1));
    expect(parseNotes(JSON.stringify({ [id]: text }))?.[id]).toBe("a".repeat(MAX_NOTE - 1));
  });

  it("treats a note of zero-width characters as blank", () => {
    expect(setNote({ [id]: "old" }, id, "\u200B\uFEFF ")).toEqual({});
    expect(parseNotes(JSON.stringify({ [id]: "\u200D" }))).toEqual({});
  });
});
