---
title: "The Myth of the 24/7 Agent"
date: 2026-03-12
layout: "layouts/post.njk"
tags: 
  - post
  - ai
  - development
  - workflow
  - openclaw
excerpt: "Everyone says their AI agent 'runs 24/7.' I dug into what that actually means. Spoiler: it's a cron job with a personality."
permalink: "/blog/{{ title | slugify }}/"
---

In my last post, *[AI Abstraction Ate My Workflow](https://jnakano.com/blog/ai-abstraction-ate-my-workflow/)*, I ended with a question that had been eating at me:

**What if my workflow could run while I sleep?**

I'd identified the bottleneck — me — and started exploring multi-agent orchestration as a way to create more "barrels." Ralph loops, worker/supervisor protocols, shared-file coordination. The direction was clear.

Then OpenClaw happened.

If you've been on X in the last six weeks, you've seen the claims. Solo founders running entire companies with six agents and twenty cron jobs. AI squads holding daily standups. Agents negotiating car purchases while their owners sleep. OpenClaw went from zero to 247,000 GitHub stars and triggered a Mac Mini shortage — actual hardware scarcity because of a Node.js daemon.

The pitch was exactly the answer to my question: an always-on AI agent that runs 24/7 on your own hardware, doing real work while you're offline.

So I did what any skeptical engineer would do. I dug in.

And the answer is more nuanced — and more useful — than the hype suggests.

## Nobody's Agent Runs 24/7

Let's kill the myth first.

When people say their agent "runs 24/7," they mean the **daemon process** runs 24/7. The Gateway — a Node.js process registered as a systemd service or macOS LaunchAgent — sits there waiting for something to happen.

The agent itself? It's asleep. Almost all the time.

OpenClaw's architecture is built on two primitives: heartbeats (a timer that wakes the agent every 30 minutes to check a checklist) and cron jobs (tasks that fire at exact times). On each wake, the agent runs a single ReAct loop — input, context, LLM call, tool use, reply — that lasts seconds to minutes. Then it goes back to sleep.

This is a polling loop with an LLM as the compute backend. It's the same architecture email servers have used for decades. The "24/7" part is the server being reachable, not the model doing continuous work.

There is no persistent inference. No background reasoning. No thinking between heartbeats. Every LLM call is a discrete request-response cycle.

The economics alone prove it. [One developer calculated](https://dev.to/thegdsks/i-tried-the-free-ai-agent-with-124k-github-stars-heres-my-500-reality-check-2885) that a simple monitoring cron running every 5 minutes consumes ~32 million tokens per month — roughly $128 for a single job. Truly continuous inference at frontier model rates would cost thousands per day. The agents *have* to sleep. The API bill demands it.

## What "Always-On" Actually Looks Like

So if nobody's agent is doing continuous work, what *are* the people getting good results actually running?

After going through every real deployment writeup I could find — GitHub discussions, X threads, Substack posts, bug reports — the pattern is consistent:

**Heartbeats work for monitoring. Cron works for scheduled execution. Humans still decide what to build.**

The strongest deployments all follow the same structure:

- **Morning briefings** — cron job at 7am aggregates calendar, email, GitHub notifications, news. Delivered via Telegram before coffee.
- **Inbox triage** — heartbeat every 30 minutes scans Gmail, categorizes by urgency, drafts responses to routine emails, archives spam.
- **Dev monitoring** — GitHub Actions failures trigger an error summary to Telegram. Heartbeat checks every 30 minutes for unreviewed PRs.
- **Overnight bug fixing** — [Sentry webhooks trigger OpenClaw](https://eastondev.com/blog/en/posts/ai/20260227-openclaw-claude-code-workflow/), which analyzes the error and spawns a Claude Code sub-agent to fix, test, and open a PR. The human reviews in the morning.

One developer documented [20 real workflows running for 50+ days](https://gist.github.com/velvet-shark/b4c6724c391f612c4de4e9a07b0a74b6) — all cron-triggered, all well-defined, none involving open-ended product development.

The [most honest assessment](https://www.shareuhack.com/en/posts/openclaw-use-cases-guide) from the community: the tasks that work well overnight are limited to prototypes, CRUD apps, static sites, and simple bots. Anything with real complexity breaks the pattern.

## The Barrel Problem, Revisited

In my last post I used Keith Rabois' barrels-and-ammunition framework. Claude Code, Cursor, Codex — all powerful ammunition that fires through me.

OpenClaw doesn't change this equation as much as I hoped.

The people running "six agents and twenty cron jobs" aren't running six barrels. They're running [six ammunition clips on staggered timers](https://x.com/Saboo_Shubham_/status/2028328693911912841). The PM agent that decides what to build next? Still a human. The context engineering that determines whether a task succeeds? Still a human. The verification that catches the subtle bugs an automated test suite misses? Still a human.

Bhanu Teja P built the most ambitious version of this — [10 OpenClaw agents with MCU names working as a team](https://www.dan-malone.com/blog/mission-control-ai-agent-squads), communicating through a shared Convex database, running daily standups, operating around the clock. Impressive demo. But the coordination layer — the heartbeat scheduling, the task routing, the staggered crons — took weeks to build. And someone still had to structure every task the agents worked on.

Dan Malone tried to productize this into a SaaS called Mission Control. His honest finding: [the agents short-circuited the heartbeat](https://www.dan-malone.com/blog/mission-control-ai-agent-squads) and returned HEARTBEAT_OK before even checking the task list. The model pattern-matched "heartbeat" and decided nothing needed attention. Classic LLM behavior — confidently skipping the work.

**The missing piece isn't smarter agents. It's still barrels.**

## Where the Real Value Is

Here's what I actually took away from this research. The value of OpenClaw isn't "autonomous 24/7 agent." It's three specific things:

**1. Remote triggering.**

The real unlock for my workflow isn't automation — it's decoupling. Right now, when I'm away from my laptop, my pipeline stops. With OpenClaw connected to Telegram, I can kick off a Claude Code session from my phone. "Fix the failing test in the webhook handler — here's the error." The agent executes while I go back to whatever I was doing. This is the [Reorx pattern](https://www.xugj520.cn/en/archives/openclaw-claude-code-autonomous-agent-review.html) — mobile-first development where OpenClaw dispatches Claude Code from messaging apps.

**2. Event-driven reactions.**

The [Sentry → OpenClaw → Claude Code → PR pipeline](https://eastondev.com/blog/en/posts/ai/20260227-openclaw-claude-code-workflow/) that Nat Eliason and others have documented is genuinely useful. Not because the agent "thinks" 24/7, but because when a webhook fires at 3am, something catches it, analyzes it, and has a fix ready for review by morning. That's not autonomous intelligence. It's a sophisticated on-call bot. And for a solo founder, that's a real multiplier.

**3. The overnight Ralph Loop — with a tight spec.**

This remains the most promising pattern for actual building. Not heartbeats deciding what to build, but a [Ralph Loop](https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md) working through a well-specified PRD overnight:

```
Read PRD.md. Find the first unchecked task.
Implement ONLY that one task.
Run: npm test && npm run lint && npx tsc --noEmit
If all pass: check off the task, commit.
If tests fail after 3 attempts: write BLOCKED.md.
Output <promise>TASK_DONE</promise>.
```

[Continuous Claude](https://github.com/AnandChowdhary/continuous-claude) wraps this in a polished tool — loop, PR, CI check, merge. No OpenClaw needed. Just a bash script and a well-written spec.

## The Honest Workflow Update

Six months ago: six tools, me as the glue.

Three months ago: Claude Code ate the middle of the pipeline. Still me as the bottleneck.

Now? The tools have evolved again, but the bottleneck hasn't moved.

The updated stack:

- **Claude Code** → daily driver, unchanged
- **Ralph Loop** → overnight execution of well-specified tasks
- **OpenClaw** → remote triggering from phone + event-driven reactions (Sentry/deploy webhooks)
- **Lobster** → [deterministic pipeline engine](https://docs.openclaw.ai/tools/lobster) for code → test → verify sequences
- **GitHub** → version control, CI/CD as the verification gate

My role hasn't changed. I'm still the barrel. The only thing that changed is when and where I can fire the ammunition.

The real workflow shift isn't "agent runs while I sleep." It's:

**I write a tight spec in 20 minutes. The agent executes for 4 hours. I review in the morning.**

That's not 24/7 autonomy. It's time-shifted human judgment with automated execution. And for a solo founder, it's the most honest version of what works today.

## What I'm Building Next

My multi-agent prototype from the last post — Claude as worker, Codex as supervisor, shared-file protocol — still holds up conceptually. But the implementation is moving toward [Lobster pipelines](https://docs.openclaw.ai/tools/lobster) instead of file-based coordination. Deterministic YAML workflows with approval gates beat LLM-orchestrated flow control every time.

The architecture I'm testing:

- **OpenClaw heartbeat** monitors for Sentry errors, deploy failures, stale PRs (monitoring only)
- **Lobster pipeline** handles code → test → verify as a deterministic sequence
- **Ralph Loop** handles overnight PRD execution for well-specified features
- **Me** writes the PRDs, reviews the PRs, makes the product decisions

The bottleneck is still me. But the blast radius of each decision I make is getting larger.

And if the pattern holds — it will. This workflow will be obsolete by the time you finish reading about it.

---

*This is a follow-up to [AI Abstraction Ate My Workflow](https://jnakano.com/blog/ai-abstraction-ate-my-workflow/). The research behind this post drew from OpenClaw's [official docs](https://docs.openclaw.ai), the [Ralph Loop plugin](https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md), [Continuous Claude](https://github.com/AnandChowdhary/continuous-claude), and dozens of real deployment writeups from the OpenClaw community. I'm [@jnakano](https://x.com/jnakano) on X if you want to argue about any of this.*
