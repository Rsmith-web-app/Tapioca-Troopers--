FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN chown -R node:node /app

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD ["node", "app.js"]
