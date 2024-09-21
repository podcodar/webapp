FROM node:22.9.0-alpine

RUN apk add --no-cache bash git \
    && git config --global --add safe.directory /app

WORKDIR /app

EXPOSE 3000
