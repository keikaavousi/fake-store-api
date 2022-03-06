FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT

CMD [ "node", "server.js" ]