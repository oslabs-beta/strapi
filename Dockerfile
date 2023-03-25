FROM node:18.15

WORKDIR /app

COPY package*.json .

RUN npm install

CMD ["npm", "run", "dev"]