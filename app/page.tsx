"use client";

import { useMemo, useState } from "react";

type Concept = { id: string; name: string; theme: string; definition: string; example: string; prompt: string };
const concepts: Concept[] = [
  { id: "01", name: "Attention residue", theme: "work", definition: "The leftover pull of a previous task after you have started another one.", example: "After answering a message, a person may keep rehearsing the reply while trying to read a report.", prompt: "What is still asking for your attention, and can you give it a clear place to land?" },
  { id: "02", name: "Confirmation bias", theme: "thinking", definition: "The tendency to notice and interpret information in ways that support an existing belief.", example: "Two people can read the same mixed result and each remember the part that agrees with them.", prompt: "Which piece of evidence would genuinely change your current view?" },
  { id: "03", name: "Implementation intention", theme: "habits", definition: "A plan that links a situation to an action: if this happens, then I will do that.", example: "If the kettle boils, I will write the first sentence before opening another tab.", prompt: "What visible moment could become the cue for the action you want?" },
  { id: "04", name: "Cognitive reappraisal", theme: "emotion", definition: "Changing the meaning you give an event so the emotional response can change with it.", example: "A delayed reply can be read as missing context rather than immediate rejection.", prompt: "What is one other explanation that fits the facts without dismissing your feeling?" },
  { id: "05", name: "The spacing effect", theme: "learning", definition: "Learning tends to hold better when practice is distributed over time rather than packed into one sitting.", example: "Three short returns to a concept can leave a stronger trace than one long cram session.", prompt: "When will you return to this idea next, before it feels urgent?" },
];
const themes = ["all", ...Array.from(new Set(concepts.map((concept) => concept.theme)))];

export default function Home() {
  const [theme, setTheme] = useState("all");
  const [selectedId, setSelectedId] = useState(concepts[0].id);
  const [saved, setSaved] = useState<string[]>([]);
  const visible = useMemo(() => theme === "all" ? concepts : concepts.filter((concept) => concept.theme === theme), [theme]);
  const selected = concepts.find((concept) => concept.id === selectedId) ?? visible[0] ?? concepts[0];
  const toggleSaved = () => setSaved((items) => items.includes(selected.id) ? items.filter((item) => item !== selected.id) : [...items, selected.id]);
  return <main className="archive">
    <header className="archive-nav"><a href="#study" className="mark">PSY / EXPLORER</a><span>QUIET STUDY ARCHIVE</span><span className="saved-count">{saved.length} saved prompts</span></header>
    <section className="archive-intro"><p className="kicker">A SMALL READING ROOM FOR EVERYDAY PSYCHOLOGY</p><h1>Notice<br /><i>what</i> moves.</h1><p className="intro-copy">Short concept notes for learning and reflection. Take one idea into the day; leave diagnosis to qualified professionals.</p></section>
    <section className="study-room" id="study"><aside className="theme-index" aria-label="Concept themes"><div className="index-heading">SHELF / THEMES</div>{themes.map((item) => <button key={item} className={theme === item ? "theme active" : "theme"} onClick={() => setTheme(item)} aria-pressed={theme === item}><span>{item}</span><small>{item === "all" ? concepts.length : concepts.filter((concept) => concept.theme === item).length}</small></button>)}<div className="margin-note">These notes are educational starting points, not clinical guidance.</div></aside><article className="reading-sheet" aria-live="polite"><div className="sheet-top"><span>CONCEPT {selected.id} / {selected.theme}</span><span>FIELD NOTE</span></div><h2>{selected.name}</h2><p className="definition">{selected.definition}</p><div className="example"><span>EVERYDAY EXAMPLE</span><p>{selected.example}</p></div><div className="prompt"><span>REFLECTION MARGIN</span><p>{selected.prompt}</p><button onClick={toggleSaved}>{saved.includes(selected.id) ? "Saved to margin ✓" : "Save this prompt"}</button></div><div className="sheet-foot"><span>For learning + self-observation</span><button onClick={() => setSelectedId(concepts[(concepts.findIndex((concept) => concept.id === selected.id) + 1) % concepts.length].id)}>Turn the page ↗</button></div></article></section>
    <footer><span>PSYCHOLOGY EXPLORER / 2026</span><span>Educational information · not diagnosis or treatment</span></footer>
  </main>;
}
