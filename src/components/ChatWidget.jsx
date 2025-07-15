import { useState, useEffect, useRef } from 'react';
import { useProducts } from '../contexts/ProductContext';

function ChatWidget() {
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Chào bạn, tôi là trợ lý AI. Tôi có thể giúp gì cho bạn?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Bot response logic
    setTimeout(() => {
      const lowerCaseInput = inputValue.toLowerCase();
      let botResponse = 'Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể hỏi về các chủ đề như "lập trình", "thiết kế", hoặc "tiếng anh" không?';
      
      const matchingProducts = products.filter(p => lowerCaseInput.includes(p.category.toLowerCase()));
      if(matchingProducts.length > 0) {
        const foundProduct = matchingProducts[Math.floor(Math.random() * matchingProducts.length)];
        botResponse = `Aha! Về chủ đề ${foundProduct.category}, tôi thấy có khóa học "${foundProduct.name}" rất hay. Bạn có muốn xem thử không?`;
      }
      
      const botMessage = { text: botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <div className={`absolute bottom-20 right-0 w-[380px] max-h-[600px] bg-white rounded-2xl shadow-2xl 
        transform transition-all duration-300 origin-bottom-right overflow-hidden
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-primary rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.241 2.013L16.5 14.5m-7.5 0h7.5m-7.5 0c-.186.018-.378.032-.57.041M16.5 14.5c.186.018.378.032.57.041m0 0A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Trợ lý AI</h3>
              <span className="text-xs text-white/80">Luôn sẵn sàng hỗ trợ</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} 
            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-6 bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-text shadow-sm rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-primary"
            />
            <button type="submit" 
              className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-14 h-14 bg-primary rounded-full text-white shadow-lg hover:shadow-xl
                   flex items-center justify-center transform hover:scale-110 transition-all duration-300">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
}

export default ChatWidget; 