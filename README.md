Code for benorenstein.com.

Forked from the delightful Chris Hunt.

## Local development

### Setup

1. Make sure you have Ruby and Node.js installed.
2. Install dependencies:
   ```bash
   bundle install
   npm install
   ```

### Development

The site uses Tailwind CSS for styling and Jekyll for static site generation. To start development:

1. Run the development server:
   ```bash
   npm run dev
   ```

This will:
- Start Jekyll server with live reload at http://localhost:4000
- Watch and compile Tailwind CSS changes

### Build for production

To build the site for production:

```bash
npm run build
```

This will:
1. Build the Tailwind CSS
2. Generate the Jekyll site

### CSS Structure

- CSS is built using Tailwind utility classes
- Custom components are defined in `/css/tailwind.css` using `@apply` directives
- Live reload is enabled for both CSS and content changes
