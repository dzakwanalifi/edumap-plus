import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const dummyHistory: Message[] = [
  {
    role: 'assistant',
    content: 'Selamat datang di EduView! Saya adalah asisten AI yang siap membantu Anda menganalisis data sekolah. Apa yang ingin Anda ketahui?'
  },
  {
    role: 'user',
    content: 'Tunjukkan sekolah yang memerlukan perbaikan mendesak'
  },
  {
    role: 'assistant',
    content: 'Berdasarkan data yang ada, terdapat 3 sekolah yang memerlukan perbaikan mendesak dengan kondisi "Rusak Berat". Saya akan menampilkan sekolah-sekolah tersebut di peta dengan marker merah.'
  },
  {
    role: 'user',
    content: 'Bagaimana dengan distribusi sekolah berdasarkan jenjang pendidikan?'
  },
  {
    role: 'assistant',
    content: 'Di area yang ditampilkan, terdapat 2 SD, 2 SMP, dan 1 SMA. Distribusinya cukup merata di wilayah Jakarta Pusat, terutama di sekitar Menteng dan Cikini.'
  }
];

export function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(dummyHistory);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input 
    };
    setMessages([...messages, userMessage]);
    setInput('');

    // Dummy response
    const assistantMessage: Message = {
      role: 'assistant',
      content: 'Terima kasih atas pertanyaannya. Saya sedang menganalisis data untuk memberikan jawaban yang akurat.'
    };
    setTimeout(() => {
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      ) : (
        <div
          className={`bg-white rounded-lg shadow-xl transition-all transform ${
            isMinimized ? 'h-14' : 'h-[500px]'
          } w-[380px] flex flex-col`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium">EduSmart Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Tanyakan sesuatu..."
                    className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 