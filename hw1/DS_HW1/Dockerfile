# Use the official Nginx image
FROM nginx:latest

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx index file
RUN rm -rf ./*

# Copy your HTML and JavaScript files into Nginx's web directory
COPY index_hw1.html /usr/share/nginx/html/index.html
COPY blog_hw1.js /usr/share/nginx/html/blog_hw1.js

# Expose port 80 for the container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
