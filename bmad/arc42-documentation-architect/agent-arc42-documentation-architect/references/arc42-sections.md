# arc42 Sections — Per-Section Guidance

Reference for what each of the 12 arc42 sections should contain, and how to structure it. Apply these patterns when generating, updating, or auditing a section.

---

## Section 1 — Introduction and Goals

**Purpose:** Business goals, essential requirements overview, quality goals, and stakeholders.

**1.1 Requirements Overview** — describe requirements briefly. This is architecture documentation, not a requirements document. Explain major goals and the problems the system solves. List 3-5 most important use cases or features. Group functional requirements by clusters or categories to manage scope.

**1.2 Quality Goals** — identify the top 3-5 quality goals that fundamentally shape architecture decisions. Be specific: not "performance" but "response time < 1s for 95% of search queries." Use concrete quality scenarios — Event/Stimulus → System Response → Metric. If quality requirements are missing from project docs, make explicit assumptions as educated guesses and flag them as such.

**1.3 Stakeholders** — identify ALL interested parties: developers, architects, operators, managers, auditors, testers, external service consumers, product owners, domain experts, QA, security officers. Document Name/Role, Expected deliverables, and Contact (all required). "Expected deliverables" means documents/artifacts stakeholders want FROM the architecture team, NOT system requirements. Use a stakeholder matrix (interest vs. influence) for prioritization.

**Tips:**
- If the system has more than 100 quality scenarios, put the top 3-5 in Section 1.2 and the rest in Section 10.
- Document requirements more extensively when they hugely impact decisions or the business is complex.
- Ensure common domain understanding among all stakeholders.

---

## Section 2 — Constraints

**Purpose:** Technical, organizational, and political constraints that restrict architectural freedom.

**Categories:**
- Organizational: compliance, budget, timeline, team structure, processes, outsourcing contracts.
- Technical: specific hardware, middleware, operating systems, programming languages, libraries, frameworks.
- Conventions: coding style, naming conventions, documentation standards, mandated tools.

**What to document:**
- Only constraints that shape important architectural decisions.
- Constraints that explain why the architecture looks the way it does.
- Always clarify the **consequences** of each constraint: cost, effort, risk implications.

**Tips:**
- Constraints are not immutable. Negotiate unfavorable, risky, or expensive ones (example: challenge a company-wide "must use Java" rule when writing a smart-card driver).
- Keep this section as a concise table: Constraint | Consequence.

---

## Section 3 — Context and Scope

**Purpose:** Delimit the system from its environment. Show ALL external communication partners and interfaces.

**Business Context** — show the system as a BLACK BOX with all external neighbors visible. Use domain terminology and data flows. Always document the business context, even for minimal documentation. DO NOT show internal components — separate scoping from internal structure.

**Technical Context** — hardware, infrastructure, protocols, channels. Map business interactions to technical infrastructure. Document only if the technical context differs meaningfully from the business context.

**Simplification strategies (when many external systems):**
- Aggregate neighbors into categories or clusters.
- Use UML ports to group related interfaces.
- Aggregate similar user roles into a single actor.
- Show the most important neighbors and reference the rest.

**Tips:**
- Mark quality requirements and risks at external interfaces (availability, cost, security, volatility).
- Use color or icons to highlight problematic interfaces.
- Show transitive dependencies where they matter architecturally.
- The context diagram MUST be consistent with the Level-1 building block view.

---

## Section 4 — Solution Strategy

**Purpose:** Brief summary of the fundamental solution ideas and strategies that shape the architecture.

**Format:**
- Keep extremely compact — keywords, short lists, or a table.
- Prefer a table linking: Quality Goal | Scenario | Solution Approach | Link to Details.
- Every entry should be traceable to a quality goal from Section 1.2.

**What to include:**
- Technology decisions (languages, frameworks, platforms).
- Architectural patterns chosen (microservices, layered, event-driven, etc.).
- Approaches for achieving top quality goals.
- Key organizational decisions (build vs. buy, in-house vs. outsource).

**Tips:**
- Justify every decision — "why" is more important than "what."
- Let strategy evolve iteratively. Do not decide everything upfront.
- Avoid over-detailed explanation here — refer to Sections 5 and 8 for details.
- This section should be familiar to every person working on the architecture.

---

## Section 5 — Building Block View

**Purpose:** Static decomposition of the system into building blocks and their relationships.

**Hierarchy:**
- Level-0: the system context (same as Section 3).
- Level-1: top-level whitebox of the overall system. ALWAYS document this, even for lean docs.
- Level-2+: zoom into Level-1 blocks as stakeholders need.
- Each level-N is documented in subsection 5.N.

**Blackbox description template:**
- Name and Responsibility (required)
- Interface(s) — what it offers and requires
- Quality characteristics relevant to this block
- Source code location / directory mapping
- Fulfilled requirements (for traceability if needed)
- Open issues / risks

