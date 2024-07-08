# Dockerfile
# Use a Node.js base image for the build stage
FROM node:22.2.0 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

# Start a new stage for the final image
FROM node:22.2.0

# Set the working directory
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /app .

# Expose the port the app runs on
EXPOSE 4173

# Start the application
CMD ["npm", "run", "preview", "--", "--host"]