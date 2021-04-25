FROM node:10.20.1-alpine3.11 as builder

WORKDIR /frontend

COPY ./ ./

RUN yarn install
RUN yarn build

FROM nginx:1.18.0-alpine

COPY --from=builder /frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
