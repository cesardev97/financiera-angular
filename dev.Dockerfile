# 1. Stage: Build the Angular app in a node container
FROM node:16.15.0 as build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files and build the app
COPY . ./
RUN npm run build:ssr

# 2. Stage: Setup the app in a node server for SSR
FROM node:16.15.0 as server
WORKDIR /app

# Copy package files and server.js from build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json ./

# Install production dependencies only
RUN npm ci --production

# The app is served on port 4200 by default
EXPOSE 4200
CMD ["node", "dist/proempresa/server/main.js"]
