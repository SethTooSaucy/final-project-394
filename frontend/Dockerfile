# Note: NGINX, nginx.conf, multi-stage builds
FROM node:22-alpine AS builder

# Create app directory in container to hold application code (optional)
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the app for production
RUN npm run build

# NGINX
FROM nginx:alpine

# Copy the build output from the first stage (https://hub.docker.com/_/nginx)
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port and start application
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]