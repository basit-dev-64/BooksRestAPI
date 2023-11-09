FROM node:18.17.1-alpine

WORKDIR /home/node/app

COPY . .

ENV NPM_CONFIG_LOGLEVEL=warn

ENV CI=true

RUN npm ci

EXPOSE 5050

ENTRYPOINT ["npm", "start"]