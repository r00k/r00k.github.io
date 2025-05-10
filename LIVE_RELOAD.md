# Live Reload Setup for Development

This site includes a live reload mechanism that automatically refreshes the page when changes are detected. This helps with development and previewing changes instantly.

## Basic Method (Always Works)

The site includes a JavaScript-based polling mechanism that checks for changes every 2 seconds. This is automatically loaded on every page and requires no additional setup.

## Enhanced Method (Faster and More Efficient)

For a better development experience with instant reloads, you can use the Ruby-based EventSource method:

1. Make sure Ruby is installed on your system
2. Install required gem:
   ```
   gem install listen
   ```
3. Start the Jekyll server as usual:
   ```
   bundle exec jekyll serve
   ```
4. In a separate terminal, start the LiveReload server:
   ```
   ruby livereload.rb
   ```
5. Visit your Jekyll site at http://localhost:4000

## How It Works

The live reload system works through two mechanisms:

1. **EventSource**: When running the Ruby server, it watches for file changes and pushes notifications to the browser through Server-Sent Events.
2. **Polling Fallback**: If the EventSource connection fails or isn't available, the script falls back to periodically checking for changes by requesting the page's headers and looking for Last-Modified changes.

## Troubleshooting

- If you see console errors about the EventSource connection failing, that's normal when the Ruby server isn't running. The system will automatically fall back to polling.
- If the page isn't refreshing when you make changes, check your browser console for any errors.
- To disable live reload temporarily, you can open your browser's developer console and run: `window.stopLiveReload = true;`