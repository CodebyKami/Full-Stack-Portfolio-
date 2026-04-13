import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am your AI portfolio assistant. How can I help you today? I can show you projects, explain skills, or even generate a proposal for your next project!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post('/api/ai', {
        message: userMessage,
        context: { page: window.location.pathname }
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error: any) {
      console.error('AI Chat Error:', error);
      const errorMessage = error.response?.data?.details || 
        (error.response?.status === 500 
          ? "I'm having trouble connecting to my brain right now. Please ensure the API keys are configured correctly in the settings."
          : "Sorry, I encountered an error. Please try again later.");
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px]"
          >
            <Card className="flex h-[500px] flex-col overflow-hidden border-primary/20 bg-background/80 backdrop-blur-xl shadow-2xl shadow-primary/10">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-primary/10 bg-primary/5 p-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute -inset-1 animate-pulse rounded-full bg-primary/20 blur-sm"></div>
                    <Bot className="relative h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Aura Assistant</h3>
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Online</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "flex gap-3",
                        msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                        msg.role === 'user' ? "bg-secondary border-secondary" : "bg-primary/10 border-primary/20"
                      )}>
                        {msg.role === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4 text-primary" />}
                      </div>
                      <div className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                        msg.role === 'user' 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-muted text-muted-foreground rounded-tl-none border border-primary/5"
                      )}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-primary/10 border-primary/20">
                        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-none border border-primary/5 px-4 py-2">
                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40"></span>
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:0.2s]"></span>
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:0.4s]"></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t border-primary/10 p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border-primary/10 bg-primary/5 focus-visible:ring-primary/30"
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="shrink-0 shadow-lg shadow-primary/20">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-16 w-16 rounded-full shadow-[0_0_30px_rgba(200,245,56,0.3)] transition-all duration-500 hover:scale-110 active:scale-95 group relative overflow-hidden",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X className="h-7 w-7 text-white" />
        ) : (
          <Bot className="h-7 w-7 text-black group-hover:rotate-12 transition-transform" />
        )}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white shadow-lg animate-bounce">
            1
          </span>
        )}
      </Button>
    </div>
  );
}
