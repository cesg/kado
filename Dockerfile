FROM node:12-alpine

WORKDIR /var/www/kado/current

RUN apk update && apk upgrade \
  && apk add build-base python \
  && npm install -g --quiet node-pre-gyp node-gyp pm2

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY server server
COPY ecosystem.config.js ecosystem.config.js

RUN npm install --only=production

EXPOSE 8000

CMD [ "pm2-runtime", "ecosystem.config.js" ]

