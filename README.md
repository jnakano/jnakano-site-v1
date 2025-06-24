# J Nakano - Personal Website

A modern, fast personal website and blog built with [Eleventy](https://www.11ty.dev/) and [Tailwind CSS](https://tailwindcss.com/).

## Features

- 🚀 **Fast & Modern**: Built with Eleventy static site generator
- 🎨 **Beautiful Design**: Clean, responsive design with Tailwind CSS
- 📝 **Blog System**: Full-featured blog with syntax highlighting
- 🔍 **SEO Optimized**: Meta tags, sitemap, and RSS feed
- ♿ **Accessible**: WCAG compliant with skip links and semantic HTML
- 📱 **Mobile First**: Responsive design that works on all devices

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The site will be available at `http://localhost:8080`

## Project Structure

```
├── src/
│   ├── _data/           # Global data files
│   │   └── site.json    # Site configuration
│   ├── _includes/       # Templates and layouts
│   │   ├── layouts/     # Page layouts
│   │   │   ├── base.njk # Base HTML layout
│   │   │   └── post.njk # Blog post layout
│   │   └── partials/    # Reusable components
│   │       ├── header.njk
│   │       └── footer.njk
│   ├── assets/          # Static assets
│   │   ├── css/         # Stylesheets
│   │   └── js/          # JavaScript files
│   ├── posts/           # Blog posts (Markdown)
│   ├── public/          # Static files (copied to output)
│   ├── index.njk        # Homepage
│   ├── about.njk        # About page
│   └── blog.njk         # Blog listing page
├── _site/               # Generated site (ignored)
├── .eleventy.js         # Eleventy configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies and scripts
```

## Creating a New Blog Post

To create a new blog post, follow these steps:

### 1. Create the Post File

Create a new Markdown file in the `src/posts/` directory. Use a descriptive filename like `my-awesome-post.md`.

### 2. Add Front Matter

Every blog post must include front matter at the top of the file with these required fields:

```markdown
---
title: "Your Post Title"
date: 2024-01-15
layout: layouts/post.njk
tags: 
  - post
  - your-category
  - another-tag
excerpt: "A brief description of your post that will appear in the blog listing."
permalink: "/blog/{{ title | slugify }}/"
---
```

**Required Fields:**
- `title`: The title of your post (will appear in `<title>` tag and as the main heading)
- `date`: Publication date in YYYY-MM-DD format (used for sorting)
- `layout`: Must be `layouts/post.njk` for blog posts
- `tags`: Array of tags (always include "post" as the first tag)
- `excerpt`: Brief description for the blog listing page
- `permalink`: URL structure (the template shown above works well)

### 3. Write Your Content

After the front matter, write your post content in Markdown:

```markdown
# Your Main Heading

Your introduction paragraph here.

## Subheadings

Use `##` for main sections in your post.

### Smaller Sections

Use `###` for subsections.

## Code Examples

For inline code, use `backticks`.

For code blocks, use triple backticks with language specification:

```javascript
function hello() {
  console.log("Hello, world!");
}
```

## Lists

- Bullet point lists
- Work great for
- Organizing information

1. Numbered lists
2. Are also supported
3. And automatically formatted

## Links and Images

[Link to another page](https://example.com)

![Alt text for image](/images/your-image.jpg)
```

### 4. Preview Your Post

1. Save your file
2. Run `npm start` if not already running
3. Navigate to `http://localhost:8080/blog/`
4. Your new post should appear in the listing
5. Click on it to see the full post

### 5. Publishing

When you're ready to publish:

1. Commit your changes: `git add . && git commit -m "Add new blog post: Your Title"`
2. Push to your repository: `git push`
3. If using Netlify, the site will automatically deploy

## Customization

### Site Configuration

Edit `src/_data/site.json` to update:
- Site title and description
- Author information
- Social links
- Contact information

### Styling

The site uses Tailwind CSS for styling:
- Main styles are in `src/assets/css/styles.css`
- Custom components can be added using Tailwind's `@apply` directive
- Syntax highlighting colors can be customized in the CSS file

### Adding Pages

To add a new static page:

1. Create a new `.njk` file in the `src/` directory
2. Add front matter with `layout: layouts/base.njk`
3. Add your content using HTML or Nunjucks templating
4. Update the navigation in `src/_includes/partials/header.njk`

## Deployment

### Netlify (Recommended)

This site is configured for easy Netlify deployment:

1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Netlify will automatically use the settings in `netlify.toml`
4. Your site will be live at your Netlify URL

The build command is `npm run build` and the publish directory is `_site`.

### Other Platforms

For other static hosting platforms:
1. Run `npm run build`
2. Upload the contents of the `_site` directory
3. Configure your hosting to serve the static files

## Development

### Available Scripts

- `npm start` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:css` - Build CSS only
- `npm run build:eleventy` - Build Eleventy only

### Technologies Used

- **[Eleventy](https://www.11ty.dev/)** - Static site generator
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Prism.js](https://prismjs.com/)** - Syntax highlighting
- **[Luxon](https://moment.github.io/luxon/)** - Date handling

## Contributing

This is a personal website, but if you notice any issues or have suggestions, feel free to open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE). 