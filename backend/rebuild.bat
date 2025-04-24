@echo off
echo Cleaning up...
docker stop backend
docker rm backend
docker rmi backend

echo Building...
docker build -t backend .
docker run -d -p 5000:5000 -e ASPNETCORE_HTTP_PORTS=5000 --env-file .env --name backend backend