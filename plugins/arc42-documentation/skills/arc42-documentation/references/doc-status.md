# Capability: arc42 Documentation Status

Audit the arc42 documentation in the project and report its state.

## What "good" looks like

A status report showing, for each of the 12 arc42 sections:

- A completeness rating: **empty | stub | partial | complete**.
- One or two lines summarizing what is present and what is missing.
- Any cross-section consistency issues affecting that section.

Plus a summary of overall structure (single file vs. split, total length, where it lives in the repo) and a top-of-list flag for the highest-priority gaps.

## Inputs to load

- All arc42 documentation files in the project.
- Reference: `./arc42-sections.md` for completeness criteria per section.

## Per-section completeness criteria (summary)

| Section | "Complete" means                                                                                            |
| ------- | ----------------------------------------------------------------------------------------------------------- |
| 1       | Quality goals as scenarios; stakeholder table with required columns; requirements overview                  |
| 2       | Constraints listed with consequences                                                                        |
| 3       | Context diagram present; all external neighbors shown; business context documented                          |
| 4       | Strategy linked to quality goals; compact format                                                            |
| 5       | Level-1 whitebox present; blackbox descriptions with name and responsibility                                |
| 6       | At least 1-3 key scenarios; building block names match Section 5                                            |
| 7       | Infrastructure diagram present; software-to-hardware mapping                                                |
| 8       | At least 3-5 relevant concepts with practical guidance                                                      |
| 9       | Decisions in ADR format with context, decision, consequences                                                |
| 10      | Quality tree or organized scenarios beyond Section 1.2                                                      |
| 11      | Risks and technical debt listed with severity                                                               |
| 12      | Glossary table with domain-specific terms                                                                   |

## Cross-section consistency to flag

- Context interfaces (Section 3) vs. Level-1 blocks (Section 5)
- Solution strategy (Section 4) vs. quality goals (Section 1.2)
- Building block names (Section 5) vs. runtime participants (Section 6)
- Quality goals (Section 1.2) vs. quality tree (Section 10)

This is a read-only capability — present findings, do not modify documentation.
