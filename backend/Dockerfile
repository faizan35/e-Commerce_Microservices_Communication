# FROM node:18

FROM node:18-alpine3.19-slim


# Set the working directory to /app
WORKDIR /app/backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies for backend
RUN npm install

# copy all
COPY . .

EXPOSE 3000

CMD ["node", "backend.js"]
