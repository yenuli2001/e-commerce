FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

# This line is critical - it copies all your files including server.js
COPY . .

# For debugging - list files to make sure server.js is there
RUN ls -la

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server.js"]