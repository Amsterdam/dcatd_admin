FROM node:8.1-alpine as builder
  ARG NODE_ENV=development
  WORKDIR /app
  COPY . /app/
  RUN npm --production=false \
          --unsafe-perm \
          --verbose \
          --registry=https://nexus.data.amsterdam.nl/repository/npm-group/ \
          install && \
      npm run build

FROM nginx:stable-alpine
  COPY --from=builder /app/build/. /usr/share/nginx/html/dcatd_admin/
