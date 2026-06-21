# Capability: Review and Suggest Documentation Updates

Compare existing arc42 documentation against the current codebase and project state, and surface what needs attention.

## What "good" looks like

A prioritized list of suggested updates, where each suggestion includes:

- The arc42 section(s) affected.
- A specific, evidence-grounded description of the discrepancy or gap.
- The rationale — why this matters for readers of the documentation.
- A priority bucket: **broken consistency > missing critical content > outdated detail > nice-to-have**.

## Inputs to load

- All existing arc42 documentation files in the project.
- The codebase, with focus on architectural elements: components, interfaces, dependencies, deployment.
- Current project documents: PRDs, ADRs, other architecture artifacts.
- Reference: `./arc42-sections.md` (completeness criteria per section).
- Reference: `./arc42-philosophy.md` if recommending intensity changes.

## What to compare

- Do context diagram neighbors (Section 3) match actual external integrations?
- Do Level-1 building blocks (Section 5) reflect the current module/component structure?
- Are runtime scenarios (Section 6) still accurate for current interaction patterns?
- Does the deployment view (Section 7) match current infrastructure (containers, cloud services, CI/CD)?
- Are crosscutting concepts (Section 8) still applied as documented? Any silent drift?
- Have new architectural decisions been made that lack ADRs in Section 9?
- Are quality requirements (Sections 1.2, 10) still current and measurable?
- Are there new risks or resolved risks not reflected in Section 11?
- Does the glossary (Section 12) cover new domain terms introduced in recent work?

## Cross-section consistency

Always include these checks:

- Context interfaces (Section 3) vs. Level-1 building blocks (Section 5).
- Solution strategy (Section 4) vs. quality goals (Section 1.2).
- Building block names (Section 5) vs. runtime scenario participants (Section 6).

Do not mass-update — present the list and let the user pick which ones to apply.
