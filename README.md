# Chat App

A simple real-time chat application with a React + Vite frontend and an Express + Socket.io backend. Users can register, login, upload a profile picture (stored via Cloudinary), and send messages.


**Tech stack:**
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose, Socket.io
- Image storage: Cloudinary

**Repository layout**
- backend/ — Express API, authentication, Cloudinary integration, Socket.io
- frontend/ — React app, pages, components, and stores

**Prerequisites**
- Node.js (v16+ recommended)
- MongoDB running (local or remote)
- Cloudinary account (for storing profile images)

**Environment variables**
Create a `.env` file in `backend/` with the required keys. Example:

```dotenv
MONGODB_URI=mongodb://localhost:27017/....
PORT=5001
JWT_SECRET=your_jwt_secret

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

**Install & Run (development)**

1. Backend

```bash
cd backend
npm install
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the API at `http://localhost:5001/api` (see `frontend/src/lib/axios.js`). If you change backend port or host update that file accordingly.

