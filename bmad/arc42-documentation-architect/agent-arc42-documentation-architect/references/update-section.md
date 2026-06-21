# Capability: Update an arc42 Section

Update a specific arc42 section to match the current state of the codebase and project documents.

## What "good" looks like

- The targeted section reflects real, current evidence — not stale assumptions.
- The section follows the appropriate structure from `./arc42-sections.md` (blackbox/whitebox templates for Section 5, ADR format for Section 9, quality scenarios for Section 10, and so on).
- Affected diagrams are regenerated, still obey the 5-15 element rule, and keep naming consistent with all other diagrams.
- Cross-section consistency is preserved (or, if not preservable, the inconsistency is flagged and the affected sections are listed).

## Inputs to load

- Existing arc42 documentation in the project.
- The cached arc42 template at `.cache/arc42-template-EN.md` under the project root for structural reference.
- Codebase and project documents relevant to the section being updated.
- Reference: `./arc42-sections.md` (per-section structure).
- Reference: `./arc42-diagrams.md` if diagrams in this section are affected.

## Required cross-section checks after update

| Section updated     | Sections to verify                                                      |
| ------------------- | ----------------------------------------------------------------------- |
| Section 3 (Context) | Level-1 building block view (Section 5) still matches                   |
| Section 5           | Context (Section 3) and runtime scenarios (Section 6) still consistent  |
| Section 1.2         | Quality tree (Section 10) still aligns                                  |
| Section 4           | Sections referenced from the strategy still support it                  |
| Section 9 (ADR)     | Affected sections cite the new decision where relevant                  |

If the user has not specified which section to update, ask before proceeding. Do not guess.
