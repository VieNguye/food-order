# This Dockerfile sets up a Node.js application in an Alpine Linux environment.
# Use the latest Node.js version based on Alpine Linux
FROM node:current-alpine  
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install the application dependencies
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .
# Expose port 5000 for the application
EXPOSE 5000
# Command to run the application
CMD ["npm", "start"]