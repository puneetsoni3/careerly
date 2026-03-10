'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, User, Loader2, Lightbulb } from 'lucide-react';
import { getChatMessages, addChatMessage, getProfile } from '@/lib/store';
import type { ChatMessage } from '@/lib/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const suggestedQuestions = [
  '💡 What should I learn next?',
  '📝 How to build a strong resume?',
  '🎯 Prepare me for interviews',
  '💻 Suggest a portfolio project',
  '📊 How to crack coding interviews?',
  '🤔 Am I on the right track?',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const profile = useRef(getProfile());

  useEffect(() => {
    setMessages(getChatMessages());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMsg = addChatMessage('user', content.trim());
    setMessages([...userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: userMsg.map(m => ({ role: m.role, content: m.content })),
          profile: profile.current,
        }),
      });
      const data = await res.json();
      const updated = addChatMessage('assistant', data.content);
      setMessages([...updated]);
    } catch {
      const updated = addChatMessage('assistant', "Sorry, I'm having trouble connecting. Please try again!");
      setMessages([...updated]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-amber flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-bg-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>AI Career Mentor</h1>
          <p className="text-xs text-text-secondary">Powered by Claude • Ask anything about your career</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan/20 to-amber/20 flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-cyan" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
            <p className="text-text-secondary text-sm mb-6">Ask me anything about your career journey!</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
              {suggestedQuestions.map((q, i) => (
                <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage(q.replace(/^.*? /, ''))}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-border-glass text-sm text-text-secondary hover:text-text-primary hover:bg-white/10 transition-all">
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-amber flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-bg-primary" />
              </div>
            )}
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-cyan/10 border border-cyan/20 text-text-primary rounded-br-md'
                : 'glass text-text-primary rounded-bl-md'
            }`}>
              {msg.role === 'assistant' ? (
                <div className="prose prose-invert prose-sm max-w-none [&_p]:mb-2 [&_ul]:mb-2 [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_code]:bg-white/10 [&_code]:px-1 [&_code]:rounded [&_pre]:bg-white/5 [&_pre]:rounded-lg [&_pre]:p-3">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-text-secondary" />
              </div>
            )}
          </motion.div>
        ))}

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-amber flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-bg-primary" />
            </div>
            <div className="glass px-4 py-3 rounded-2xl rounded-bl-md">
              <Loader2 className="w-5 h-5 text-cyan animate-spin" />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions floating */}
      {messages.length > 0 && messages.length < 6 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {suggestedQuestions.slice(0, 3).map((q, i) => (
            <button key={i} onClick={() => sendMessage(q.replace(/^.*? /, ''))}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-border-glass text-xs text-text-muted hover:text-text-secondary whitespace-nowrap transition-all">
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="glass rounded-2xl p-2 flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
          placeholder="Ask your AI career mentor..."
          className="flex-1 bg-transparent px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none"
          disabled={loading}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="px-4 py-3 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan hover:bg-cyan/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
