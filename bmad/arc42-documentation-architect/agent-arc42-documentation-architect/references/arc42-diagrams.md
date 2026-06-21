# Mermaid Diagram Guidance

Use diagrams where they add value. A well-chosen diagram communicates more than a page of text — but only if it focuses on one concern at a time.

## Understandability Rules

- 5 to 15 elements maximum per diagram.
- If overloaded: aggregate cohesive elements into named blackboxes.
- Avoid implementation details (attributes, methods) in overview diagrams.
- Consistent layout, color, naming, and symbols across all diagrams.

## Diagram Types by Section

| Section                | Diagram type                         | Notes                                                                            |
| ---------------------- | ------------------------------------ | -------------------------------------------------------------------------------- |
| 3 Context              | C4-style context or block diagram    | System as central box, external actors/systems around it, labeled data flows     |
| 5 Building Blocks      | Component diagrams with nesting      | Level-1 whitebox; deeper levels zoom into specific components                    |
| 6 Runtime              | Sequence diagrams                    | Show which block executes which activity; activation bars for clarity            |
| 7 Deployment           | Deployment / infrastructure diagrams | Nodes containing software artifacts, channels between nodes                      |
| 8 Concepts             | Class / ER diagrams, flowcharts      | ER for domain models; flowcharts for process concepts                            |
| 10 Quality             | Mind-maps or tree diagrams           | Quality tree                                                                     |

## Cross-Diagram Consistency

- Building block names in diagrams MUST match names used in text and other diagrams.
- External systems in the context diagram MUST appear as interfaces in the Level-1 building block view.
- Runtime scenarios MUST use the same building block names from Section 5.

## Mermaid Notes

- Prefer textual notation (Mermaid) for easy creation and version control.
- For runtime: use partial scenarios — dive into the interesting part rather than tracing everything.
- For building blocks: use subgraphs to express containment/hierarchy.
- For deployment: use `flowchart` with grouping to mirror physical/logical topology when explicit deployment notation is overkill.
