import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `คุณเป็นผู้ช่วยของบริษัท Evergreen ซึ่งเป็นบริษัทจำหน่ายสินค้าตกแต่งบ้าน ได้แก่ ประตู (Door), วงกบ (Doorframe), พื้นไม้ (Flooring), บันได (Staircase), ผนังไม้ (Wall Panel), และปล่องบริการ (Service Shaft)
ตอบคำถามสั้นกระชับ เป็นมิตร ช่วยเหลือลูกค้าเรื่องสินค้าและบริการ
ถ้าลูกค้าถามภาษาไทยให้ตอบเป็นภาษาไทย ถ้าถามภาษาอังกฤษให้ตอบเป็นภาษาอังกฤษ`;

export const ChatBot: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          text: t(
            'Hello! Welcome to Evergreen. How can I help you today?',
            'สวัสดีค่ะ! ยินดีต้อนรับสู่ Evergreen มีอะไรให้ช่วยไหมคะ?'
          ),
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  const sendToGemini = async (userMessage: string): Promise<string> => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return t(
        'Sorry, the chatbot service is currently unavailable. Please contact us directly.',
        'ขออภัยค่ะ ระบบแชทบอทไม่พร้อมใช้งานในขณะนี้ กรุณาติดต่อเราโดยตรงค่ะ'
      );
    }

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${userMessage}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || t(
        'Sorry, I could not process your request.',
        'ขออภัยค่ะ ไม่สามารถประมวลผลคำขอของคุณได้'
      );
    } catch {
      return t(
        'Sorry, something went wrong. Please try again later.',
        'ขออภัยค่ะ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งค่ะ'
      );
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: Date.now(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const botReply = await sendToGemini(trimmed);

    const botMsg: Message = {
      id: Date.now() + 1,
      text: botReply,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 flex flex-col overflow-hidden animate-[fadeInUp_0.3s_ease-out]">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Evergreen Bot</h3>
                <p className="text-white/80 text-xs">
                  {t('Online', 'ออนไลน์')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-orange-100 dark:bg-orange-900/30'
                      : 'bg-stone-100 dark:bg-stone-800'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <User size={14} className="text-orange-600 dark:text-orange-400" />
                  ) : (
                    <Bot size={14} className="text-stone-600 dark:text-stone-400" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-orange-500 text-white rounded-br-md'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-stone-100 dark:bg-stone-800">
                  <Bot size={14} className="text-stone-600 dark:text-stone-400" />
                </div>
                <div className="bg-stone-100 dark:bg-stone-800 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-stone-200 dark:border-stone-700 p-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('Type a message...', 'พิมพ์ข้อความ...')}
                className="flex-1 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-orange-500 hover:bg-orange-600 disabled:bg-stone-300 dark:disabled:bg-stone-700 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? 'bg-stone-700 hover:bg-stone-800 rotate-0'
            : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </button>
    </>
  );
};
