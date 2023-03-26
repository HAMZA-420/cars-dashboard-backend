FROM node:14-alpine

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

EXPOSE 3080

CMD ["npm", "run", "dev"]