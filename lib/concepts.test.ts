import { describe, expect, it } from "vitest";
import { concepts, conceptsForTheme, nextConcept, parseSaved, THEMES, toggleSaved } from "./concepts";

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
