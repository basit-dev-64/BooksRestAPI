# FROM ghcr.io/puppeteer/puppeteer:20.8.2
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm ci
# COPY . .
# CMD [ "node" , "./index.js" ]

FROM satantime/puppeteer-node

WORKDIR /usr/src/app

ENV NPM_CONFIG_LOGLEVEL=warn
ENV CI=true
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

RUN apt-get update
RUN apt-get install -y chromium
#RUN apt install chromium-browser

COPY ./package*.json .

RUN npm ci

COPY . .

CMD [ "node" , "./index.js" ]