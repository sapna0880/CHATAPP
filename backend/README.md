# Backend (Node + Express + Socket.IO)

## Setup
1. `cd backend`
2. `cp .env.example .env` and edit `.env` if needed
3. `npm install`
4. Start MongoDB (e.g., `mongod` locally or use Atlas and set MONGO_URI)
5. `npm run dev` (requires nodemon) or `npm start`

The backend exposes:
- REST: `GET /api/messages` — get previous messages
- WebSocket (Socket.IO): listen for `message` events and emits `message` events to all clients.