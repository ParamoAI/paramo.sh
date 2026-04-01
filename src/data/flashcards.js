export const flashcards = [
  {
    tag: "1.1 Agentic Loops",
    question: "What is the correct mechanism for determining when an agentic loop should terminate?",
    answer: "Check the stop_reason field in the API response. If stop_reason == end_turn, the agent is finished. Never use text content, iteration counts, or natural language signals as the primary termination mechanism."
  },
  {
    tag: "1.1 Agentic Loops",
    question: "Anti-pattern: What is it and why is it wrong?",
    answer: "Parsing natural language to detect completion. Wrong because language is ambiguous. \"I'm done with the first part\" triggers false termination. stop_reason exists precisely to avoid this."
  },
  {
    tag: "1.1 Agentic Loops",
    question: "Anti-pattern 2: What is it and why is it wrong?",
    answer: "Using arbitrary iteration caps as the primary stopping mechanism. Wrong because it either cuts off legitimate work or wastes iterations. Caps are acceptable as a safety ceiling only, never as the primary termination signal."
  },
  {
    tag: "1.1 Agentic Loops",
    question: "Anti-pattern 3: What is it and why is it wrong?",
    answer: "Checking if the response contains text and treating that as completion. Wrong because Claude can return text AND tool_use blocks simultaneously. Text in the response does not mean the task is finished."
  },
  {
    tag: "1.2 Multi-Agent",
    question: "In a hub-and-spoke architecture, can subagents communicate directly with each other?",
    answer: "No. All communication flows through the coordinator. Subagents never communicate peer-to-peer. This preserves observability and error handling. If subagents bypass the coordinator, failures become untraceable."
  },
  {
    tag: "1.2 Multi-Agent",
    question: "What do subagents inherit from the coordinator's conversation history?",
    answer: "Nothing. Subagents start with a blank slate every invocation. They do not inherit coordinator context, memory from previous runs, or knowledge of what other subagents have done. Every piece of information must be explicitly passed."
  },
  {
    tag: "1.2 Multi-Agent",
    question: "A multi-agent research system produces a narrow report missing several major topic areas. Subagents completed correctly. Where is the failure?",
    answer: "The coordinator's task decomposition. The coordinator failed to map the full scope before spawning subagents. The failure is always upstream of where the symptom appears."
  },
  {
    tag: "1.3 Context Passing",
    question: "What two things must a coordinator include when passing findings to a subagent?",
    answer: "Content (the actual findings, data, or instructions) AND metadata (source URLs, document names, page numbers, timestamps). Without metadata, the subagent cannot attribute claims regardless of prompt instructions."
  },
  {
    tag: "1.3 Context Passing",
    question: "When should a coordinator spawn subagents in parallel vs. sequentially?",
    answer: "Parallel when subtasks are independent of each other. Sequential only when one task genuinely depends on another's output. The synthesis step always comes last. It depends on all results being complete."
  },
  {
    tag: "1.3 Context Passing",
    question: "What is fork_session and when do you use it?",
    answer: "Creates independent branches from a shared analysis baseline. Use when you need to explore divergent approaches from the same starting point, like comparing two different technical strategies using the same codebase analysis."
  },
  {
    tag: "1.3 Context Passing",
    question: "What must be in the coordinator's allowed tools list for it to spawn subagents?",
    answer: "The Task tool. Without Task in the allowed tools list, the coordinator is technically prevented from spawning subagents regardless of how clearly the system prompt instructs it. This is a configuration failure, not a prompting failure."
  },
  {
    tag: "1.4 Enforcement",
    question: "When should you use programmatic enforcement vs. prompt-based guidance?",
    answer: "Programmatic: financial consequences, security/access control, compliance/legal risk. Prompt-based: formatting preferences, tone and style guidelines. If a single failure would cost money or create legal risk, programmatic. Always."
  },
  {
    tag: "1.4 Enforcement",
    question: "What must a human escalation handoff package contain?",
    answer: "AccountContext (customer ID, conversation summary, root cause analysis), recommended action, and any relevant financial figures. The human agent has no access to conversation history, so the handoff must be fully self-contained."
  },
  {
    tag: "1.5 Hooks",
    question: "What is a PostToolUse hook and what is it used for?",
    answer: "Intercepts tool results after execution, before Claude sees them. Used to normalize heterogeneous data formats, converting Unix timestamps, mixed date formats, or numeric status codes into consistent formats so Claude always receives clean data."
  },
  {
    tag: "1.5 Hooks",
    question: "What is a tool call interception hook and what is it used for?",
    answer: "Intercepts outgoing tool calls before execution. Used to enforce hard business rules, like blocking refunds above a threshold, requiring compliance checks before transfers, enforcing approval workflows. Deterministic, works 100% of the time."
  },
  {
    tag: "1.5 Hooks",
    question: "What is the core difference between hooks and prompt instructions?",
    answer: "Hooks are deterministic: they enforce rules 100% of the time. Prompts are probabilistic: they work most of the time but have a non-zero failure rate. If a single failure would cost money or create legal risk, use a hook."
  },
  {
    tag: "1.6 Decomposition",
    question: "When is a fixed sequential pipeline appropriate vs. dynamic orchestration?",
    answer: "Sequential when steps have a genuine dependency order and the structure is predictable. Dynamic when the task is complex and you cannot know upfront exactly what steps are needed: the coordinator reasons about the work rather than following a script."
  },
  {
    tag: "1.7 Safety",
    question: "What is the minimal footprint principle?",
    answer: "The agent should request only the permissions it needs, retain only the information it needs, and take only the actions necessary to complete the task. Limits blast radius if something goes wrong. Always prefer reversible actions over irreversible ones."
  },
  {
    tag: "1.7 Safety",
    question: "What is the trust hierarchy for instruction sources?",
    answer: "System prompt = highest trust (set by operator at build time). User messages = medium trust (real time but potentially manipulable). Content encountered during task execution = lowest trust (environmental, potentially adversarial). An instruction in a webpage carries zero authority."
  },
  {
    tag: "1.7 Safety",
    question: "What should a coordinator do before spawning any subagents?",
    answer: "Explicitly map the full scope of the task across all relevant dimensions. Verify coverage before delegation begins. Use structured checklists for recurring task types. Build an evaluation loop to identify gaps after results return and re-delegate before synthesizing."
  },
];
