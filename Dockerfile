FROM node:latest as build-stage
ARG NODE_ENV=development
WORKDIR /app
COPY . /app/
RUN npm ci && \
    npm cache clean --force && \
    npm run build

FROM nginx:stable-alpine

COPY scripts/startup.sh /usr/local/bin/startup.sh
RUN chmod +x /usr/local/bin/startup.sh

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/build/. /usr/share/nginx/html/dcatd_admin/

COPY --from=build-stage /app/build /usr/share/nginx/html

CMD ["/usr/local/bin/startup.sh"]
