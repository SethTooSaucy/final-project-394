## Running Locally (Node)

1. Install Node.js
2. Install dependencies
    - `npm install`
3. Run the server
    - `npm run dev`

## Running Locally (Docker)

1. Install Docker
2. Build the image
    - `docker build -t <image-name> .`
3. Run the container
    - `docker run -p 3000:3000 <image-name>`
4. Access the server
    - `http://localhost:3000`
