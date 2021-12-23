FROM node:10.10 as build-stage
ARG NODE_ENV=development
WORKDIR /app
COPY . /app/
RUN npm --production=false \
        --unsafe-perm \
        --verbose \
        install && \
    npm run build

FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build/. /usr/share/nginx/html/dcatd_admin/
