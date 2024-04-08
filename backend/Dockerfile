FROM node:18

# FROM node:18-bullseye


# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies for backend
RUN npm install

# copy all
COPY . .

EXPOSE 8000

CMD ["node", "backend.js"]
