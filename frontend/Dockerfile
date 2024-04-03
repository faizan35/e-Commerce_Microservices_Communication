# # Use a lightweight Nginx image to serve static content
# FROM nginx:alpine

FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies for backend
RUN npm install

# copy all
COPY . .

# Build the React app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]