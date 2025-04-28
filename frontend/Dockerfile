# frontend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npx", "serve", "-s", ".", "-l", "3000"]