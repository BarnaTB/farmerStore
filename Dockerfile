FROM node:lts-bullseye-slim 

WORKDIR /app

COPY package.json package-lock.json ./

COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

EXPOSE 7000

CMD ["node", "build/server.js"]