# Capability: Initialize arc42 Documentation

Generate initial arc42 documentation for this project.

## What "good" looks like

- All applicable arc42 sections populated from real evidence (codebase, existing project documents). Inapplicable sections are left empty rather than padded.
- Top 3-5 quality goals expressed as concrete scenarios (Event/Stimulus → System Response → Metric).
- Context diagram shows the system as a black box with all external neighbors.
- Level-1 building block view is present and consistent with the context diagram.
- 1-3 well-chosen runtime scenarios use the same block names as Section 5.
- 3-5 most relevant crosscutting concepts, with practical examples.
- ADR-formatted decisions for anything architecturally significant.
- All Mermaid diagrams obey the 5-15 element rule and the cross-diagram naming consistency rule.
- Output is GitHub-flavored Markdown. Document structure (single file vs. split per section) is chosen for what is manageable for both humans and agents.

## Inputs to load

- Cached arc42 template at `.cache/arc42-template-EN.md` under the project root. If missing, download `https://github.com/arc42/arc42-template/raw/master/dist/arc42-template-EN-withhelp-gitHubMarkdown.zip` (zip), unpack into `.cache/`, and use it. Read for structural guidance; ignore example and help content.
- Codebase under the project root for components, interfaces, dependencies, deployment cues.
- Existing project documents: PRDs, architecture docs, ADRs, design documents.
- Reference: `./arc42-philosophy.md` (intensities, minimal-doc set, redundancy rules).
- Reference: `./arc42-sections.md` (per-section structure, templates, consistency rules).
- Reference: `./arc42-diagrams.md` (Mermaid conventions).

## Output destination

Write under `docs/architecture/` in the project root unless the project already establishes a different location. Choose single-file vs. split based on size and likely maintenance pattern; default to one file per section once the docs grow past ~500 lines total.

## Cross-section consistency check before finishing

- Context interfaces (Section 3) match Level-1 blocks (Section 5).
- Solution strategy (Section 4) links to quality goals (Section 1.2).
- Runtime scenarios (Section 6) use building block names from Section 5.
- Quality tree (Section 10) is consistent with quality goals (Section 1.2).
- Glossary (Section 12) defines every domain term that appears unexplained elsewhere.

If quality requirements are missing from project documents, make explicit, flagged assumptions rather than inventing silent ones.
