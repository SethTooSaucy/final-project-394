## Running Locally (.NET)

1. Install .NET 8 SDK
2. Create a `.env` file at root using the `.env.sample` file as a template
    - **Make sure your database host is `localhost` if you are also using a local PostgreSQL database**
3. Run the server
    - `dotnet run`

## Running Locally (Docker)

1. Install Docker
2. Create a `.env` file at root using the `.env.sample` file as a template
3. Use the rebuild script
    - `./rebuild.bat`

**OR**

3. Build the image
    - `docker build -t <image-name> .`
4. Run the container
    - `docker run -d -p 5000:5000 -e ASPNETCORE_HTTP_PORTS=5000 --env-file .env --name <container-name> <image-name>`