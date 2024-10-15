# Use an official Node.js runtime as a parent image with a compatible version
FROM node:21.7.2-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean Install  the dependencies
RUN npm ci

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of your application code
COPY . .

# Build the Angular app for production
RUN npm run build --configuration=production

# Stage 2: Serve the app with nginx
FROM nginx:latest

# Copy the build output to replace default nginx contents
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app to nginx's public directory
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Expose port 80 (standard HTTP port)
EXPOSE 80