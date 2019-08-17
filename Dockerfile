FROM node:lts-alpine

ARG NODE_ENV
ARG FRONTEND_PORT
ARG API_URL

ENV NODE_ENV=${NODE_ENV}
ENV API_URL=${API_URL}
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=${FRONTEND_PORT}

RUN mkdir -p /frontend
WORKDIR /frontend

RUN apk update
RUN apk upgrade
RUN apk add --update alpine-sdk gcc bash build-base python
RUN npm config set python /usr/bin/python
RUN npm i -g npm

COPY package.json .

RUN npm i --silent --production

RUN npm run build

EXPOSE ${FRONTEND_PORT}
CMD ["npm", "start"]
