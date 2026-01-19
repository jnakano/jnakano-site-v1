---
title: "AI Abstraction Ate My Workflow"
date: 2025-01-19
layout: "layouts/post.njk"
tags: 
  - post
  - ai
  - development
  - workflow
excerpt: "My AI workflow is obsolete every six months. Here's how tool consolidation, the barrel problem, and multi-agent orchestration are reshaping how I build software."
permalink: "/blog/{{ title | slugify }}/"
---

In Q4 of 2025, I spent a few months at Network School. While there, someone conducting customer interviews about AI workflows asked me a simple question:

**"What's the biggest bottleneck in your process?"**

I expected to say something about tooling. Context windows. Prompt management. Some technical constraints.

Instead, the answer was embarrassingly human.

**The bottleneck is me.**

Specifically: **I need to sleep.**

For 6–8 hours a day, my AI agents sit idle. Not because the models can't work—but because the parts of the workflow that still matter require *me* to be present: steering Claude Code, feeding context, verifying outputs, starting new sessions, unblocking decisions. Once I log off, the entire pipeline pauses.

That question from the interview never left my head:

**What if my workflow could run while I sleep?**

But before I could answer it, I had to confront something I hadn't fully registered:

**My workflow was already obsolete.**

That's the core problem with building AI workflows right now. The landscape shifts so fast that by the time you "dial it in," it's already outdated. If your system feels perfect, that's probably a signal that there's a more efficient way to do what you're doing.

