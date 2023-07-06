# Use the official Node.js 14 image as the base image
FROM node:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Copy the .env file to the container (assuming it's in the same directory as the Dockerfile)
COPY .env ./

# Expose the port that your NestJS application is listening on (if applicable)
EXPOSE 7227

# Set the environment variables
ENV PORT=7227
ENV DATABASE_URI=mongodb+srv://ad17yakr:<password>@clusterx.onuzbly.mongodb.net/
ENV JWT_SECRET_KEY=ecdc4786eebfe9261c0762de79a1afc6c7a904b29ec9d337af92ea49520930cc
ENV JWT_EXPIRE_TIME=30D
ENV BACKBLAZE_ENDPOINT=s3.us-east-005.backblazeb2.com
ENV BACKBLAZE_APP_KEY_ID=005395b07a87b8a0000000003
ENV BACKBLAZE_APP_KEY_NAME=paperflowkey
ENV BACKBLAZE_APPLICATION_KEY=K005plrjamelfISyt3kkjr2ci8EH4sc
ENV BACKBLAZE_BUCKET_NAME=paperflow

# Start the NestJS application
CMD ["npm", "run", "start:prod"]
