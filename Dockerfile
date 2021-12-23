FROM node:10.10 as builder
  ARG NODE_ENV=development
  WORKDIR /app
  COPY . /app/
  RUN npm --production=false \
          --unsafe-perm \
          --verbose \
          install && \
      npm run build

FROM nginx:stable-alpine
  COPY --from=builder /app/build/. /usr/share/nginx/html/dcatd_admin/
