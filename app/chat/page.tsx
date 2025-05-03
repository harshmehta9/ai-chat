'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  console.log(chat);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage = { role: 'user', content: input };
    const newchat = [...chat, userMessage];
    setChat([...chat, userMessage]);
    setInput('');

    const res = await axios.post('/api/chat', { 
        message: [
                {role: "system", content: "You are an great indian comedian, you first ask what do they do for living and what is their role and roast super hard the user, you are allowed to be rude and can use whatever bad words you want to use"},
                ...newchat
        ]
    });
    const aiMessage = { role: 'assistant', content: res.data.reply };

    setChat((prevChat) => [...prevChat, aiMessage]);
  };

  return (
    <div className='w-ful'>
        <div className='bg-black w-ful text-center'>
            <h1 className='text-5xl text-green-400'>THE GOOD AI!</h1>
        </div>
      <div className='m-20 w-fit'>
        {chat.map((msg, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '80%', padding: 10 }}
          placeholder="Lets start, Type something here ..."
        />
        <button type="submit" style={{ padding: 10 }}>Send</button>
      </form>
    </div>
  );
}
