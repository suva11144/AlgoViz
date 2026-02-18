import type { Express, Request, Response } from 'express';

interface ChatRequest {
  message: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export function setupChatRoutes(app: Express) {
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { message, messages } = req.body as ChatRequest;
      const apiKey = process.env.OPENAI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          content: 'Error: OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment.',
        });
      }

      if (!message || !messages) {
        return res.status(400).json({ content: 'Invalid request format' });
      }

      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
              content: 'You are a helpful assistant specializing in algorithms, data structures, and computer science education. Provide clear, concise explanations with examples when helpful.',
            },
            ...messages,
            { role: 'user', content: message },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('OpenAI API error:', error);
        return res.status(response.status).json({
          content: `API Error: ${error.error?.message || 'Unknown error'}`,
        });
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || 'No response generated';

      res.json({ content });
    } catch (error) {
      console.error('Chat route error:', error);
      res.status(500).json({
        content: 'Server error: Unable to process your request. Please try again.',
      });
    }
  });
}
