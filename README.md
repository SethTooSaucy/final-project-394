Pokémon Manager - Full Stack App with MongoDB A complete Dockerized solution for managing Pokémon with a Node.js backend and vanilla JavaScript frontend.

Hosted version https://final-project-394.vercel.app

Features 🚀 Backend API with Express.js

🎨 Vanilla JS frontend (no frameworks)

🐳 Docker containers for easy setup

🗄️ MongoDB database integration

Prerequisites Docker Desktop

Git

MongoDB Atlas account (or local MongoDB instance)

Quick Start (Local Development)

Clone the repository bash git clone https://github.com/your-repo/pokemon-manager.git cd pokemon-manager
Configure Environment Create .env file in the project root:
.env MONGODB_URI=mongodb+srv://:@cluster0.mongodb.net/pokemon?retryWrites=true&w=majority PORT=5000 3. Update Frontend API URL Edit frontend/frontend.js:

// Change this line to use localhost for Docker development const API_BASE_URL = 'http://localhost:5000/api/Pokemon';

Start the Application docker-compose up --build

Access the Application Frontend: http://localhost:3000 Backend API: http://localhost:5000

Project Structure pokemon-manager/ ├── backend/ │ ├── app.js # Express server │ ├── package.json # Backend dependencies │ └── Dockerfile # Backend container config ├── frontend/ │ ├── index.html # Main interface │ ├── styles.css # CSS styles │ └── frontend.js # Frontend logic ├── docker-compose.yml # Container orchestration -.env └── README.md # This file

API Endpoints

GET /api/Pokemon/:name Get Pokémon by name POST /api/Pokemon Add/update a Pokémon DELETE /api/Pokemon/:name Delete Pokémon by name

Using the Application Add/Update Pokémon

Enter name and select type

Click "Submit"

Search Pokémon

Enter name in search field

Click "Search"

Delete Pokémon

Enter name in search field

Click "Delete"
