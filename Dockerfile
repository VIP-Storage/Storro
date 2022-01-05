# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/storro

# Add the source code to app
COPY ./ /usr/local/storro/

# Install all the dependencies
RUN npm install

ARG API_URL=storra
ENV API_URL=$API_URL

ARG MQTT_WS_URL=localhost
ENV MQTT_WS_URL=$MQTT_WS_URL

ARG MQTT_WS_PORT=15675
ENV MQTT_WS_PORT=$MQTT_WS_PORT


# Generate the build of the application
RUN npm run build:docker

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/storro/dist/storro /usr/share/nginx/html
COPY --from=build /usr/local/storro/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
