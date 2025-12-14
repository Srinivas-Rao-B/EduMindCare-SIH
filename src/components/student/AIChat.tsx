import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Heart, Lightbulb, Shield } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'support' | 'motivation' | 'technique';
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI wellness companion. I'm here to listen, support, and help you navigate your mental health journey. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'support'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): { text: string; type: 'support' | 'motivation' | 'technique' } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
      return {
        text: "I understand you're feeling stressed. Let's try a quick breathing exercise: Breathe in for 4 counts, hold for 4, breathe out for 6. This can help activate your body's relaxation response. Would you like me to guide you through more techniques?",
        type: 'technique'
      };
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
      return {
        text: "I hear that you're going through a difficult time. It's completely normal to feel this way sometimes. Remember that your feelings are valid, and this difficult period will pass. Have you tried connecting with friends or engaging in activities you usually enjoy?",
        type: 'support'
      };
    }
    
    if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('study')) {
      return {
        text: "Academic pressure can be overwhelming! Here are some tips: Break your study sessions into 25-minute blocks with 5-minute breaks (Pomodoro technique). Remember to get adequate sleep and eat well. Your worth isn't defined by grades. Would you like specific study strategies?",
        type: 'motivation'
      };
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
      return {
        text: "Sleep is crucial for mental health. Try establishing a bedtime routine: avoid screens 1 hour before bed, keep your room cool and dark, and try relaxation techniques like progressive muscle relaxation. If sleep problems persist, consider speaking with a counselor.",
        type: 'technique'
      };
    }
    
    if (lowerMessage.includes('friend') || lowerMessage.includes('social') || lowerMessage.includes('lonely')) {
      return {
        text: "Social connections are vital for wellbeing. It's okay to feel lonely sometimes. Consider joining clubs or activities that interest you, or reach out to someone you haven't talked to in a while. Even small social interactions can help boost your mood.",
        type: 'support'
      };
    }
    
    // Default supportive responses
    const responses = [
      {
        text: "Thank you for sharing that with me. It takes courage to open up about how you're feeling. Remember that seeking support is a sign of strength, not weakness.",
        type: 'support' as const
      },
      {
        text: "I'm here to listen and support you. Your mental health matters, and you're taking a positive step by reaching out. What would be most helpful for you right now?",
        type: 'support' as const
      },
      {
        text: "You're not alone in this journey. Many students face similar challenges, and it's completely normal to have ups and downs. What small step could we take together today?",
        type: 'motivation' as const
      }
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        type: aiResponse.type
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const quickResponses = [
    "I'm feeling stressed about exams",
    "I'm having trouble sleeping",
    "I feel lonely and isolated",
    "I need motivation to study",
    "I'm feeling anxious"
  ];

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'support':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'motivation':
        return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'technique':
        return <Shield className="w-4 h-4 text-green-500" />;
      default:
        return <Bot className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Wellness Companion</h3>
            <p className="text-sm text-gray-500">Always here to listen and support</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {message.sender === 'ai' && (
                  <div className="flex items-center space-x-2 mb-1">
                    {getMessageIcon(message.type)}
                    <span className="text-xs font-medium opacity-70">
                      {message.type === 'support' && 'Support'}
                      {message.type === 'motivation' && 'Motivation'}
                      {message.type === 'technique' && 'Technique'}
                      {!message.type && 'AI Companion'}
                    </span>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 opacity-70`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Responses */}
      <div className="p-4 border-t border-gray-200">
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-2">Quick responses:</p>
          <div className="flex flex-wrap gap-2">
            {quickResponses.map((response) => (
              <button
                key={response}
                onClick={() => setInputText(response)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
              >
                {response}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
