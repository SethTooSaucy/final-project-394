Pokémon API with MongoDB

A simple REST API for managing Pokémon data with MongoDB, designed to run in Docker.

## Prerequisites
- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- PowerShell (Windows) or terminal (Mac/Linux)

## Setup & Running

### 1. Clone the repository
```bash
git clone https://github.com/your-repo/midterm-SethTooSaucy.git
cd midterm-SethTooSaucy

2. Create environment file
Create .env in the project root:

3. Build and start containers
docker-compose up --build

4. Verify containers are running
docker ps

API Endpoints and Testing

GET	/api/pokemon/:name	Get specific Pokémon by name
Command:
Invoke-RestMethod -Uri "http://localhost:5000/api/Pokemon/name" `
  -Method Get

POST	/api/pokemon	Add/update a Pokémon
Command:
$body = @{name="Feraligatr"; type="Water"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/Pokemon" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

DELETE	/api/pokemon/:name	Delete a Pokémon by name
Command:
Invoke-RestMethod -Uri "http://localhost:5000/api/Pokemon/name" `
  -Method Delete


