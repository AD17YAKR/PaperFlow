# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY .env .
COPY package*.json ./
COPY tsconfig*.json ./

# Install required global dependencies (class-validator and class-transformer)
RUN npm install class-validator class-transformer

# Install project dependencies
RUN npm install

# Build the NestJS application
RUN npm run build

# Copy the .env file to the container (assuming it's in the same directory as the Dockerfile)
