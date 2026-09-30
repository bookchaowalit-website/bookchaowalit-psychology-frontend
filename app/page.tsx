"use client";

import { useState } from "react";
import { concepts, conceptsForTheme, nextConcept, parseSaved, THEMES as themes, toggleSaved } from "../lib/concepts";
import { useStoredState } from "../lib/use-stored-state";

const NO_SAVED: string[] = [];

export default function Home() {
  const [theme, setTheme] = useState("all");
  const [selectedId, setSelectedId] = useState(concepts[0].id);
  const [saved, setSaved] = useStoredState("psychology-saved-prompts-v1", NO_SAVED, parseSaved);
  const visible = conceptsForTheme(theme);
  const selected = visible.find((concept) => concept.id === selectedId) ?? visible[0] ?? concepts[0];
  const chooseTheme = (next: string) => { setTheme(next); const first = conceptsForTheme(next)[0]; if (first) setSelectedId(first.id); };
  const savedConcepts = concepts.filter((concept) => saved.includes(concept.id));
  return <main className="archive">
    <header className="archive-nav"><a href="#study" className="mark">PSY / EXPLORER</a><span>QUIET STUDY ARCHIVE</span><span className="saved-count">{saved.length} saved prompts</span></header>
    <section className="archive-intro"><p className="kicker">A SMALL READING ROOM FOR EVERYDAY PSYCHOLOGY</p><h1>Notice<br /><i>what</i> moves.</h1><p className="intro-copy">Short concept notes for learning and reflection. Take one idea into the day; leave diagnosis to qualified professionals.</p></section>
    <section className="study-room" id="study"><aside className="theme-index" aria-label="Concept themes"><div className="index-heading">SHELF / THEMES</div>{themes.map((item) => <button key={item} className={theme === item ? "theme active" : "theme"} type="button" onClick={() => chooseTheme(item)} aria-pressed={theme === item}><span>{item}</span><small>{item === "all" ? concepts.length : concepts.filter((concept) => concept.theme === item).length}</small></button>)}<div className="index-heading concept-heading">CONCEPTS / {theme.toUpperCase()}</div><ul className="concept-list">{visible.map((concept) => <li key={concept.id}><button type="button" className={concept.id === selected.id ? "concept active" : "concept"} aria-current={concept.id === selected.id ? "true" : undefined} onClick={() => setSelectedId(concept.id)}><small>{concept.id}</small> {concept.name}</button></li>)}</ul><div className="margin-note">These notes are educational starting points, not clinical guidance.</div></aside><article className="reading-sheet" aria-live="polite"><div className="sheet-top"><span>CONCEPT {selected.id} / {selected.theme}</span><span>FIELD NOTE</span></div><h2>{selected.name}</h2><p className="definition">{selected.definition}</p><div className="example"><span>EVERYDAY EXAMPLE</span><p>{selected.example}</p></div><div className="prompt"><span>REFLECTION MARGIN</span><p>{selected.prompt}</p><button type="button" aria-pressed={saved.includes(selected.id)} onClick={() => setSaved((items) => toggleSaved(items, selected.id))}>{saved.includes(selected.id) ? "Saved to margin ✓" : "Save this prompt"}</button></div><div className="sheet-foot"><span>For learning + self-observation</span><button type="button" onClick={() => { const next = nextConcept(visible, selected.id); if (next) setSelectedId(next.id); }} disabled={visible.length < 2}>Turn the page <span aria-hidden="true">↗</span></button></div></article></section>
    <section className="saved-margin" aria-labelledby="saved-title"><h2 id="saved-title">Your margin</h2>{savedConcepts.length === 0 ? <p>No prompts saved yet. Saved prompts stay in this browser only.</p> : <ul>{savedConcepts.map((concept) => <li key={concept.id}><strong>{concept.name}</strong><p>{concept.prompt}</p><button type="button" onClick={() => setSaved((items) => toggleSaved(items, concept.id))} aria-label={`Remove saved prompt for ${concept.name}`}>Remove</button></li>)}</ul>}</section>
    <footer><span>PSYCHOLOGY EXPLORER / 2026</span><span>Educational information · not diagnosis or treatment</span></footer>
  </main>;
}
