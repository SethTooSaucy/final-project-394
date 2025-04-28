FROM node:18-alpine
WORKDIR /app

# First copy ONLY package files
COPY package*.json ./

# Then install dependencies
RUN npm install

# Then copy everything else
COPY . .

EXPOSE 5000
CMD ["node", "app.js"]