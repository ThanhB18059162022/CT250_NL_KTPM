FROM node:14.16.0

WORKDIR /server

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i --production

COPY . .

ENV NODE_ENV=production

CMD ["node","app/server.js"]

