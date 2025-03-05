FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Verify dist directory exists and contains compiled files
RUN ls -la dist/ && test -f dist/server.js

EXPOSE 3000

CMD ["npm", "start"]