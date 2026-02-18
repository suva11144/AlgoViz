export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  content: string;
  error?: string;
}

const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

export async function sendChatMessage(
  message: string,
  conversationHistory: ChatMessage[]
): Promise<ChatResponse> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return {
      content: '',
      error: 'OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY in your .env.local file.',
    };
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant specializing in algorithms, data structures, and computer science concepts. You're integrated into an algorithm visualization platform called "Algorithm Insight" that helps users understand sorting, graph, search, and dynamic programming algorithms. 

When explaining algorithms:
- Be clear and concise
- Use relevant examples related to the algorithms in the visualizer
- Provide practical insights
- Keep responses under 500 tokens
- Focus on educational value

The platform includes visualizations for:
- Sorting algorithms (Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort)
- Graph algorithms (BFS, DFS, Dijkstra's, Prim's, Kruskal's, Bellman-Ford, Floyd-Warshall)
- Search algorithms (Linear Search, Binary Search)
- Dynamic Programming (Fibonacci, LCS, 0/1 Knapsack, Edit Distance)`,
          },
          ...conversationHistory,
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.error?.message || `HTTP ${response.status}: ${response.statusText}`;
      
      // Better error messages for common issues
      if (response.status === 401) {
        return {
          content: '',
          error: 'Invalid OpenAI API key. Please check your VITE_OPENAI_API_KEY in .env.local',
        };
      }
      if (response.status === 429) {
        return {
          content: '',
          error: 'Rate limit exceeded. Please wait a moment before sending another message.',
        };
      }

      return {
        content: '',
        error: `API Error: ${errorMessage}`,
      };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return {
        content: '',
        error: 'No response from OpenAI API',
      };
    }

    return { content };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Handle CORS errors
    if (errorMessage.includes('CORS') || errorMessage.includes('cors')) {
      return {
        content: '',
        error: 'CORS error: The OpenAI API request was blocked. This may be a browser security restriction.',
      };
    }

    return {
      content: '',
      error: `Error: ${errorMessage}`,
    };
  }
}
