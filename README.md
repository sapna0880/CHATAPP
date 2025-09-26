# MERN Real-time Chat (JavaScript)

This project contains:
- backend: Node.js + Express + Socket.IO + Mongoose (stores messages into MongoDB)
- frontend-react: React app (socket.io-client) that connects to backend and exchanges messages in real-time.

## Quick start (locally)
1. Start MongoDB (e.g., `mongod` locally) or use Atlas and set MONGO_URI in backend/.env
2. Backend:
   - cd backend
   - cp .env.example .env
   - npm install
   - npm run dev    (or `npm start`)
3. Frontend:
   - cd frontend-react
   - cp .env.example .env
   - npm install
   - npm start
4. Open `http://localhost:3000` in multiple browser windows to test chat.

Notes:
- The backend stores messages in MongoDB and broadcasts new messages to all connected clients.
- Customize and extend: add user auth, rooms, typing indicators, file sharing, etc.