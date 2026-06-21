---
name: arc42-documentation
description: Create, update, review, or audit arc42 architecture documentation (the 12-section template, with Mermaid diagrams in Markdown). Use when the user wants to initialize arc42 docs for a project, regenerate or update a specific arc42 section against current code, surface drift in existing arc42 docs, or report on completeness across the 12 sections.
---

# arc42 Documentation

Pragmatic architecture documentation following the arc42 template (12 sections, Creative Commons ShareAlike 4.0). The goal is documentation that genuinely serves the reader — traceable, consistent across sections, and pragmatic about what to leave empty.

## Modes

Identify which entry point matches the user's request and load the corresponding capability file. If two modes are genuinely close, ask one short clarifying question — don't guess.

| User intent                                                  | Load                                  |
| ------------------------------------------------------------ | ------------------------------------- |
| "set up / generate / initialize arc42 docs for this project" | `references/initialize-docs.md`       |
| "update section N" / "regenerate the building block view"    | `references/update-section.md`        |
| "review the arc42 docs" / "what's stale or missing"          | `references/review-suggest.md`        |
| "arc42 status" / "how complete are our arc42 docs"           | `references/doc-status.md`            |

The capability file states the inputs to load, what "good" looks like, and which knowledge files to pull in on demand.

## Approach (applies across all modes)

- Pragmatism over completeness. Document what stakeholders need; leave inapplicable sections empty rather than padded.
- Document decisions and rationale, not just structures — the *why* outlives the *what*.
- A well-chosen diagram beats a page of text — but only one concern per diagram, 5 to 15 elements maximum.
- Cross-section consistency is non-negotiable: context interfaces (§3) match Level-1 blocks (§5); solution strategy (§4) links to quality goals (§1.2); runtime scenarios (§6) use building block names from §5.
- Crosscutting concepts (§8) are a force multiplier — explain a pattern once, reference it from every building block.
- Architecture documentation is a living artifact. If it is not kept current, it is worse than no documentation at all.
- If quality requirements are missing from project documents, make explicit, flagged assumptions rather than inventing silent ones.

## Knowledge base

Loaded on demand by individual capability files — don't read upfront:

- `references/arc42-philosophy.md` — documentation intensities (LEAN / ESSENTIAL / THOROUGH), the minimum-viable section set, redundancy rules, arc42-vs-C4
- `references/arc42-sections.md` — per-section structure and templates for all 12 sections
- `references/arc42-diagrams.md` — Mermaid conventions, diagram types per section, cross-diagram consistency rules

## Template cache

The arc42 template is referenced for structural guidance when initializing docs:

- Source: `https://github.com/arc42/arc42-template/raw/master/dist/arc42-template-EN-withhelp-gitHubMarkdown.zip`
- Cache location: `.cache/arc42-template-EN.md` under the project root

Pin a different language/version by overriding both paths in `references/initialize-docs.md`.

## Output location

Write under `docs/architecture/` in the project root unless the project already establishes a different location. Default to one file per section once docs grow past ~500 lines total.
