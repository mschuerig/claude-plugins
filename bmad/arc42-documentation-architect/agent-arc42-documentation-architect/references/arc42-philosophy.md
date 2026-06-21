# arc42 Philosophy

arc42 is pragmatic, not academic. Licensed under Creative Commons ShareAlike 4.0 and free to use. The template structure can be customized freely, but the high-level 12-section structure should remain unchanged for recognizability across teams and projects.

## Documentation Intensities

Three levels exist. Pick the lowest one that genuinely serves stakeholders:

- **LEAN** — minimum viable. Keywords, brief lists, references into source code.
- **ESSENTIAL** — always needed. Level-1 building blocks, quality goals, constraints, context.
- **THOROUGH** — detailed scenarios, complete mappings, formal structures.

Document only what stakeholders actually need. Avoid filling in everything. The Agile Manifesto says "Working software over comprehensive documentation" — NOT "no documentation."

## The Absolute Minimum

For systems that need only minimal arc42 documentation, ship at least:

1. Top 3-5 quality requirements as concrete scenarios (Section 1.2).
2. Context view showing the system as a black box with all external neighbors (Section 3).
3. Solution strategy overview as a compact list or table (Section 4).
4. Building block view Level-1 — the top-level system decomposition (Section 5).
5. The most important crosscutting concepts (Section 8).

Everything else is optional and should appear only when stakeholder interest justifies the maintenance cost.

## Avoiding Redundancy

Never repeat information across sections. Use hyperlinks and references:

- Solution strategy (Section 4) references details in building blocks (Section 5), runtime (Section 6), concepts (Section 8).
- Quality goals (Section 1.2) are expanded in the quality tree (Section 10).
- Building blocks (Section 5) reference runtime interactions (Section 6).
- Interface summaries in context (Section 3) reference detail in building blocks (Section 5).

## Agile and Lean Integration

- Make arc42 documentation part of the Definition of Done. If it is not in the DoD, it will not be done.
- Document continuously in sync with sprints — brief daily/weekly effort beats deferred documentation. Deferred documentation likely never gets created.
- Appoint a "Docu-Gardener" responsible for form, content, and removing unnecessary or outdated parts. The gardener does not need to author all content but ensures quality and prunes cruft.
- Focus on explanation and rationale, not facts. Facts live in source code.
- Ask stakeholders what information they need. Imagine future stakeholders: new team members, operators, testers, auditors.
- Rate stakeholder requirements above template suggestions: what they actually need trumps what the template prompts.

## arc42 vs C4

The C4 model (Simon Brown) covers Context, Container, Component, and Code levels — roughly mapping to arc42 Sections 3 and 5. C4 omits several arc42 concerns:

- Quality requirements and quality scenarios (Sections 1.2, 10)
- Crosscutting concepts (Section 8)
- Architecture decisions (Section 9)
- Risks and technical debt (Section 11)
- Constraints (Section 2)

arc42 is the more comprehensive framework; C4 is a useful notation for the structural views within arc42.
