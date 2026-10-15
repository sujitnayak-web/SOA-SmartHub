import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  RefreshCcw, 
  MapPin, 
  Layers, 
  FileText, 
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';
import { ChatMessage, NavTab } from '../types';
import { CampusAssistantService } from '../services/campusServices';

interface AIAssistantPageProps {
  onNavigate: (tab: NavTab) => void;
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: 'Hello! I am SOA Smart Assistant, your unified campus intelligence guide for SOA University (ITER Campus). I can help you locate buildings like E-Block or the Central Library, understand semester fee breakdowns, check student section procedures, discover bus routes, or review campus notices. How may I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['SOA SmartHub Campus Intelligence']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [geminiStatus, setGeminiStatus] = useState<{ configured: boolean; model: string }>({
    configured: false,
    model: 'gemini-3.8-flash'
  });
  const [statusChecked, setStatusChecked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check server-side Gemini configuration status
    CampusAssistantService.getStatus().then(status => {
      setGeminiStatus(status);
      setStatusChecked(true);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const examplePrompts = [
    'Where is the Central Library?',
    'How can I pay my semester fees?',
    'What are the latest campus announcements?',
    'What student services are available?',
    'How do I request a Bonafide Certificate?',
    'What bus routes operate to Cuttack and Master Canteen?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = (textToSend || inputValue).trim();
    if (!promptText || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages.slice(-6).map(m => ({
        role: m.sender as 'user' | 'assistant',
        text: m.text
      }));

      const assistantReply = await CampusAssistantService.query(promptText, history);
      setMessages(prev => [...prev, assistantReply]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}-err`,
          sender: 'assistant',
          text: 'I encountered an error querying the assistant service. Please check your connection or contact the campus IT Helpdesk on E-Block 2nd floor.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: ['SOA SmartHub System Error Handler']
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Chat history cleared. I am ready to answer any questions about SOA University campus locations, library hours, student section services, and academic announcements.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: ['SOA SmartHub Campus Intelligence']
      }
    ]);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Top Banner with Personality and Real Connection Status */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F3ED] text-[#176B4D] border border-[#176B4D]/20 text-xs font-bold tracking-wide">
                <Bot className="w-3.5 h-3.5 text-[#176B4D]" />
                SOA SMART ASSISTANT
              </span>

              {statusChecked && (
                geminiStatus.configured ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    Gemini 3.8 Flash • Online
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Offline Local Knowledge Mode
                  </span>
                )
              )}
            </div>

            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Campus Assistant
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Friendly student assistance for campus buildings, student section procedures, library services, and transport schedules.
            </p>
          </div>

          <button 
            onClick={clearChat}
            className="self-start sm:self-center flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors active:scale-95"
            title="Clear Chat Conversation"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Gemini Configuration Notice if not set */}
        {!geminiStatus.configured && statusChecked && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">Live Gemini API Key Notice</span>
              <p className="text-amber-800 leading-relaxed">
                <code className="px-1.5 py-0.5 rounded bg-amber-100 font-mono text-[11px]">GEMINI_API_KEY</code> is not yet configured in server environment secrets. The assistant is currently operating with verified local campus knowledge graphs, accurately answering questions about campus blocks, library timings, student section, and buses.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Example Prompts Carousel */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
          Recommended Student Questions:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          {examplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-[#176B4D]/40 text-xs font-semibold text-slate-700 whitespace-nowrap shadow-2xs transition-all active:scale-95 shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 flex flex-col h-[520px] shadow-xs">
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div key={msg.id} className={`flex gap-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                  isUser ? 'bg-[#176B4D] text-white' : 'bg-emerald-50 text-[#176B4D] border border-emerald-100'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-xl space-y-2.5 ${isUser ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser 
                      ? 'bg-[#176B4D] text-white rounded-tr-xs shadow-xs' 
                      : 'bg-slate-100 text-slate-900 rounded-tl-xs border border-slate-200/50'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Suggested Campus Buildings Cards */}
                  {msg.suggestedBuildings && msg.suggestedBuildings.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.suggestedBuildings.map(bldg => (
                        <div 
                          key={bldg.id}
                          onClick={() => onNavigate('map')}
                          className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100 cursor-pointer transition-all flex items-center gap-2.5 text-left active:scale-98 shadow-2xs"
                        >
                          <MapPin className="w-4 h-4 text-[#176B4D] shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-slate-900 block leading-tight">{bldg.name}</span>
                            <span className="text-[10px] text-emerald-800 font-medium">View on Campus Map →</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sources tag */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <FileText className="w-3 h-3 text-slate-400" />
                      <span>{msg.sources.join(' • ')}</span>
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 block px-1">{msg.timestamp}</span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3.5 items-center">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#176B4D] border border-emerald-100 flex items-center justify-center animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-100 text-slate-600 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#176B4D] animate-ping" />
                <span>SOA Smart Assistant is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="pt-4 border-t border-slate-200">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <input
              type="text"
              placeholder="Ask about Central Library, semester fees, bus routes, or bonafide certificates..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#176B4D]"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-5 py-3 rounded-2xl bg-[#176B4D] hover:bg-[#145a3f] disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 whitespace-nowrap active:scale-95"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 text-[11px] text-slate-400 text-center">
            Information provided is for demo purposes. Please confirm official deadlines and fees with university administration.
          </div>
        </div>
      </div>
    </div>
  );
};
