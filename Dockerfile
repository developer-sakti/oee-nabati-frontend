FROM node:lts-slim
RUN mkdir -p /app
WORKDIR /app
RUN apt update \
    && apt upgrade -y \
    && apt install build-essential \
    && apt autoremove -y \
    && apt clean \
    && npm i -g npm
COPY . /app
RUN npm i
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
RUN npm run build
RUN npm cache clear

EXPOSE 3000
CMD ["npm", "start"]