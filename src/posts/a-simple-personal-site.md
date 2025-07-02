---
title: "My Vibe Coded Personal Site"
date: 2025-06-28
layout: "layouts/post.njk"
tags: 
  - post
  - eleventy
  - jamstack
  - workflow
excerpt: "Tired of the constant maintenance of platforms like WordPress, I decided to build a new personal site based on three principles: effortless maintenance, zero cost, and zero friction. Here's the modern Jamstack that made it possible."
permalink: "/blog/{{ title | slugify }}/"
---

I used to maintain a personal site via WordPress that at some point I just stopped updating. Life happens—updates become a chore, WordPress plugins become outdated and need constant maintenance, security patches pile up. The whole thing becomes this nagging digital burden sitting in the back of your mind.

Now that I'm deep into vibe coding, I thought it would be fun to build a low-maintenance personal site to see how effortlessly I could create something for practically free.

## The Three Hard Rules

Before writing a single line of code, I set three non-negotiable principles for this project. This wasn't going to be a sprawling, feature-creepy application:

1.  **It Must Be Effortless to Maintain**: The ultimate goal was a "fire and forget" workflow. I wanted publishing a new post to be as simple as writing a text file and pushing it to Git. No databases, no admin dashboards, no security updates to run.
2.  **It Must Be (Practically) Free**: This was a "for-fun" project, not a business venture. I wanted to leverage the incredibly generous free tiers offered by modern hosting platforms and open-source tools. Total cost: $0.
3.  **It Must Have Zero Friction**: From writing content to seeing it live, every step should feel fast and intuitive. If any part of the process felt like a chore, it was the wrong approach.

## The Stack That Just Works

With my principles defined, finding the right tools was straightforward. I landed on what's become a modern classic for building fast, content-driven websites—the Jamstack:

-   **The Engine: Eleventy (11ty)**
    Eleventy is a wonderfully simple static site generator. It takes your content (like this Markdown file), combines it with templates, and outputs plain, fast HTML files. There's no complex framework, no client-side JavaScript by default—just pure speed. It's the no-nonsense engine that makes everything run smoothly.

-   **The Design System: Tailwind CSS**
    I didn't want to write a single line of custom CSS. Tailwind CSS is a utility-first framework that lets you build beautiful designs directly in your HTML. The `@tailwindcss/typography` plugin handles all the heavy lifting for blog posts, automatically styling content like this with clean, polished typography right out of the box.

-   **The Writing Experience: Markdown**
    Every post, including this one, is just a simple text file written in Markdown. It's the ultimate low-friction format. I can write in any text editor, on any device, and version control it with Git. No clunky WYSIWYG editors, no weird HTML formatting quirks. Just words.

-   **The Deployment Machine: Netlify**
    Netlify connects my code to the live internet for free. I connected my GitHub repository, and now every time I `git push`, Netlify automatically builds and deploys the site in under a minute. It handles hosting, global CDN, and SSL certificates without me thinking about it.

## The Workflow in Action

What does it actually look like to publish a post? It's almost comically simple:

1.  Open my code editor and create a new file in the `/posts` folder.
2.  Add a few lines of front matter at the top (title, date, basic metadata).
3.  Write the post in Markdown.
4.  Commit and push to GitHub.

That's it. A minute later, the post is live.

## Why This Approach Works

Building this site brought back the simple joy of creating for myself. It met all my goals: it's fast, free, and so easy to update that it never feels like a burden. No more WordPress maintenance anxiety, no more plugin update hell, no more server costs eating into my coffee budget.

The whole thing runs on what I call "vibe-powered infrastructure"—tools that just work without getting in your way.

If you've got a digital ghost town of your own, maybe it's time for a refresh. The tools available today have made it easier than ever to build something simple and maintainable without the cost or complexity baggage.

*The entire source code for this website is public on [GitHub](https://github.com/jnakano/jnakano-site-v1). Feel free to take a look, fork it, and build your own version. Sometimes the best way forward is to start fresh with the right tools.*

Obviously, this approach isn't for everyone. If you need complex user management, e-commerce, or dynamic functionality, you'll need something more robust. But for a personal site where you just want to write and share ideas? This stack is perfect.