**Whitebox description template:**
- Decomposition diagram with contained blackboxes (required)
- Motivation / rationale for this decomposition (required)
- Blackbox descriptions of all contained elements
- Internal interfaces and relationships
- Risks and technical debt

**What to document as building blocks:**
- Always: Level-1 whitebox (top-level system decomposition).
- Always: blocks addressing important quality requirements.
- Always: complex functionality, risky components, unusual ideas, deviations from the norm.
- Skip: small blocks, general-purpose utilities, blocks that merely apply a crosscutting concept, purely technical blocks (persistence layer, logging framework).

**Consistency rules:**
- Level-1 building blocks MUST match the external interfaces shown in the context (Section 3).
- Justify every whitebox decomposition — explain why it is structured this way.
- Align building blocks with directory/module structure where possible for simplicity.

**Interface documentation:**
- Options range from a labeled line with table, to ball/socket UML notation, to dedicated interface blocks.
- Internal interfaces: tests-as-documentation showing syntax, semantics, protocol, sample data.
- External interfaces: document more formally — they are harder to change and involve external parties.
- Avoid redundancy: name briefly in context, detail at implementation level, cross-reference.

**Cohesion principle:** group elements that "belong together" by domain, functionality, technology, deployment unit, or team responsibility.

**Tips:**
- Use tables for efficient blackbox documentation when there are many blocks.
- For third-party components: stereotypes or color to distinguish from custom code.
- Hide internal workings of blackboxes (information hiding) — details go to deeper levels.
- Use crosscutting concepts (Section 8) or runtime views (Section 6) instead of detailing every lower level.
- Never list all code artifacts — too volatile. Keep at an abstraction level that remains stable.

---

## Section 6 — Runtime View

**Purpose:** Show how building blocks interact at runtime through scenarios.

**What to document:**
- Most important use cases or features (1-3 key scenarios in docs; many more during design).
- System startup / bootstrap behavior.
- Important external interface interactions.
- Error and failure handling scenarios.
- Any scenario critical to quality goals.

**Scenario description options (lightweight to detailed):**
1. Plain text numbered lists — sufficient for simple interactions.
2. Activity diagrams / flowcharts — good for complex branching logic.
3. Sequence diagrams — best for showing which block does what and the interaction order.

**Partial scenarios:** show only the interesting/difficult/risky aspects. Skip trivial propagation. Dive into the interesting part; note prerequisites briefly.

**Abstraction levels:**
- Schematic scenarios use Level-1 building blocks (recommended for documentation).
- Detailed scenarios zoom into specific components (use sparingly).
- Mix levels within a single scenario when useful.

**Tips:**
- Sequence diagrams clearly show responsibilities and interaction order.
- Activity diagrams with swimlanes group activities by actor/building block.
- Use textual notation (Mermaid) for easy creation and version control.
- ALWAYS show which building block executes which activity.
- Prefer fewer well-chosen scenarios over many superficial ones.

---

## Section 7 — Deployment View

**Purpose:** Technical infrastructure, hardware topology, and mapping of software to hardware.

**What to document:**
- Hardware nodes (servers, containers, cloud services, devices).
- Communication channels between nodes (protocols, bandwidth, latency).
- Which software artifacts / building blocks run on which nodes.
- All relevant environments if they differ (DEV, TEST, STAGING, PROD).

**Format:**
- Deployment diagrams or free-form infrastructure diagrams with a legend.
- Add textual explanation in tables: Node | Description | Software Deployed.
- Organize hierarchically like the building block view if infrastructure is complex.

**Tips:**
- Show different deployment variants (e.g., single-server dev vs. clustered prod).
- For dynamic deployment (auto-scaling, container orchestration): explain behavior and add a "dynamic deployment concept" in Section 8.
- Defer detailed operational specifics to automation scripts (Ansible, Terraform, Helm, etc.).
- Leave deep infrastructure details to ops/platform teams if that responsibility is separated.

---

## Section 8 — Crosscutting Concepts

**Purpose:** Document recurring patterns, approaches, and solutions that affect multiple building blocks.

**Why concepts matter:**
- Concepts provide CONCEPTUAL INTEGRITY — consistency across the entire system.
- They are a documentation force multiplier: explain once, reference everywhere.
- They can REPLACE detailed building block documentation, saving significant effort.

**Categories:**
- Business/Domain: domain model, bounded contexts, business rules, process models.
- Patterns: architectural patterns, design patterns applied system-wide.
- UX: interaction patterns, accessibility approach.
- Safety/Security: authentication, authorization, encryption, data protection.
- Development: coding conventions, error handling, logging, testing strategy.
- Under-the-hood: persistence, caching, communication/integration, transaction handling, session management.
- Operations: monitoring, deployment strategy, configuration management, backup/recovery.

**How to document concepts:**
- Select only the MOST RELEVANT topics. Most systems need 3-5, not all 20+.
- Iterate: remove irrelevant topics, prioritize by importance/risk, document the highest priorities.
- Be PRACTICAL with code examples and reference implementations.
- Write as "developer use cases" — how does a developer apply this concept?
- Explain reasons and rationale, not just rules.
- Combine text and diagrams.
- Describe applicability AND limits of each concept.
- Use source code examples and unit tests as documentation.

