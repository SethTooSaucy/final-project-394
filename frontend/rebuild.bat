@echo off
echo Cleaning up...
docker stop frontend
docker rm frontend
docker rmi frontend

echo Building...
docker build -t frontend .

@REM For Nginx
docker run -d -p 3000:80 --name frontend frontend