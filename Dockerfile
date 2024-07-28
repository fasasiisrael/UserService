FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm rebuild bcrypt


COPY . .

RUN npx nest build

EXPOSE 3000

CMD ["node", "dist/main.js"]
