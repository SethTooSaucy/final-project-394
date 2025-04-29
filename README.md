# Pokémon Manager App

A full-stack application for managing Pokémon with MongoDB, Express backend, and vanilla JavaScript frontend.

## Local Development Setup

### Prerequisites
- Docker Desktop ([Windows/Mac](https://www.docker.com/products/docker-desktop)) or Docker Engine ([Linux](https://docs.docker.com/engine/install/))
- Node.js v18+ (for optional local development)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/your-repo/pokemon-manager.git
cd pokemon-manager
2. Create environment file
Create .env in the project root:

env
MONGODB_URI=""
PORT=5000

3. Start the application
bash
docker-compose up --build

4. Access the application
Frontend: http://localhost:3000

Backend API: http://localhost:5000

Using the Application
Add/Update a Pokémon
Enter a Pokémon name (e.g. "Pikachu")

Select a type from the dropdown

Click "Submit"

Search for a Pokémon
Enter a Pokémon name in the search field

Click "Search"

Delete a Pokémon
Enter a Pokémon name in the search field

Click "Delete"

API Endpoints
Method	Endpoint	Description
GET	/api/Pokemon/:name	Get Pokémon by name
POST	/api/Pokemon	Add/update a Pokémon
DELETE	/api/Pokemon/:name	Delete Pokémon by name


Troubleshooting
Common Issues
Connection errors:

Verify MongoDB URI in .env is correct

Check Docker containers are running: docker ps

CORS errors:

Ensure frontend (3000) and backend (5000) are both running

Container issues:

Rebuild containers: docker-compose down && docker-compose up --build

Reset Everything
bash
docker-compose down -v  # Removes containers and volumes
docker-compose up --build