# Step 1: Use an official Node.js image as the base
FROM node:20-alpine as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install the project dependencies
RUN npm install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Build the app for production
RUN npm run build

# Step 7: Use Nginx to serve the production build
FROM nginx:alpine

# Step 8: Copy the build folder from the previous stage to Nginx's web folder
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 for the web application
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
