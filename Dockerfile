FROM node:8.1-alpine as builder
  ARG NODE_ENV=development
  WORKDIR /app
  COPY . /app/

  RUN \
    npm install fs-extra@3.0.1 && \
    npm install && \
    npm cache clean --force && \
    npm run build

FROM nginx:stable-alpine
  COPY --from=builder /app/build/. /usr/share/nginx/html/dcatd_admin/
