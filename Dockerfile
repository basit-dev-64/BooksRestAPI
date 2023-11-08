FROM node:14.19.1-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5050

CMD [ "node" , "./index.js" ]

