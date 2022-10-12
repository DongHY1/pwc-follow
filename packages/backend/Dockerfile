FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . . 

EXPOSE 8000

RUN npm run generate

RUN npm run migrate

RUN npm run pushdb

CMD ["npm", "run", "start"]

