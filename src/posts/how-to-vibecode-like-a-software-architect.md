---
title: "How to Vibe Code like a Software Architect"
date: 2025-06-30
layout: "layouts/post.njk"
tags: 
  - post
  - ai
  - development
  - architecture
excerpt: "Vibe coding with LLMs is powerful, but often leads to 'context spaghetti' on complex projects. Here’s how to leverage traditional software engineering principles to overcome it."
permalink: "/blog/{{ title | slugify }}/"
---

## How to Vibe Code like a Sfotware Architect
Vibe coding has evolved far beyond what most people realize. We've moved from manually copying and pasting code snippets to having ChatGPT, Replit, Lovable, v0, and Cursor make it possible to build entire applications. My breakthrough moment came a while back when Claude Sonnet 3.5 was released—even while manually copying and pasting code for side projects, I was moving 5x quicker compared to my traditional dev days. I knew the old paradigm of coding 100% manually was gone. 

Now with how advanced Cursor has become, the old ways of manually copy/pasting snippets are completely gone. You can simply accept code changes and move extremely fast.

But here's the problem: if not done properly, most people hit what I call "context spaghetti."

After watching several friends hit this wall—and hearing countless stories online of people losing faith in LLMs for building—I wanted to share how I've been able to work around this issue.

## The Context Problem

You can one-shot simple landing pages or straightforward projects without much trouble. However, without deliberate planning and proper context management, vibe coding will only take you so far. Most developers become overly reliant on context window length without understanding how tokens actually work. They hit a wall where adding new features breaks something else—one step forward, two steps backward.

LLMs like ChatGPT have a fixed context window (a maximum number of tokens they can process). The best metaphor I have for understanding this is a sushi bar conveyor belt with a fixed length:

- **Fixed context window**: Imagine a sushi bar with a conveyor belt that can hold, say, 100 plates of sushi (representing tokens). This is the LLM's context window—there's a hard limit on how much it can hold at once.
- **Tokens as sushi plates**: Each plate represents a token, and plates come in different types and sizes.
- **Sliding window**: As you add new plates (tokens), they're placed at the end of the conveyor belt. If the belt is full, the oldest plates at the front fall off to make room, just like older tokens are dropped from the context window.

So if your project gets big enough to reach the context limit, you start getting into "context spaghetti" territory. The LLM loses track of earlier decisions, architectural patterns, and project context—leading to inconsistent code and broken functionality.

This is where traditional software engineering wisdom becomes invaluable. There's a reason why Software Development Life Cycle (SDLC) best practices have stood the test of time—we can leverage them to solve the context problem.

## Learning from SDLC

At the core, SDLC is a structured process for planning, creating, testing, and deploying. Vibe coders without a software background tend to skip the planning stage (or don't spend enough time there) and jump straight to creating. This works fine for simple projects, but it doesn't fly with medium to complex projects.

Every company has their preferred process for engaging with project scope and system design—translating business requirements into a clear blueprint that outlines engineering tasks. This typically results in a PRD (Product Requirements Document) and sometimes a Technical Requirements Document or architecture document.

To be able to "one-shot" a complex project and handle all these moving parts with a simple prompt and no context simply isn't tenable.

As a software architect, my past roles focused on de-risking upfront as much as possible and choosing the foundational architecture and tech stack to meet current and future business requirements. Having a comprehensive PRD and architecture doc helps tremendously with this approach. A very comprehensive and clear PRD enables the AI to implement features effectively by breaking the PRD into manageable, bite-sized tasks.

Once you can create these bite-sized tasks, you can start to manage context effectively.

## The Elephant Approach

How do you eat an elephant? Chunk by chunk. Complex projects are exactly like this elephant.

The PRD is the crux of this because it allows the creation of smaller tasks. You're essentially using the PRD and tasks as a way of storing context—serving as a constant reminder to the LLM on what's done, what's in progress, and what's yet to be done. The LLM has a way of knowing where you're at.

You can manage this by having a master doc of all your tasks and some type of document tracker showing what's pending, in progress, and completed. I was about to set this up manually before learning about taskmaster-ai. I found I was recreating the wheel and didn't need to.

## My Current Workflow

Here's how I approach complex projects now:

1.  **Comprehensive PRD**: I start with a comprehensive PRD using an LLM like ChatGPT (o3), Claude, or Gemini with their latest reasoning models.
2.  **Task Master**: Task Master is an excellent MCP plugin that ingests a PRD and breaks it down into smaller, manageable components.
3.  **Cursor + LLM Model**: I use Cursor for code generation (I prefer Sonnet 4 for dev tasks), specifically referencing folders and files relevant to each task. Once a task is complete, I open a new Cursor composer window.
4.  **Repo Prompt**: Repo Prompt is a powerful tool with many features, but I primarily use it to select the files that Cursor changed along with the file tree structure. This lets me efficiently paste everything into Google AI Studio with the exact context I want. Sometimes I ask it to summarize key code changes, but I try to follow and understand the important parts myself.
5.  **Google AI Studio**: AI Studio's 1 million token context window allows me to paste new changes and get a second opinion on potential bugs or critical issues that might arise.
6.  **GitHub**: I use GitHub for version control—committing changes as I complete each task and creating new branches for larger features.

The complete workflow:
**PRD → Task Master (break into tasks) → Cursor + Sonnet 4 (code generation) → Repo Prompt (extract changes) → Google AI Studio (code review) → GitHub (commit) → repeat**

The process becomes methodical: I use Cursor composer to work on each task chunk, feeding in the specific task context. Once Cursor completes the task, I use Repo Prompt to extract the changes, then ask Gemini 2.5 Pro via AI Studio to review for any critical callouts or potential issues.

After testing the feature (when possible), I mark the task complete in Task Master and commit changes via GitHub. Then I open a new composer window and start the next task.

Rinse and repeat until all tasks are completed.

## AI Abstraction and Looking Forward

AI tools are changing at such a rapid pace that once you've gotten comfortable with a workflow, a more effective tool gets introduced that probably makes your current stack obsolete. I suspect AI coding agents (Claude Code, Gemini CLI, etc.) at the time of this writing are getting good enough where you may not need to supervise the planning and task management I mentioned above—they'll handle parallel tasks via background agents.

My hypothesis is that for easy to medium complexity tasks (up to around ~200k tokens), AI agents can do unsupervised automated work. But for anything beyond that threshold, you still need a supervised workflow like the one I've outlined.

My next plan now is to experiment with AI agents like Claude Code to see which parts of my workflow they can automate. Stay tuned!