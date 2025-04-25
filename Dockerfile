FROM node:18-alpine
# Set the working directory in the container to /app
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install the dependencies
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .
# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["npm", "start"]
# Use the following command to build the Docker image
# docker build -t postaway-backend .
# Use the following command to run the Docker container
# docker run -p 3000:3000 postaway-backend
# Use the following command to run the Docker container in detached mode
# docker run -d -p 3000:3000 postaway-backend
# Use the following command to run the Docker container with a specific name
# docker run -d --name postaway-backend -p 3000:3000 postaway-backend
# Use the following command to run the Docker container with a specific name and environment variables
# docker run -d --name postaway-backend -p 3000:3000 -e NODE_ENV=production postaway-backend
# Use the following command to run the Docker container with a specific name and environment variables and volume mapping
# docker run -d --name postaway-backend -p 3000:3000 -e NODE_ENV=production -v /path/to/local/folder:/app postaway-backend
# Use the following command to run the Docker container with a specific name and environment variables and volume mapping and network mapping
# docker run -d --name postaway-backend -p 3000:3000 -e NODE_ENV=production -v /path/to/local/folder:/app --network host postaway-backend
# Use the following command to run the Docker container with a specific name and environment variables and volume mapping and network mapping and restart policy
# docker run -d --name postaway-backend -p 3000:3000 -e NODE_ENV=production -v /path/to/local/folder:/app --network host --restart always postaway-backend
# Use the following command to run the Docker container with a specific name and environment variables and volume mapping and network mapping and restart policy and log options
# docker run -d --name postaway-backend -p 3000:3000 -e NODE_ENV=production -v /path/to/local/folder:/app --network host --restart always --log-opt max-size=10m --log-opt max-file=3 postaway-backend
# Use the following command to run the Docker container with a specific name and environment variables and volume mapping and network mapping and restart policy and log options and health check
# docker run -d --name postaway-backend -p 3000:3000 -e NODE_ENV=production -v /path/to/local/folder:/app --network host --restart always --log-opt max-size=10m --log-opt max-file=3 --health-cmd="curl --fail http://localhost:3000/health || exit 1" --health-interval=30s --health-timeout=10s --health-retries=3 postaway-backend
# Use the following command to run the Docker container with a specific name and environment variables and volume mapping and network mapping and restart policy and log options and health check and environment file
# docker run -d --name postaway-backend -p 3000:3000 --env-file .env -v /path/to/local/folder:/app --network host --restart always --log-opt max-size=10m --log-opt max-file=3 --health-cmd="curl --fail http://localhost:3000/health || exit 1" --health-interval=30s --health-timeout=10s --health-retries=3 postaway-backend