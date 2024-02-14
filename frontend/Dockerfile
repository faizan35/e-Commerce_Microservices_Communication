# # Use a lightweight Nginx image to serve static content
# FROM nginx:alpine

# # Copy static files into Nginx's html directory
# COPY ./public /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Default command to start Nginx
# CMD ["nginx", "-g", "daemon off;"]


FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies for backend
RUN npm install

# copy all
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]