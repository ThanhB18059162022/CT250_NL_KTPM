FROM node:17-alpine3.14

WORKDIR /server

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

ENV NODE_ENV=production

CMD ["node","app/server.js"]