Six months ago, I documented a workflow I dialed in on this post: *[How to Vibe Code Like a Software Architect](https://jnakano.com/blog/how-to-vibecode-like-a-software-architect/)*: PRD → Task Master → Cursor + Sonnet → Repo Prompt → Google AI Studio → GitHub.

Each tool had a specific job. I was the glue holding them together. Six months ago, Cursor was the main tool and Claude Code was still early.

Now? This past stack is dead. I get better results now from one or two tools than I did from six.

## What Changed: Spring 2025 vs. Late 2025

Six months ago, my workflow looked like a toolchain. Each piece did one job, and I stitched everything together manually.

**Then (Q1/Q2 2025): the six-tool stack**

- **ChatGPT / Claude** → write the PRD
- **Task Master** → break down tasks
- **Cursor + Sonnet** → generate code
- **Repo Prompt** → extract context + diffs
- **Google AI Studio** → second-opinion code review
- **GitHub** → version control

**Now (late 2025): the condensed stack**

- **Claude Code (Opus 4.5)** → daily driver
- **Cursor** → quick edits
- **Gemini 3 Pro** → frontend passes
- **Codex 5.2** → big refactors
- **GitHub** → version control

That's it.

Claude Code didn't just replace one tool — it **absorbed the entire middle of the pipeline**.

## What Got Eaten

The biggest shift wasn't adding anything new.

It was realizing how much I stopped needing.

**Task Master disappeared.**

Claude Code now does the planning and tracking loop in one place. I feed it a PRD, request an implementation plan, and it produces an executable task sequence. When the project is larger, I'll have it generate a dedicated task breakdown document with status fields (Not Started → In Progress → Done).

**Repo Prompt disappeared.**

I used to extract diffs and context manually so I could paste them into another model for review. Now I don't shuttle context between tools. I stay inside Claude Code and keep the whole loop contained.

**Google AI Studio code review disappeared.**

This one surprised me. I used AI Studio's massive context window as a safety net — a second opinion to catch subtle bugs. Now my "second opinion" is the test suite. Opus 4.5 is strong enough that I don't need to constantly model-hop for reassurance.

**Cursor got demoted.**

It used to be the engine. Now it's a utility player — great for small edits when I don't want to spin up a full Claude session.

## The Current Workflow

The day-to-day loop is boring in the best way:

- Start with a solid PRD
- Maintain a task list: Not Started → In Progress → Done
- Run Claude Code in plan mode first
- Let it implement
- Run automated tests + manual verification
- Update changelog → commit → push to GitHub
- Manage context (/context, clear when needed), repeat

If tasks don't conflict — different files, independent features — I'll run two or three Claude sessions in parallel.

## The Role Shift

My job has quietly changed. I'm no longer a "developer who uses AI tools."

I'm an **AI Agent Orchestrator** and **Context Feeder**.

Most of my time now happens *before* code gets written:

- refining the PRD
- structuring tasks clearly
- deciding what context the model needs

The actual implementation? That's increasingly Claude's job. I steer, verify, and manage context. The model does the building.

## The Ceiling

This workflow is the best I've ever had thus far. It's fast, streamlined, and I trust the outputs. But there's still a ceiling, and it's not the tools.

It's me.

Three things still require a human in the loop:

1. **Approving and adjusting plans** — Claude's implementation plans are good, but I still review them before execution. Sometimes I catch misunderstandings or steer toward a simpler approach.
2. **Verification and testing** — Automated tests catch a lot, but not everything. My current project sits behind two OAuth logins—Playwright won't cut it. I've had success with cURL for backend endpoints, but frontend verification still needs my eyes.
3. **Context management** — Knowing when to clear context, what files to feed in, when to start fresh. Claude can't see its own context degrade. I can.

And then there's the obvious constraint: I need to sleep.

I can run two—maybe three—parallel sessions before my brain starts overheating and decision quality drops. When I log off, my agents sit idle until morning.

That's **eight hours of idle compute. Every day.**

The equivalent of an engineering team staring at the wall until I wake up.

I've spent months optimizing this workflow, and the irony: bottleneck is now me. The tools are ready to go further. I'm the one holding them back.

Which brings me back to the question that started this post:
***What if my workflow could run while I sleep?***

To answer that, I had to look at what I actually do—and ask which parts an AI could take over.

## The Barrel Problem

Keith Rabois has a useful framework for leverage inside organizations: [barrels and ammunition](https://review.firstround.com/keith-rabois-on-the-role-of-a-coo-how-to-hire-and-why-transparency-matters/).

Most companies hire aggressively and assume velocity will scale. It often doesn't. You add engineers and somehow ship the same amount—or less. The reason is that most people aren't the limiting factor.

Most people are ammunition.

What you actually need are barrels.

A barrel is someone who can take an idea from vague to shipped: define the work, sequence it, make decisions, drive momentum, and bring others along. Barrels are rare, culturally specific, and hard to replace. In practice, your company's velocity is constrained by the number of barrels—not the amount of ammunition.

Here's what I realized:

In my current workflow, I'm the only barrel.

Claude Code, Cursor, Gemini, Codex—these are all ammunition. Powerful ammunition. But they still fire *through me.* I'm the one translating intent into tasks, managing context, approving plans, validating outputs, deciding what to do next. Add more tools and nothing fundamentally changes.

I'm still the bottleneck.

That reframing made the problem obvious. The question isn't, "How do I make the ammunition more powerful?"

The tools are already strong enough.

The real question is: ***How do I create more barrels?***

What if an AI agent could become a barrel—taking a task from conception to shipping with minimal oversight? If I could spin up multiple AI barrels, I'm no longer capped by my attention span or sleep schedule. I go from a one-barrel operation to a three-barrel operation overnight.

That's the unlock.

**Not better tools. More barrels.**

## The Next Frontier: Multi-Agent Orchestration

So what do "more barrels" actually look like in practice?

In October 2025, I was bouncing between different AI CLI tools—Claude Code, Gemini CLI, Codex—when something clicked:

**They all have access to the same filesystem.**

And if my role is "context + verification," then the obvious question is:

Why can't one AI do that job for another?

Instead of me orchestrating a single agent end-to-end, the next step is orchestrating multiple agents with specialized roles:

- **Worker:** implements changes
- **Supervisor:** validates, enforces quality gates, manages context, decides when to reset

My first prototype is intentionally crude. It uses a shared file as a coordination protocol.

- **Claude** is the worker. It pulls the next task, implements it, runs tests, and writes status updates into master.md.
- **Codex** is the supervisor. It monitors master.md, checks whether tests passed, tracks failure modes, and tells Claude whether to continue, compact context, or stop and start a fresh session.

It's primitive—but the core mechanic works: two agents coordinating through a shared protocol, with automated quality gates.

The tradeoff was immediate and unavoidable:

**The more you automate, the more you need strict testing and precise planning upfront**.

Loose specs and flaky tests that you could manually work around? They'll break an unsupervised pipeline real fast.

## What's Next

A few months ago, multi-agent orchestration felt niche—most developers were still optimizing their Claude Code setups, exploring Skills and MCP. That's changed fast.

The Ralph Wiggum plugin has entered the chat.

If you've been on X lately, you've probably seen it everywhere. Ralph is a Claude Code plugin that implements autonomous development loops: essentially a while true wrapper that keeps Claude working until completion criteria are met. Claude tries to exit, a Stop hook blocks the exit, Claude sees the updated repo + git history from the previous iteration, and it loops again until it's actually done.

For power users, that's a real shift in posture. You stop "chatting with a coding assistant" and start managing *autonomous night shifts*. The AI stops being a pair programmer and starts acting like a relentless worker—iterating until the job clears the bar.

This is exactly the direction I've been heading.

Ralph solves persistence: keep one agent running until it finishes. Multi-agent orchestration adds coordination: specialized roles, quality gates, and handoffs—worker and supervisor, implementer and verifier.

And the recent surge of interest is a signal: the skill ceiling is moving. It's shifting from:

*"How do I prompt well?"*

to

*"How do I orchestrate agents at scale?"*

Over the coming weeks, I'll be experimenting aggressively—Claude as worker, Codex as supervisor, shared-file protocols, plus a more structured approach using the Claude Agent SDK. I'll report back with what holds up, what breaks under automation, and where the real bottlenecks move next.

The tools are ready. The barrels are coming.

And if the pattern holds, it's very possible this workflow will be obsolete by the time I finish writing about it.
