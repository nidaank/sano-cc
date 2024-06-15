# Use the official Node.js 18 base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install
RUN npx prisma generate

# Copy application code
COPY . .

# Set the command to start the server
CMD ["npm", "start"]