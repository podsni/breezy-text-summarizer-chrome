
export interface SummaryResponse {
  success: boolean;
  summary: string;
  error?: string;
}

export const extractPageContent = async (): Promise<string> => {
  try {
    if (typeof chrome === 'undefined' || !chrome.tabs || !chrome.scripting) {
      throw new Error("Chrome API not available");
    }

    const tabs = await new Promise<chrome.tabs.Tab[]>((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (result) => {
        resolve(result);
      });
    });
    
    if (!tabs || tabs.length === 0 || !tabs[0] || !tabs[0].id) {
      throw new Error("No active tab found");
    }
    
    // Execute script to extract content from the active tab
    const result = await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        // Get the page title
        const title = document.title;
        
        // Get all paragraph text
        const paragraphs = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li'))
          .map(element => element.textContent)
          .filter(text => text && text.trim().length > 20) // Filter out short text
          .join('\n\n');
        
        return `${title}\n\n${paragraphs}`;
      }
    });
    
    return result?.[0]?.result as string || '';
  } catch (error) {
    console.error('Error extracting page content:', error);
    return '';
  }
};

export const fetchUrlContent = async (url: string): Promise<string> => {
  try {
    // Proxy the request through a CORS-enabled API
    const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Extract content from HTML using DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Get the page title
    const title = doc.title;
    
    // Get all paragraph text (similar to the content extraction logic)
    const paragraphs = Array.from(doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li'))
      .map(element => element.textContent)
      .filter(text => text && text.trim().length > 20) // Filter out short text
      .join('\n\n');
    
    return `${title}\n\n${paragraphs}`;
  } catch (error) {
    console.error('Error fetching URL content:', error);
    throw new Error('Failed to fetch content from URL');
  }
};

export const generateSummary = async (apiKey: string, content: string): Promise<SummaryResponse> => {
  try {
    if (!apiKey) {
      return {
        success: false,
        summary: '',
        error: 'API key is required'
      };
    }

    if (!content || content.trim().length < 50) {
      return {
        success: false,
        summary: '',
        error: 'Not enough content to summarize'
      };
    }

    // Truncate content if it's too long (Gemini has token limits)
    const truncatedContent = content.slice(0, 25000);

    const promptText = `Please summarize the following text in a concise and informative way, capturing the main points and key details. Present the summary in clear, well-structured paragraphs:

${truncatedContent}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: promptText }]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
            responseMimeType: "text/plain"
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error?.message || 'Failed to generate summary';
      return {
        success: false,
        summary: '',
        error: errorMessage
      };
    }

    const summaryText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return {
      success: true,
      summary: summaryText
    };
  } catch (error: any) {
    return {
      success: false,
      summary: '',
      error: error.message || 'An error occurred'
    };
  }
};