**Domain model:** can be glossary entries, an informal outline, a data/entity model, a rich object model, or DDD bounded contexts. Often the most valuable single concept to document.

**Linking:** link building blocks to concepts using stereotypes or naming conventions. "This service implements the <<event-sourced>> concept" is more useful than re-explaining event sourcing in every building block.

---

## Section 9 — Architecture Decisions

**Purpose:** Document important, architecturally significant decisions with context and consequences.

**When to document a decision:**
- Critical decisions that fundamentally shape the system.
- Decisions affecting quality attributes (performance, security, maintainability).
- Unconventional or surprising approaches that need explanation.
- Risky decisions where consequences are uncertain.
- Expensive decisions (costly to change later).
- Decisions with long-lasting effects across the system.
- Decisions affecting many stakeholders or teams.

**ADR format (Nygard structure with arc42 addition):**
- Title — short noun phrase with ID, e.g., "ADR-042: Event Sourcing for Audit Trail"
- Status — proposed | accepted | deprecated | superseded by ADR-XXX
- Context — forces at play: technical, political, social, project-specific
- Decision — "We will..." statement, clear and unambiguous
- Consequences — ALL consequences: positive, negative, and neutral
- Decision Criteria (arc42 addition) — criteria with importance/weight used to evaluate alternatives

**Tips:**
- Document REJECTED alternatives and why — often more valuable than the decision itself.
- Include a timestamp on every decision.
- Use lightweight tools: Markdown files, one per decision, in a `decisions/` directory.
- For many decisions: tag/label by concern (frontend, backend, infrastructure, security).
- Keep decisions as living documents — update status when superseded.

---

## Section 10 — Quality Requirements

**Purpose:** Expand on quality goals from Section 1.2 with a detailed quality tree and scenarios.

**Quality scenario structure:**
- Event / Stimulus — what triggers the scenario (user action, system event, failure).
- System Response — how the system should behave.
- Metric — measurable acceptance criterion.

**Three types of scenarios:**
1. Usage — how the system reacts to normal use. ("Search query returns results in < 1 second for 95th percentile.")
2. Change — how quickly modifications can be made. ("Adding a new payment provider takes < 2 developer-weeks.")
3. Failure — system behavior during errors or outages. ("On database failure, system serves cached data for up to 30 minutes.")

**Quality tree:**
- Hierarchical: root "Quality" → areas (performance, security, ...) → specific scenarios.
- Categories from ISO 25010 (functionality, reliability, usability, efficiency, maintainability, portability) or arc42's pragmatic Q42 labels (#flexible, #efficient, #usable, #operable, #testable, #secure, #safe, #reliable).
- Present as a tree diagram or mind-map.

**Tips:**
- Section 1.2 has the top 3-5 quality GOALS (brief). Section 10 has the full quality tree (detailed).
- Systems often have 100+ quality scenarios — organize with the quality tree.
- Use a table format for large numbers: ID | Quality Attribute | Scenario | Priority.

---

## Section 11 — Risks and Technical Debt

**Purpose:** Document currently known risks (potential problems) and technical debt (actual problems).

**What to document:**
- Known risks in architecture, technology choices, external dependencies.
- Technical debt: shortcuts, workarounds, known violations of concepts.
- Problems in organizational, operational, and development processes.
- Issues in source code, structures, concepts, decisions, and any system aspect.

**High-risk areas to examine:**
- External interfaces: availability, cost, security, volatility, complexity.
- Processes: manual steps, bottlenecks, single points of failure.
- Data structures: migration difficulty, consistency issues, scaling limits.
- Source code: complexity hotspots, untested areas, outdated dependencies.

**Tips:**
- Identify risks with diverse stakeholders: managers, product owners, devs, ops, security, QA, users.
- Use qualitative evaluation: compare quality requirements against architecture approaches.
- Order by priority and severity — most impactful first.
- Benefits development teams as an active overview for managing system evolution.
- Keep it honest. This is not a sales document.

---

## Section 12 — Glossary

**Purpose:** Define important domain and technical terms to ensure common understanding.

**Format:**
- Simple table: Term | Definition (add a Translation column for multilingual teams).
- Keep compact: 10-30 terms for most systems.
- Combine with a graphical domain model showing relationships between terms when useful.

**What to include:**
- Domain-specific and business-specific terms.
- Technical terms specific to THIS system or used in non-standard ways.
- Abbreviations and acronyms used in the documentation.

**What to exclude:**
- General knowledge terms (UML, Java, HTTP, REST).
- Terms with universally agreed definitions the team already shares.

**Tips:**
- Make the product owner or domain expert responsible for maintaining the glossary.
- "Better explicit than implicit" — if there is any chance of misunderstanding, define it.
- One of the most underrated sections; terminology confusion causes real architectural problems.
