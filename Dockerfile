FROM node:8.1-alpine as builder
  ARG NODE_ENV=production
  WORKDIR /app
  COPY . /app/
  RUN npm --production=false \
          --unsafe-perm \
          --verbose \
          install && \
      npm run build

FROM nginx:stable-alpine
  COPY --from=builder /app/build/. /usr/share/nginx/html/dcatd_admin/
