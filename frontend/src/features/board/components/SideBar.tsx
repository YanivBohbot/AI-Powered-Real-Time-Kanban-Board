import { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X, Sparkles } from 'lucide-react';
import api from './../../../api/axios';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export function ChatSidebar({ boardId }: { boardId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hi! I am your AI Consultant. I can see all your tasks. How can I help?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.post('/chat', {
        message: userMsg,
        boardId: boardId
      });

      setMessages(prev => [...prev, { role: 'ai', content: res.data.answer }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error connecting to the server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 h-14 w-14 bg-violet-600 hover:bg-violet-700 rounded-full flex items-center justify-center shadow-2xl text-white transition-all hover:scale-110 z-[9999] group"
      >
        <MessageSquare size={24} className="group-hover:hidden" />
        <Sparkles size={24} className="hidden group-hover:block" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-10 fade-in duration-200">
      {/* Header */}
      <div className="h-16 border-b border-dark-700 flex items-center justify-between px-6 bg-dark-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center text-violet-400">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">AI Consultant</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-gray-400">Online</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)} 
          className="text-gray-400 hover:text-white p-2 hover:bg-dark-700 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-900/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-violet-600 text-white rounded-br-sm' 
                : 'bg-dark-800 text-gray-200 border border-dark-700 rounded-bl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-dark-800 p-4 rounded-2xl rounded-bl-sm border border-dark-700 flex gap-2 items-center">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-dark-800 border-t border-dark-700">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-dark-900 text-white pl-4 pr-12 py-3.5 rounded-xl border border-dark-700 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 text-sm transition-all placeholder:text-gray-600"
            placeholder="Ask about your project..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            autoFocus
          />
          <button 
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-500 disabled:opacity-50 disabled:hover:bg-violet-600 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}