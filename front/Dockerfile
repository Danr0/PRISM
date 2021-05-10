FROM node:15.11.0-alpine3.10 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN apk add --update yarn python make g++

RUN yarn install

COPY ./ /app/

RUN yarn build-prod

FROM nginx:1.15

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]