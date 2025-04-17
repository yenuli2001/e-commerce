# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install
COPY . .

# Set environment variables
ENV PORT=5000

# Expose the port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
