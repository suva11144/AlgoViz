import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendChatMessage, type ChatMessage } from '@/services/chatgptService';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Hello! I\'m your Algorithm Insight assistant. Ask me anything about algorithms, data structures, or how to use this visualizer!',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert to ChatMessage format for service
      const chatHistory: ChatMessage[] = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await sendChatMessage(input, chatHistory);

      if (response.error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.error,
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, errorMessage]);
      } else {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.content || 'Sorry, I could not process your request.',
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Bot Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        title="Open AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen && !isMobile ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={
              isMobile
                ? "fixed inset-0 z-[9999] w-full h-full bg-background rounded-none shadow-2xl border-none flex flex-col"
                : "fixed bottom-24 right-6 z-[9999] w-96 h-[600px] bg-background rounded-2xl shadow-2xl border border-border flex flex-col"
            }
            style={isMobile ? { maxWidth: '100vw', maxHeight: '100vh' } : {}}
          >
            {/* Header */}
            <div className={
              isMobile
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 flex items-center justify-between"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-t-2xl"
            }>
              <div>
                <h3 className="font-semibold">Algorithm Insight AI</h3>
                <p className="text-xs opacity-90">Ask me about algorithms</p>
              </div>
              {isMobile && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-2 p-1 rounded hover:bg-white/10 focus:outline-none"
                  aria-label="Close chat"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 space-y-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : message.content.includes('Error') || message.content.includes('error')
                            ? 'bg-destructive/10 text-destructive border border-destructive/50 rounded-bl-none'
                            : 'bg-secondary text-secondary-foreground rounded-bl-none'
                      }`}
                    >
                      <div className="flex gap-2 items-start">
                        {message.content.includes('Error') || message.content.includes('error') ? (
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        ) : null}
                        <div>
                          <p className="text-sm break-words">{message.content}</p>
                          <span className="text-xs opacity-70 block mt-1">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg rounded-bl-none">
                      <Loader className="w-4 h-4 animate-spin" />
                    </div>
                  </motion.div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-border p-4 space-y-3">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Powered by OpenAI API. Make sure your API key is configured.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
