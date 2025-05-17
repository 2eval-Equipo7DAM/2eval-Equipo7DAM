# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/package*.json ./backend/
COPY backend/src ./backend/src
COPY backend/hardware.db ./backend/

# Install backend dependencies
RUN cd backend && npm install

# Expose backend port
EXPOSE 8080

# Start backend
CMD ["node", "backend/src/app.js"]
