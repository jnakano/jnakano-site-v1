---
title: "Welcome to My Blog - A Sample Post"
date: 2024-01-15
layout: layouts/post.njk
tags: 
  - post
  - welcome
  - web-development
excerpt: "This is a sample blog post to demonstrate the blog functionality, including syntax highlighting and Markdown features."
permalink: "/blog/{{ title | slugify }}/"
---

# Welcome to My Blog!

This is a sample blog post to demonstrate the blog functionality I've built using **Eleventy** and **Tailwind CSS**. This post showcases various Markdown features and syntax highlighting capabilities.

## What This Blog Will Cover

I plan to write about:

- Web development tips and tricks
- Technology insights and trends  
- Personal projects and experiments
- Lessons learned from coding

## Code Examples

Here's a JavaScript example with syntax highlighting:

```javascript
// A simple function to greet visitors
function greetVisitor(name) {
  const message = `Hello, ${name}! Welcome to my blog.`;
  console.log(message);
  return message;
}

// Usage
const greeting = greetVisitor('World');
document.getElementById('welcome').textContent = greeting;
```

And here's some CSS:

```css
/* Custom button styling */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: transform 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

## Lists and Formatting

Here are some things I'm excited about:

1. **Static Site Generation** - Fast, secure, and scalable
2. **Modern CSS** - Tailwind makes styling so much easier
3. **JavaScript Frameworks** - Always learning something new
4. **Open Source** - Contributing back to the community

### Inline Code

You can also use inline code like `npm install` or `console.log()` within sentences.

## Blockquotes

> "The best way to learn is by doing. The worst way to teach is by talking."
> — Someone wise (probably)

## Conclusion

This sample post demonstrates that the blog is working correctly with:

- ✅ Proper layout rendering
- ✅ Syntax highlighting for code blocks
- ✅ Tailwind Typography styling
- ✅ Date formatting
- ✅ Tag display
- ✅ Navigation between blog and posts

Thanks for reading! More posts coming soon. 