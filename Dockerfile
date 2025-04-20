FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV MONGO_URI=${MONGO_URI}
EXPOSE 5000

# Change this line to match your package.json
CMD ["node", "src/server.js"]