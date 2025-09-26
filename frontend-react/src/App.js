// // import React, { useState, useEffect, useRef } from 'react';
// // import { io } from 'socket.io-client';
// // import './App.css';

// // function App() {
// //   const [username, setUsername] = useState('');
// //   const [connected, setConnected] = useState(false);
// //   const [msg, setMsg] = useState('');
// //   const [messages, setMessages] = useState([]);
// //   const socketRef = useRef(null);

// //   useEffect(()=>{
// //     // fetch previous messages
// //     fetch(process.env.REACT_APP_API_URL + '/api/messages')
// //       .then(res => res.json())
// //       .then(data => setMessages(data))
// //       .catch(()=>{});

// //     return ()=>{
// //       if (socketRef.current) socketRef.current.disconnect();
// //     }
// //   },[]);

// //   const connect = () => {
// //     const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:4000');
// //     socketRef.current = socket;
// //     socket.on('connect', ()=>{
// //       setConnected(true);
// //       socket.emit('join', username || 'Anonymous');
// //     });
// //     socket.on('message', (m) => {
// //       setMessages(prev => [...prev, m]);
// //     });
// //   };

// //   const sendMessage = () => {
// //     if (!socketRef.current) return;
// //     const payload = { username: username || 'Anonymous', text: msg };
// //     socketRef.current.emit('message', payload);
// //     setMsg('');
// //   };

// //   return (
// //     <div className="container">
// //       <h2>ChatApp</h2>
// //       {!connected ? (
// //         <div className="connect">
// //           <input placeholder="Your name" value={username} onChange={e=>setUsername(e.target.value)} />
// //           <button onClick={connect}>Connect</button>
// //         </div>
// //       ) : (
// //         <div>
// //           <div className="chat-window">
// //             {messages.map((m,i)=>(
// //               <div key={i} className="message">
// //                 <strong>{m.username}</strong> <small>{new Date(m.createdAt).toLocaleTimeString()}</small>: {m.text}
// //               </div>
// //             ))}
// //           </div>
// //           <div className="composer">
// //             <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type a message" />
// //             <button onClick={sendMessage}>Send</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;


// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';
// import './App.css';

// function App() {
//   const [username, setUsername] = useState('');
//   const [connected, setConnected] = useState(false);
//   const [msg, setMsg] = useState('');
//   const [messages, setMessages] = useState([]);
//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom when messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   useEffect(() => {
//     // fetch previous messages
//     fetch(process.env.REACT_APP_API_URL + '/api/messages')
//       .then(res => res.json())
//       .then(data => setMessages(data))
//       .catch(()=>{});

//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//     }
//   }, []);

//   const connect = () => {
//     const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:4000');
//     socketRef.current = socket;
//     socket.on('connect', () => {
//       setConnected(true);
//       socket.emit('join', username || 'Anonymous');
//     });
//     socket.on('message', (m) => {
//       setMessages(prev => [...prev, m]);
//     });
//   };

//   const sendMessage = () => {
//     if (!socketRef.current || !msg.trim()) return;
//     const payload = { username: username || 'Anonymous', text: msg };
//     socketRef.current.emit('message', payload);
//     setMsg('');
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gradient-to-b from-purple-400 to-pink-300 text-white">
//       {/* Header */}
//       <header className="bg-purple-700 p-4 text-center text-3xl font-bold shadow-md">
//         ChatApp
//       </header>

//       {/* Connection screen */}
//       {!connected ? (
//         <div className="flex flex-col items-center justify-center flex-1">
//           <input
//             className="mb-4 p-3 rounded-xl w-64 text-black focus:outline-none focus:ring-2 focus:ring-purple-300"
//             placeholder="Enter your name"
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//           />
//           <button
//             className="bg-green-500 px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition"
//             onClick={connect}
//           >
//             Connect
//           </button>
//         </div>
//       ) : (
//         <div className="flex-1 flex flex-col p-4">
//           {/* Chat window */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-purple-600 rounded-xl shadow-inner">
//             {messages.map((m, i) => (
//               <div
//                 key={i}
//                 className={`p-3 rounded-xl max-w-xs break-words shadow-md ${
//                   m.username === username ? 'bg-green-500 self-end text-white' : 'bg-blue-500 self-start text-white'
//                 }`}
//               >
//                 <div className="flex justify-between items-center text-sm opacity-90 mb-1">
//                   <strong>{m.username}</strong>
//                   <span>{new Date(m.createdAt).toLocaleTimeString()}</span>
//                 </div>
//                 <div>{m.text}</div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Composer */}
//           <div className="mt-4 flex gap-2">
//             <input
//               className="flex-1 p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-300"
//               value={msg}
//               onChange={e => setMsg(e.target.value)}
//               placeholder="Type a message..."
//               onKeyPress={e => e.key === 'Enter' && sendMessage()}
//             />
//             <button
//               className="bg-green-500 px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition"
//               onClick={sendMessage}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // fetch previous messages
    fetch(process.env.REACT_APP_API_URL + '/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(()=>{});

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    }
  }, []);

  const connect = () => {
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:4000');
    socketRef.current = socket;
    socket.on('connect', () => {
      setConnected(true);
      socket.emit('join', username || 'Anonymous');
    });
    socket.on('message', (m) => {
      setMessages(prev => [...prev, m]);
    });
  };

  const sendMessage = () => {
    if (!socketRef.current || !msg.trim()) return;
    const payload = { username: username || 'Anonymous', text: msg };
    socketRef.current.emit('message', payload);
    setMsg('');
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-pink-500 via-purple-600 to-yellow-400 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 p-4 text-center text-3xl font-bold shadow-lg">
        ChatApp
      </header>

      {/* Connection screen */}
      {!connected ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <input
            className="mb-4 p-3 rounded-2xl w-64 text-black font-semibold placeholder-black focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter your name"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition"
            onClick={connect}
          >
            Connect
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-4">
          {/* Chat window */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl shadow-inner">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl max-w-xs break-words shadow-md ${
                  m.username === username 
                    ? 'bg-pink-600 self-end text-white' 
                    : 'bg-purple-800 self-start text-white'
                }`}
              >
                <div className="flex justify-between items-center text-sm opacity-90 mb-1">
                  <strong>{m.username}</strong>
                  <span>{new Date(m.createdAt).toLocaleTimeString()}</span>
                </div>
                <div>{m.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Composer */}
          <div className="mt-4 flex gap-2">
            <input
              className="flex-1 p-3 rounded-2xl text-black font-semibold placeholder-black focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
            />
            <button
              className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-2xl font-bold shadow-lg transition"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
