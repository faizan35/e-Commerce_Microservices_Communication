# Use a lightweight Nginx image to serve static content
FROM nginx:alpine

# Copy static files into Nginx's html directory
COPY ./public /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Default command to start Nginx
CMD ["nginx", "-g", "daemon off;"]