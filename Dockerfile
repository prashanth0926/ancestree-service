FROM node:21-alpine

RUN apk update && apk upgrade

USER node
WORKDIR /home/node

COPY --chown=node:node . .

RUN npm ci
RUN npm run build \
    && npm prune --production

EXPOSE $PORT

CMD ["npm", "run", "start:prod"]
