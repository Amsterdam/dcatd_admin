FROM node:8.1-alpine as builder
  ARG NODE_ENV=development
  WORKDIR /app
  COPY . /app/
  RUN npm --production=false \
          --unsafe-perm \
          --verbose \
          install && \
      npm run build && \
      npm cache clean --force \
      npm prune

FROM nginx:stable-alpine
  COPY --from=builder /app/build/. /usr/share/nginx/html/dcatd_admin/
