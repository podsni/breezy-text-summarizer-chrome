
# Breezy Text Summarizer - Chrome Extension

## Project Overview

Breezy Text Summarizer is a powerful Chrome extension that helps you quickly generate concise summaries of web pages using Google's Gemini AI. The extension offers two main ways to summarize content:

1. Summarize the current web page you're viewing
2. Summarize content from any URL you provide

## Features

- **Current Page Summarization**: Extract and summarize the content of your active browser tab with one click
- **URL-based Summarization**: Enter any URL to fetch and summarize its content
- **Original Content View**: View the extracted content before summarization
- **Content Metadata**: See word count, reading time, and source information
- **Secure API Key Management**: Safely store your Gemini API key in Chrome's local storage
- **Copy to Clipboard**: Easy one-click copying of generated summaries or original content
- **Modern UI**: Clean, responsive interface with a pleasant purple theme

## Installation Guide

### Development Installation

1. Clone this repository to your local machine
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. Install dependencies
   ```sh
   npm i
   ```

3. Build the extension
   ```sh
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" using the toggle in the top-right corner
   - Click "Load unpacked" and select the `dist` folder from your project directory
   - The Breezy Text Summarizer icon should now appear in your browser toolbar

### User Installation (When Published)

1. Visit the Chrome Web Store
2. Search for "Breezy Text Summarizer"
3. Click "Add to Chrome"
4. Confirm the installation when prompted

## How to Use

### Setting Up Your API Key

1. Click on the Breezy Text Summarizer icon in your Chrome toolbar
2. In the popup window, look for the "Gemini API Key" section
3. Enter your Gemini API key (obtain one from [Google AI Studio](https://makersuite.google.com/app/apikey))
4. Click "Save" to store your API key securely in your browser

### Summarizing the Current Web Page

1. Navigate to the web page you want to summarize
2. Click on the Breezy Text Summarizer icon
3. Make sure the "Current Page" tab is selected
4. Click the "Summarize This Page" button
5. The extension will:
   - Extract the page content
   - Display metadata (word count, reading time)
   - Generate an AI summary

### Summarizing Content from a URL

1. Click on the Breezy Text Summarizer icon
2. Switch to the "URL Input" tab
3. Enter the complete URL you want to summarize
4. Click the "Go" button
5. The extension will:
   - Fetch and extract content from the URL
   - Display metadata (word count, reading time)
   - Generate an AI summary

### Viewing Content and Summaries

- Switch between "Summary" and "Original Content" tabs to compare
- The summary tab shows the AI-generated summary
- The original content tab shows the extracted text from the webpage
- Metadata displayed includes:
  - Source URL
  - Word count
  - Estimated reading time

### Managing Your Summary

- To copy the summary or original content to your clipboard, click the Copy icon in the top-right corner of the respective tab
- You'll see a green checkmark and a notification when the text has been copied

## Troubleshooting

- **The Summarize Button is Disabled**: Make sure you've saved a valid Gemini API key
- **Error: "Could not extract content from this page"**: Some websites restrict content extraction; try the URL input method instead
- **Error: "Failed to generate summary"**: Check that your API key is valid and has not expired
- **Error: "Failed to fetch content from URL"**: Verify that the URL is correct and accessible

## Privacy Information

- Your API key is stored locally in your browser's storage
- Content from web pages is only sent to Google's Gemini API for summarization
- No data is permanently stored on external servers

## Development

This project is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

To make changes to the codebase:
```sh
# Install dependencies
npm i

# Start the development server
npm run dev

# Build for production
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
