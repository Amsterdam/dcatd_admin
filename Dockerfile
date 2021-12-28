FROM node:latest as build-stage
ARG NODE_ENV=development
WORKDIR /app
COPY . /app/
RUN npm ci && \
    npm cache clean --force && \
    npm run build

FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/build/. /usr/share/nginx/html/
