FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV MONGO_URI=mongodb+srv://Yenuli:yenuli123@cluster0.rqcr7.mongodb.net/product-catalog?retryWrites=true&w=majority&appName=Cluster0

EXPOSE 5000

CMD ["node", "server.js"]