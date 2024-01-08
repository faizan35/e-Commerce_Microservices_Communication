FROM node:18
# FROM node:18-alpine

# workdir /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# install 
RUN npm install

# copy all
COPY . .

EXPOSE 3000

CMD ["node", "backend.js"]
